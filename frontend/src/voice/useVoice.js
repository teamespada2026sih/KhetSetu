import { useCallback, useEffect, useRef, useState } from "react";

// useVoice hook: wraps SpeechRecognition + SpeechSynthesis in a browser-safe way.
// Progressive enhancement — degrades gracefully when APIs are unavailable.
export const useVoice = ({ language = "en-IN", onResult, onError } = {}) => {
  const recognitionRef = useRef(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interim, setInterim] = useState("");
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Initialize recognition once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    rec.lang = language;

    rec.onstart = () => {
      setIsListening(true);
      setInterim("");
    };
    rec.onaudioend = () => {
      setIsListening(false);
    };
    rec.onend = () => {
      setIsListening(false);
    };
    rec.onerror = (e) => {
      setIsListening(false);
      setIsProcessing(false);
      if (onErrorRef.current) onErrorRef.current(e.error || "unknown");
    };
    rec.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          finalTranscript += res[0].transcript;
        } else {
          interimTranscript += res[0].transcript;
        }
      }
      setInterim(interimTranscript);
      if (finalTranscript && onResultRef.current) {
        setIsProcessing(true);
        try {
          onResultRef.current(finalTranscript.trim());
        } finally {
          // Processing indicator fades quickly, downstream handles UI
          setTimeout(() => setIsProcessing(false), 350);
        }
      }
    };
    recognitionRef.current = rec;

    return () => {
      try {
        rec.onstart = null;
        rec.onend = null;
        rec.onerror = null;
        rec.onresult = null;
        rec.abort();
      } catch (e) { /* noop */ }
      recognitionRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep lang in sync
  useEffect(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = language;
      } catch (e) { /* noop */ }
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return false;
    if (isListening) return false;
    try {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      return true;
    } catch (e) {
      if (onErrorRef.current) onErrorRef.current("start-failed");
      return false;
    }
  }, [isListening, language]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch (e) { /* noop */ }
  }, []);

  // SpeechSynthesis helpers
  const speak = useCallback((text, lang = language) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = 1;
      utter.pitch = 1;
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utter);
    } catch (e) {
      setIsSpeaking(false);
    }
  }, [language]);

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } catch (e) { /* noop */ }
  }, []);

  return {
    isSupported,
    isListening,
    isProcessing,
    isSpeaking,
    interim,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
};
