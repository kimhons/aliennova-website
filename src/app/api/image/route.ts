import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Optional: Check authentication
    if (!userId && !req.nextUrl.pathname.startsWith('/api/image')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { prompt, model = 'dall-e-3', style } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    let imageUrl = '';

    // Route to appropriate API based on model
    if (model === 'dall-e-3') {
      // Use OpenAI's DALL-E 3
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      });

      imageUrl = response.data?.[0]?.url || '';
    } 
    else if (model === 'flux-dev' || model === 'ideogram-v3-turbo') {
      // For Replicate models, we'd implement the API call here
      // This is a placeholder for the actual implementation
      imageUrl = "https://replicate.delivery/pbxt/JjhFzwgYlSR7lcG6Z4V84NRdimRJLzLTBOWsm3Qv9zLvHFHIA/out-0.png";
    }
    else {
      // Default fallback
      return NextResponse.json(
        { error: 'Unsupported model' },
        { status: 400 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Image API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
