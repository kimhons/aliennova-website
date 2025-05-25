import { useState } from 'react';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: string;
  description: string;
  contextWindow: number;
  strengths: string[];
  apiEnvVar: string;
}

export const AI_MODELS: AIModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    icon: '🧠',
    description: 'OpenAI\'s most advanced model with multimodal capabilities',
    contextWindow: 128000,
    strengths: ['General knowledge', 'Reasoning', 'Creative writing', 'Code generation'],
    apiEnvVar: 'OPENAI_API_KEY',
  },
  
  // Anthropic Models
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    icon: '🔮',
    description: 'Anthropic\'s most capable model for complex tasks',
    contextWindow: 200000,
    strengths: ['Detailed analysis', 'Long-form content', 'Nuanced understanding', 'Safety'],
    apiEnvVar: 'ANTHROPIC_API_KEY',
  },
  
  // Google Models
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    icon: '💫',
    description: 'Google\'s advanced multimodal model',
    contextWindow: 1000000,
    strengths: ['Multimodal understanding', 'Long context', 'Factual knowledge', 'Reasoning'],
    apiEnvVar: 'GOOGLE_AI_API_KEY',
  },
  
  // Mistral Models
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    icon: '🌪️',
    description: 'Mistral\'s flagship large language model',
    contextWindow: 32768,
    strengths: ['Reasoning', 'Code generation', 'Instruction following', 'Efficiency'],
    apiEnvVar: 'MISTRAL_API_KEY',
  },
  
  // Cohere Models
  {
    id: 'cohere-command-r-plus',
    name: 'Command R+',
    provider: 'Cohere',
    icon: '🔄',
    description: 'Cohere\'s advanced reasoning and generation model',
    contextWindow: 128000,
    strengths: ['Reasoning', 'Summarization', 'Content generation', 'Enterprise use'],
    apiEnvVar: 'COHERE_API_KEY',
  },
  
  // Replicate-hosted Models
  {
    id: 'meta-llama-3-70b-instruct',
    name: 'Llama 3 70B',
    provider: 'Meta (via Replicate)',
    icon: '🦙',
    description: 'Meta\'s open model with strong general capabilities',
    contextWindow: 8192,
    strengths: ['Open source', 'General knowledge', 'Instruction following', 'Multilingual'],
    apiEnvVar: 'REPLICATE_API_TOKEN',
  },
];

export function getModelById(id: string): AIModel {
  return AI_MODELS.find(model => model.id === id) || AI_MODELS[0];
}

export function getModelsByProvider(provider: string): AIModel[] {
  return AI_MODELS.filter(model => model.provider === provider);
}
