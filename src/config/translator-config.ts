export const languagePairs = [
  {
    sourceCode: "en",
    sourceName: "English",
    targetLanguages: [
      { code: "es", name: "Spanish" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" },
      { code: "it", name: "Italian" },
      { code: "pt", name: "Portuguese" },
      { code: "ru", name: "Russian" },
      { code: "zh", name: "Chinese (Simplified)" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" },
      { code: "ar", name: "Arabic" },
      { code: "hi", name: "Hindi" },
      { code: "nl", name: "Dutch" },
      { code: "sv", name: "Swedish" },
      { code: "pl", name: "Polish" },
      { code: "tr", name: "Turkish" }
    ]
  },
  {
    sourceCode: "es",
    sourceName: "Spanish",
    targetLanguages: [
      { code: "en", name: "English" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" },
      { code: "it", name: "Italian" },
      { code: "pt", name: "Portuguese" }
    ]
  },
  {
    sourceCode: "fr",
    sourceName: "French",
    targetLanguages: [
      { code: "en", name: "English" },
      { code: "es", name: "Spanish" },
      { code: "de", name: "German" },
      { code: "it", name: "Italian" },
      { code: "pt", name: "Portuguese" }
    ]
  },
  {
    sourceCode: "de",
    sourceName: "German",
    targetLanguages: [
      { code: "en", name: "English" },
      { code: "es", name: "Spanish" },
      { code: "fr", name: "French" },
      { code: "it", name: "Italian" }
    ]
  },
  {
    sourceCode: "zh",
    sourceName: "Chinese (Simplified)",
    targetLanguages: [
      { code: "en", name: "English" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" }
    ]
  }
];

export const specializedVocabularies = [
  {
    id: "general",
    name: "General",
    description: "Everyday language for common conversations and content"
  },
  {
    id: "technical",
    name: "Technical",
    description: "Specialized vocabulary for IT, engineering, and technical fields"
  },
  {
    id: "medical",
    name: "Medical",
    description: "Healthcare terminology for medical documents and conversations"
  },
  {
    id: "legal",
    name: "Legal",
    description: "Legal terminology for contracts, laws, and legal documents"
  },
  {
    id: "business",
    name: "Business",
    description: "Business and finance terminology for professional communications"
  },
  {
    id: "academic",
    name: "Academic",
    description: "Scholarly language for research papers and academic writing"
  },
  {
    id: "travel",
    name: "Travel",
    description: "Common phrases and vocabulary for travelers"
  },
  {
    id: "culinary",
    name: "Culinary",
    description: "Food and cooking terminology for recipes and menus"
  }
];

export const translationFormats = [
  {
    id: "text",
    name: "Text",
    description: "Direct translation of text input",
    maxLength: 5000
  },
  {
    id: "document",
    name: "Document",
    description: "Translation of uploaded documents with format preservation",
    supportedFormats: ["pdf", "docx", "txt", "html"],
    maxSize: 10 // MB
  },
  {
    id: "conversation",
    name: "Conversation",
    description: "Real-time translation for bilingual conversations",
    features: ["speaker-identification", "context-awareness"]
  },
  {
    id: "website",
    name: "Website",
    description: "Translation of website content via URL",
    features: ["structure-preservation", "link-handling"]
  }
];
