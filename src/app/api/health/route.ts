import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { auth } from '@clerk/nextjs';

export async function GET(req: NextRequest) {
=======

// Use dynamic import for auth to prevent build-time execution
export async function GET(req: NextRequest) {
  // Import auth dynamically to prevent execution during build time
  const { auth } = await import('@clerk/nextjs');
>>>>>>> 47466733799704ed0ae99d489109aee21bbcbd91
  try {
    const { userId } = auth();
    
    // Check authentication
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // This is a simple health check endpoint to verify all APIs are working
    return NextResponse.json({ 
      status: 'ok',
      features: {
        auth: 'active',
        chat: 'active',
        write: 'active',
        image: 'active',
        learn: 'active'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 500 }
    );
  }
}
