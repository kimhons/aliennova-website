export const summarizationLevels = [
  {
    id: "brief",
    name: "Brief Overview",
    description: "A concise summary capturing only the most essential points",
    wordCount: {
      min: 50,
      max: 150
    },
    style: "Extremely concise, focusing only on the main thesis and key conclusions"
  },
  {
    id: "standard",
    name: "Standard Summary",
    description: "A balanced summary with main points and supporting details",
    wordCount: {
      min: 150,
      max: 300
    },
    style: "Balanced coverage of main points with selected supporting details"
  },
  {
    id: "detailed",
    name: "Detailed Summary",
    description: "A comprehensive summary with extensive supporting information",
    wordCount: {
      min: 300,
      max: 600
    },
    style: "Thorough coverage including main points, supporting details, and methodology"
  },
  {
    id: "bullet",
    name: "Bullet Points",
    description: "Key points organized in a bullet-point format",
    style: "Concise bullet points organized by topic or section"
  },
  {
    id: "executive",
    name: "Executive Summary",
    description: "Business-focused summary highlighting actionable insights",
    wordCount: {
      min: 200,
      max: 400
    },
    style: "Professional tone with emphasis on implications and recommendations"
  }
];

export const documentTypes = [
  {
    id: "article",
    name: "Article",
    description: "News articles, blog posts, and online content",
    formats: ["html", "txt", "pdf"]
  },
  {
    id: "academic",
    name: "Academic Paper",
    description: "Research papers, journal articles, and scholarly works",
    formats: ["pdf", "docx"],
    features: ["citation-preservation", "section-awareness"]
  },
  {
    id: "report",
    name: "Report",
    description: "Business reports, white papers, and analysis documents",
    formats: ["pdf", "docx", "pptx"],
    features: ["chart-description", "executive-focus"]
  },
  {
    id: "book",
    name: "Book",
    description: "Book chapters or entire books",
    formats: ["pdf", "epub"],
    features: ["chapter-awareness", "theme-tracking"]
  },
  {
    id: "legal",
    name: "Legal Document",
    description: "Contracts, legal briefs, and regulatory documents",
    formats: ["pdf", "docx"],
    features: ["terminology-preservation", "clause-identification"]
  }
];

export const focusAreas = [
  {
    id: "main-points",
    name: "Main Points",
    description: "Focus on the central arguments and key points"
  },
  {
    id: "methodology",
    name: "Methodology",
    description: "Emphasis on research methods and approaches used"
  },
  {
    id: "findings",
    name: "Findings & Results",
    description: "Concentrate on outcomes, results, and discoveries"
  },
  {
    id: "implications",
    name: "Implications",
    description: "Focus on consequences, applications, and significance"
  },
  {
    id: "technical",
    name: "Technical Details",
    description: "Emphasis on technical specifications and processes"
  },
  {
    id: "historical",
    name: "Historical Context",
    description: "Focus on background, development, and historical significance"
  }
];
