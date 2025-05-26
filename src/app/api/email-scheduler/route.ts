"use client";

import { NextRequest, NextResponse } from "next/server";

// Email processing service for CosmicScheduler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract email data from request
    const { 
      from, 
      subject, 
      body: emailBody, 
      participants = [], 
      preferredDates = [],
      duration = 30 // default 30 minutes
    } = body;
    
    // Process the email content using NLP (simplified version)
    const meetingDetails = processEmailContent(subject, emailBody);
    
    // Generate suggested time slots (simplified version)
    const suggestedTimeSlots = generateTimeSlots(preferredDates, participants, duration);
    
    // In a real implementation, we would:
    // 1. Store the meeting request in a database
    // 2. Send emails to participants with time slot options
    // 3. Set up a system to collect and process responses
    
    // For demo purposes, return the processed information
    return NextResponse.json({
      success: true,
      meetingId: generateMeetingId(),
      organizer: from,
      meetingDetails,
      suggestedTimeSlots,
      participants,
      status: 'pending',
      message: 'Meeting request processed successfully. Invitations will be sent to participants.'
    });
    
  } catch (error) {
    console.error('Error processing email request:', error);
    return NextResponse.json(
      { error: 'Failed to process email scheduling request' },
      { status: 500 }
    );
  }
}

// Helper functions (simplified implementations)
function processEmailContent(subject: string, body: string) {
  // In a real implementation, this would use NLP to extract meeting details
  return {
    title: subject || 'Untitled Meeting',
    description: body ? body.substring(0, 200) : 'No description provided',
    detectedTimePreferences: extractTimePreferences(body),
    detectedLocationPreferences: extractLocationPreferences(body),
    isVirtual: body.toLowerCase().includes('zoom') || body.toLowerCase().includes('teams') || body.toLowerCase().includes('meet'),
  };
}

function extractTimePreferences(body: string) {
  // Simplified time preference extraction
  // In a real implementation, this would use more sophisticated NLP
  const timeRegex = /(\d{1,2})(:\d{2})?\s*(am|pm|AM|PM)?/g;
  const dateRegex = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|next week)/gi;
  
  const times = body.match(timeRegex) || [];
  const dates = body.match(dateRegex) || [];
  
  return { times, dates };
}

function extractLocationPreferences(body: string) {
  // Simplified location extraction
  const virtualPlatforms = ['zoom', 'teams', 'meet', 'google meet', 'microsoft teams'];
  
  for (const platform of virtualPlatforms) {
    if (body.toLowerCase().includes(platform)) {
      return { type: 'virtual', platform };
    }
  }
  
  // Check for physical location indicators
  if (body.toLowerCase().includes('office') || body.toLowerCase().includes('room') || body.toLowerCase().includes('building')) {
    return { type: 'physical' };
  }
  
  return { type: 'unspecified' };
}

function generateTimeSlots(preferredDates: string[], participants: string[], durationMinutes: number) {
  // In a real implementation, this would check calendar availability
  // For demo purposes, generate some sample time slots
  const now = new Date();
  const slots = [];
  
  // Generate 3 sample slots
  for (let i = 0; i < 3; i++) {
    const slotDate = new Date(now);
    slotDate.setDate(slotDate.getDate() + i + 1); // Next few days
    slotDate.setHours(10 + i, 0, 0, 0); // Different times each day
    
    const endTime = new Date(slotDate);
    endTime.setMinutes(endTime.getMinutes() + durationMinutes);
    
    slots.push({
      id: `slot-${i}`,
      startTime: slotDate.toISOString(),
      endTime: endTime.toISOString(),
      score: 100 - (i * 10), // Decreasing preference score
    });
  }
  
  return slots;
}

function generateMeetingId() {
  return 'meet-' + Math.random().toString(36).substring(2, 10);
}
