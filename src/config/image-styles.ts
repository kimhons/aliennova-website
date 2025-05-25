import { useState } from 'react';

export interface ImageStyle {
  id: string;
  name: string;
  icon: string;
  description: string;
  prompt: string;
  defaultModel: string;
}

export const imageStyles: ImageStyle[] = [
  {
    id: 'realistic',
    name: 'Photorealistic',
    icon: '📷',
    description: 'Highly detailed photorealistic images',
    prompt: 'photorealistic, highly detailed, sharp focus, 8k resolution, professional photography',
    defaultModel: 'dall-e-3',
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    icon: '🎨',
    description: 'Modern digital art style',
    prompt: 'digital art, vibrant colors, detailed, concept art, trending on artstation',
    defaultModel: 'dall-e-3',
  },
  {
    id: 'anime',
    name: 'Anime',
    icon: '🇯🇵',
    description: 'Japanese anime style illustration',
    prompt: 'anime style, manga illustration, detailed, vibrant colors, studio ghibli inspired',
    defaultModel: 'flux-dev',
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    icon: '🐉',
    description: 'Magical fantasy world style',
    prompt: 'fantasy art, magical, ethereal lighting, detailed environment, mystical atmosphere',
    defaultModel: 'ideogram-v3-turbo',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    icon: '🌀',
    description: 'Abstract artistic expression',
    prompt: 'abstract art, non-representational, geometric shapes, vibrant colors, artistic expression',
    defaultModel: 'dall-e-3',
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    icon: '🚀',
    description: 'Futuristic science fiction style',
    prompt: 'science fiction, futuristic, cyberpunk, advanced technology, neon lights, detailed',
    defaultModel: 'ideogram-v3-turbo',
  },
];

export const IMAGE_MODELS = [
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    apiEnvVar: 'OPENAI_API_KEY',
  },
  {
    id: 'flux-dev',
    name: 'Flux',
    provider: 'Black Forest Labs (via Replicate)',
    apiEnvVar: 'REPLICATE_API_TOKEN',
  },
  {
    id: 'ideogram-v3-turbo',
    name: 'Ideogram v3',
    provider: 'Ideogram AI (via Replicate)',
    apiEnvVar: 'REPLICATE_API_TOKEN',
  },
];

export function getStyleById(id: string): ImageStyle {
  return imageStyles.find(style => style.id === id) || imageStyles[0];
}
