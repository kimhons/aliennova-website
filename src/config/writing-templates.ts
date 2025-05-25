import { useState } from 'react';

export interface WritingTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  prompt: string;
  placeholders: string[];
  defaultModel: string;
}

export const WRITING_TEMPLATES: WritingTemplate[] = [
  {
    id: 'blog-post',
    name: 'Blog Post',
    icon: '📝',
    description: 'Create an engaging blog post on any topic',
    prompt: 'Write a comprehensive blog post about {topic}. The tone should be {tone} and the target audience is {audience}. Include an introduction, 3-5 main points with subheadings, and a conclusion.',
    placeholders: ['topic', 'tone', 'audience'],
    defaultModel: 'gpt-4o',
  },
  {
    id: 'social-media',
    name: 'Social Media Post',
    icon: '📱',
    description: 'Craft engaging social media content',
    prompt: 'Create a {platform} post about {topic}. The post should be {tone} in tone and include relevant hashtags. The target audience is {audience}.',
    placeholders: ['platform', 'topic', 'tone', 'audience'],
    defaultModel: 'claude-3-opus',
  },
  {
    id: 'email',
    name: 'Professional Email',
    icon: '📧',
    description: 'Draft professional emails for any purpose',
    prompt: 'Write a professional email to {recipient} regarding {subject}. The tone should be {tone} and the purpose is to {purpose}.',
    placeholders: ['recipient', 'subject', 'tone', 'purpose'],
    defaultModel: 'gpt-4o',
  },
  {
    id: 'product-description',
    name: 'Product Description',
    icon: '🛍️',
    description: 'Create compelling product descriptions',
    prompt: 'Write a compelling product description for {product}. The target audience is {audience} and the key features to highlight are {features}. The tone should be {tone}.',
    placeholders: ['product', 'audience', 'features', 'tone'],
    defaultModel: 'gemini-1.5-pro',
  },
  {
    id: 'academic-essay',
    name: 'Academic Essay',
    icon: '🎓',
    description: 'Generate structured academic content',
    prompt: 'Write an academic essay on the topic of {topic}. The essay should follow {style} citation style, include scholarly references, and be written at a {level} level. The main arguments should address {arguments}.',
    placeholders: ['topic', 'style', 'level', 'arguments'],
    defaultModel: 'claude-3-opus',
  },
  {
    id: 'creative-story',
    name: 'Creative Story',
    icon: '📚',
    description: 'Generate creative short stories',
    prompt: 'Write a creative short story in the {genre} genre. The main character is {character} and the setting is {setting}. The story should have the following theme: {theme}.',
    placeholders: ['genre', 'character', 'setting', 'theme'],
    defaultModel: 'meta-llama-3-70b-instruct',
  },
];

export function getTemplateById(id: string): WritingTemplate {
  return WRITING_TEMPLATES.find(template => template.id === id) || WRITING_TEMPLATES[0];
}
