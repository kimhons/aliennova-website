"use client";

import { NextRequest, NextResponse } from "next/server";
import { voiceOptions, audioFeatures, transcriptionFormats, voiceCommandCategories } from "@/config/voice-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

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

    let result = {};

    // Handle different voice actions
    switch (action) {
      case "transcribe":
        const { audioUrl, format, speakerIdentification } = data;
        
        // In a real implementation, this would process the audio file
        // For this demo, we'll simulate transcription with AI
        
        const transcriptionSystemMessage = `You are GalaxyVoice, an AI-powered voice assistant.
        Your task is to simulate transcribing audio to text.
        
        Format: ${format || "basic"}
        Speaker Identification: ${speakerIdentification ? "Enabled" : "Disabled"}
        
        Create a realistic transcription that includes natural speech patterns, filler words, and appropriate formatting.
        ${speakerIdentification ? "Include speaker labels (Speaker 1, Speaker 2, etc.) at the beginning of each turn." : ""}
        ${format === "detailed" ? "Include timestamps at regular intervals." : ""}
        ${format === "notes" ? "Format as meeting notes with key points and action items." : ""}`;
        
        const transcriptionResponse = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: transcriptionSystemMessage },
            { role: "user", content: "Simulate a transcription of a business meeting discussing quarterly results and future plans." }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
        
        result = {
          transcription: transcriptionResponse.choices[0].message.content || "",
          format,
          speakerIdentification,
          action: "transcribe"
        };
        break;
        
      case "text_to_speech":
        const { text, voice, speed } = data;
        
        const selectedVoice = voiceOptions.find(v => v.id === voice) || 
          voiceOptions.find(v => v.id === "en-US-female-1");
        
        // In a real implementation, this would convert text to speech
        // For this demo, we'll return metadata about the conversion
        
        result = {
          text,
          voice: selectedVoice?.id || "en-US-female-1",
          speed: speed || "1.0",
          audioUrl: "https://example.com/simulated-audio.mp3", // Simulated URL
          action: "text_to_speech"
        };
        break;
        
      case "enhance_audio":
        const { audioUrl: enhanceAudioUrl, features } = data;
        
        const selectedFeatures = features.map((featureId: string) => {
          const feature = audioFeatures.find(f => f.id === featureId);
          return feature ? feature.name : featureId;
        });
        
        // In a real implementation, this would process and enhance the audio
        // For this demo, we'll return metadata about the enhancement
        
        result = {
          originalAudioUrl: enhanceAudioUrl,
          enhancedAudioUrl: "https://example.com/enhanced-audio.mp3", // Simulated URL
          appliedFeatures: selectedFeatures,
          action: "enhance_audio"
        };
        break;
        
      case "process_command":
        const { command } = data;
        
        const commandSystemMessage = `You are GalaxyVoice, an AI-powered voice assistant.
        Your task is to interpret and respond to voice commands.
        
        Available command categories:
        ${JSON.stringify(voiceCommandCategories)}
        
        Identify the appropriate category and specific command that matches the user's input.
        If the command is recognized, explain what action would be taken.
        If the command is not recognized, suggest similar valid commands.`;
        
        const commandResponse = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: commandSystemMessage },
            { role: "user", content: command }
          ],
          temperature: 0.3,
          max_tokens: 500,
        });
        
        result = {
          command,
          interpretation: commandResponse.choices[0].message.content || "",
          action: "process_command"
        };
        break;
        
      default:
        return NextResponse.json(
          { error: "Invalid voice action specified" },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in voice API:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during voice processing" },
      { status: 500 }
    );
  }
}
