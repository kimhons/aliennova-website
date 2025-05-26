"use client";

import { NextRequest, NextResponse } from "next/server";
import { schedulerTemplates, priorityLevels, timeBlockTypes } from "@/config/scheduler-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, template, date, existingEvents } = body;

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

    // Get the template details
    const selectedTemplate = schedulerTemplates.find(t => t.id === template);
    
    // Prepare the system message with context about scheduling
    const systemMessage = `You are CosmicScheduler, an AI-powered scheduling assistant. 
    Your task is to create an optimized schedule based on the user's request and the selected template.
    
    Template: ${selectedTemplate ? JSON.stringify(selectedTemplate) : "Custom schedule"}
    Date: ${date}
    Existing Events: ${JSON.stringify(existingEvents || [])}
    
    Create a detailed schedule with specific time blocks. For each time block include:
    1. Start time
    2. End time
    3. Title
    4. Description
    5. Priority level
    6. Type of activity
    
    Ensure there are no conflicts with existing events. Respect the user's preferences and the template structure.
    Return the schedule as a JSON array of events.`;

    // Generate the schedule using AI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Extract and parse the generated schedule
    const generatedContent = response.choices[0].message.content || "";
    
    // Try to extract JSON from the response
    let schedule;
    try {
      // Look for JSON in the response
      const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        schedule = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try parsing the whole response
        schedule = JSON.parse(generatedContent);
      }
    } catch (error) {
      // If parsing fails, return the raw text
      return NextResponse.json({
        schedule: [],
        rawResponse: generatedContent,
        error: "Failed to parse schedule JSON"
      });
    }

    return NextResponse.json({
      schedule,
      template: selectedTemplate,
      priorityLevels,
      timeBlockTypes
    });
  } catch (error: any) {
    console.error("Error in scheduler API:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during scheduling" },
      { status: 500 }
    );
  }
}
