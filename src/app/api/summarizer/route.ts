"use client";

import { NextRequest, NextResponse } from "next/server";
import { summarizationLevels, documentTypes, focusAreas } from "@/config/summarizer-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, documentType, summaryLevel, focusArea } = body;

    // Initialize OpenAI client at request time, not module level
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });

    if (!openai.apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Get the summary level details
    const selectedSummaryLevel = summarizationLevels.find(s => s.id === summaryLevel) || 
      summarizationLevels.find(s => s.id === "standard");
    
    // Get the document type details
    const selectedDocumentType = documentTypes.find(d => d.id === documentType) || 
      documentTypes.find(d => d.id === "article");
    
    // Get the focus area details
    const selectedFocusArea = focusAreas.find(f => f.id === focusArea) || 
      focusAreas.find(f => f.id === "main-points");
    
    // Prepare the system message with context about summarization
    const systemMessage = `You are NebulaSummarizer, an AI-powered document summarization assistant.
    Your task is to create a summary of the provided content.
    
    Document Type: ${selectedDocumentType?.name || "Article"}
    Summary Level: ${selectedSummaryLevel?.name || "Standard Summary"}
    Focus Area: ${selectedFocusArea?.name || "Main Points"}
    
    ${selectedSummaryLevel?.wordCount ? 
      `Target word count: ${selectedSummaryLevel.wordCount.min}-${selectedSummaryLevel.wordCount.max}` : 
      ""}
    
    Style: ${selectedSummaryLevel?.style || "Balanced coverage of main points with selected supporting details"}
    
    ${selectedDocumentType?.features ? 
      `Special features to preserve: ${selectedDocumentType.features.join(", ")}` : 
      ""}
    
    Focus on ${selectedFocusArea?.description || "the central arguments and key points"}.
    
    Create a clear, concise summary that captures the essence of the document according to the specified parameters.`;

    // Generate the summary using AI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: text }
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });

    // Extract the summary
    const summary = response.choices[0].message.content || "";

    return NextResponse.json({
      originalText: text,
      summary,
      summaryLevel: selectedSummaryLevel?.id || "standard",
      documentType: selectedDocumentType?.id || "article",
      focusArea: selectedFocusArea?.id || "main-points",
      wordCount: summary.split(/\s+/).length
    });
  } catch (error: any) {
    console.error("Error in summarizer API:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during summarization" },
      { status: 500 }
    );
  }
}
