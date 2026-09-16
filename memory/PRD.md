# KhetSetu Voice Integration - PRD

## Original Problem
Add voice interaction (STT + TTS) to existing KhetSetu without changing existing UI, colors, layout, dashboards, or navigation. Support EN/HI/BN. Use native browser Web Speech APIs — no external APIs.

## Architecture
- `src/voice/useVoice.js` — React hook wrapping SpeechRecognition + SpeechSynthesis, safely no-ops when unsupported
- `src/voice/voiceCommands.js` — Lightweight keyword/intent parser (EN/HI/BN) + feedback messages
- `src/voice/VoiceMicButton.jsx` — Mic button in Navbar; opens/closes listening, shows floating "Listening..." pill, wires commands into AppContext
- `src/voice/SpeakButton.jsx` — Small speaker icon for read-aloud (used in Market Prices)
- `AppContext.js` — Two bridge states: `marketplaceVoiceSearch`, `marketPricesFocus` for cross-component voice actions
- `sonner` Toaster mounted in `App.js` for command feedback

## Voice Capabilities
- Navigation: marketplace, dashboard, my produce, create listing, offers, orders, consignments, market intelligence, saved, profile, settings, support, market prices, home/back
- Actions: dark/light mode toggle, language switch (EN/HI/BN), logout
- Search: marketplace search pre-fill + auto-navigate
- Market price product focus with scroll + highlight
- Read-aloud on market price cards (localized speech text)
- Toast feedback + floating listening indicator
- Errors handled: not-allowed, no-speech, audio-capture, unsupported browser

## Preserved
- All existing UI, colors, layout, buttons, dashboards, auth, mock data unchanged
- Mic button matches existing outline/icon button style in navbar

## Feature status
- [x] STT via Web Speech API (en-IN/hi-IN/bn-IN)
- [x] TTS via SpeechSynthesis
- [x] Intent parser tested for EN/HI/BN
- [x] Voice search integrated with marketplace
- [x] Market Prices product focus
- [x] Theme/language voice control
- [x] Error handling + graceful degradation

## Test credentials
See `/app/memory/test_credentials.md`
