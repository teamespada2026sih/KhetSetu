import React from "react";
import { useVoice } from "@/voice/useVoice";
import { useApp } from "@/context/AppContext";
import { speechLangCode } from "@/voice/voiceCommands";
import { Volume2, VolumeX } from "lucide-react";

// Small read-aloud button. Uses SpeechSynthesis (browser native, no external API).
// Progressive enhancement: silently hides if speechSynthesis is unavailable.
export const SpeakButton = ({ text, label, testId, className = "" }) => {
  const { language } = useApp();
  const { speak, stopSpeaking, isSpeaking } = useVoice({ language: speechLangCode(language) });

  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text, speechLangCode(language));
    }
  };

  const tip = label || (language === "hi" ? "पढ़कर सुनाओ" : language === "bn" ? "পড়ে শোনাও" : "Read aloud");

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid={testId || "speak-btn"}
      title={tip}
      aria-label={tip}
      className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors ${className}`}
    >
      {isSpeaking ? (
        <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
};
