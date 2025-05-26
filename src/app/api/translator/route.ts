"use client";

import { NextRequest, NextResponse } from "next/server";
import { languagePairs, specializedVocabularies } from "@/config/translator-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, sourceLanguage, targetLanguage, format, vocabulary, documentUrl } = body;

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

    // Get vocabulary details
    const selectedVocabulary = specializedVocabularies.find(v => v.id === vocabulary) || 
      specializedVocabularies.find(v => v.id === "general");
    
    // Prepare the system message with context about translation
    const systemMessage = `You are OrbitTranslator, an AI-powered translation assistant.
    Your task is to translate content from ${sourceLanguage} to ${targetLanguage}.
    
    Format: ${format || "text"}
    Vocabulary: ${selectedVocabulary ? selectedVocabulary.name : "General"}
    
    Please provide an accurate translation that preserves the meaning, tone, and context of the original text.
    If the vocabulary is specialized, use appropriate terminology for that domain.
    Maintain formatting elements like paragraphs, bullet points, and emphasis where possible.`;

    // Generate the translation using AI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: text }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    // Extract the translated content
    const translatedText = response.choices[0].message.content || "";

    return NextResponse.json({
      originalText: text,
      translatedText,
      sourceLanguage,
      targetLanguage,
      vocabulary: selectedVocabulary?.id || "general"
    });
  } catch (error: any) {
    console.error("Error in translator API:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during translation" },
      { status: 500 }
    );
  }
}
