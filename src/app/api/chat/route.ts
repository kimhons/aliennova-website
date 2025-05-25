import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Model provider mapping
const MODEL_PROVIDERS = {
  'gpt': 'openai',
  'claude': 'anthropic',
  'gemini': 'google',
  'mistral': 'mistral',
  'cohere': 'cohere',
  'meta': 'replicate',
};

export async function POST(req: NextRequest) {
  try {
    // Import auth dynamically to prevent execution during build time
    const { auth } = await import('@clerk/nextjs');
    const { userId } = auth();
    
    // Optional: Check authentication
    if (!userId && !req.nextUrl.pathname.startsWith('/api/chat')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { message, model = 'gpt-4o' } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Determine provider based on model prefix
    const provider = Object.entries(MODEL_PROVIDERS).find(([prefix]) => 
      model.startsWith(prefix)
    )?.[1] || 'openai';

    let reply = '';

    // Initialize API clients inside the handler to prevent execution during build
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

    // Route to appropriate API based on provider
    switch (provider) {
      case 'openai':
        const openaiCompletion = await openai.chat.completions.create({
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are StarTalk, an AI assistant for AlienNova.com. You are helpful, creative, and knowledgeable. Respond in a friendly and conversational manner.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
        reply = openaiCompletion.choices[0].message.content || '';
        break;

      case 'anthropic':
        // Using Anthropic's completion API instead of messages API
        const anthropicCompletion = await anthropic.completions.create({
          model: model,
          prompt: `\n\nHuman: ${message}\n\nAssistant:`,
          max_tokens_to_sample: 1000,
          stop_sequences: ["\n\nHuman:"],
        });
        reply = anthropicCompletion.completion;
        break;

      case 'google':
        const geminiModel = genAI.getGenerativeModel({ model: model });
        const geminiResult = await geminiModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        });
        reply = geminiResult.response.text();
        break;

      case 'mistral':
        // Fallback to OpenAI for now - would implement Mistral API in production
        reply = "Mistral API integration would be implemented here. For now, this is a placeholder response.";
        break;

      case 'cohere':
        // Fallback to OpenAI for now - would implement Cohere API in production
        reply = "Cohere API integration would be implemented here. For now, this is a placeholder response.";
        break;

      case 'replicate':
        // Fallback to OpenAI for now - would implement Replicate API in production
        reply = "Replicate API integration for Llama models would be implemented here. For now, this is a placeholder response.";
        break;

      default:
        // Default to OpenAI if provider not recognized
        const defaultCompletion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are StarTalk, an AI assistant for AlienNova.com.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
        reply = defaultCompletion.choices[0].message.content || '';
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
