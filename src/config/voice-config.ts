export const voiceOptions = [
  {
    id: "en-US-female-1",
    name: "Emma",
    language: "English (US)",
    gender: "Female",
    style: "Conversational",
    useCase: "General purpose, friendly and clear"
  },
  {
    id: "en-US-male-1",
    name: "James",
    language: "English (US)",
    gender: "Male",
    style: "Professional",
    useCase: "Business presentations and formal content"
  },
  {
    id: "en-GB-female-1",
    name: "Sophia",
    language: "English (UK)",
    gender: "Female",
    style: "Refined",
    useCase: "Narration and educational content"
  },
  {
    id: "es-ES-female-1",
    name: "Isabella",
    language: "Spanish",
    gender: "Female",
    style: "Warm",
    useCase: "Conversational Spanish content"
  },
  {
    id: "fr-FR-male-1",
    name: "Pierre",
    language: "French",
    gender: "Male",
    style: "Sophisticated",
    useCase: "French language content and learning"
  },
  {
    id: "de-DE-female-1",
    name: "Hannah",
    language: "German",
    gender: "Female",
    style: "Clear",
    useCase: "German language content and instructions"
  },
  {
    id: "ja-JP-male-1",
    name: "Hiroshi",
    language: "Japanese",
    gender: "Male",
    style: "Polite",
    useCase: "Japanese language content"
  },
  {
    id: "zh-CN-female-1",
    name: "Mei",
    language: "Chinese (Mandarin)",
    gender: "Female",
    style: "Gentle",
    useCase: "Mandarin Chinese content"
  }
];

export const audioFeatures = [
  {
    id: "noise-reduction",
    name: "Noise Reduction",
    description: "Reduce background noise and audio interference",
    settings: [
      { id: "light", name: "Light", description: "Subtle noise reduction for minor background noise" },
      { id: "medium", name: "Medium", description: "Balanced noise reduction for moderate background noise" },
      { id: "strong", name: "Strong", description: "Aggressive noise reduction for significant background noise" }
    ]
  },
  {
    id: "voice-enhancement",
    name: "Voice Enhancement",
    description: "Improve clarity and quality of voice recordings",
    settings: [
      { id: "clarity", name: "Clarity", description: "Enhance speech intelligibility" },
      { id: "warmth", name: "Warmth", description: "Add richness to voice tone" },
      { id: "presence", name: "Presence", description: "Increase voice prominence in the mix" }
    ]
  },
  {
    id: "speaker-diarization",
    name: "Speaker Identification",
    description: "Identify and label different speakers in a conversation",
    settings: [
      { id: "auto", name: "Automatic", description: "Automatically detect and label speakers" },
      { id: "manual", name: "Manual", description: "Manually assign speaker labels" }
    ]
  },
  {
    id: "audio-formatting",
    name: "Audio Formatting",
    description: "Format audio output for specific use cases",
    settings: [
      { id: "podcast", name: "Podcast", description: "Optimize for podcast distribution" },
      { id: "meeting", name: "Meeting", description: "Optimize for meeting recordings" },
      { id: "music", name: "Music", description: "Balance speech with musical elements" }
    ]
  }
];

export const transcriptionFormats = [
  {
    id: "basic",
    name: "Basic Transcript",
    description: "Simple text transcript without formatting",
    features: ["text-only", "no-timestamps", "no-speaker-labels"]
  },
  {
    id: "detailed",
    name: "Detailed Transcript",
    description: "Formatted transcript with timestamps and speaker labels",
    features: ["timestamps", "speaker-labels", "paragraphs"]
  },
  {
    id: "subtitles",
    name: "Subtitles/Captions",
    description: "Timed text for video subtitles",
    formats: ["srt", "vtt", "ass"],
    features: ["precise-timing", "line-breaks"]
  },
  {
    id: "notes",
    name: "Meeting Notes",
    description: "Structured summary with key points and action items",
    features: ["key-points", "action-items", "decisions", "follow-ups"]
  }
];

export const voiceCommandCategories = [
  {
    id: "system",
    name: "System Commands",
    commands: [
      { trigger: "start recording", action: "Begin audio recording" },
      { trigger: "stop recording", action: "End audio recording" },
      { trigger: "pause", action: "Pause current operation" },
      { trigger: "resume", action: "Resume paused operation" },
      { trigger: "cancel", action: "Cancel current operation" }
    ]
  },
  {
    id: "transcription",
    name: "Transcription Commands",
    commands: [
      { trigger: "transcribe this", action: "Convert current audio to text" },
      { trigger: "add speaker labels", action: "Enable speaker identification" },
      { trigger: "add timestamps", action: "Include timestamps in transcript" },
      { trigger: "format as subtitles", action: "Format transcript as subtitles" }
    ]
  },
  {
    id: "text-to-speech",
    name: "Text-to-Speech Commands",
    commands: [
      { trigger: "read this", action: "Convert selected text to speech" },
      { trigger: "change voice to [name]", action: "Switch to specified voice" },
      { trigger: "speak faster", action: "Increase speech rate" },
      { trigger: "speak slower", action: "Decrease speech rate" }
    ]
  },
  {
    id: "editing",
    name: "Editing Commands",
    commands: [
      { trigger: "remove background noise", action: "Apply noise reduction" },
      { trigger: "enhance voice", action: "Apply voice enhancement" },
      { trigger: "trim silence", action: "Remove silent portions" },
      { trigger: "normalize volume", action: "Balance audio levels" }
    ]
  }
];
