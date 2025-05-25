# AlienNova.com

AlienNova.com is a comprehensive AI platform offering multiple AI tools with model switching capabilities, similar to Monica.im but with enhanced features and a space-themed design.

## Features

- **StarTalk AI Chat**: Conversational AI with model switching between multiple providers (OpenAI, Anthropic, Google, etc.)
- **NebulaWrite**: AI writing assistant with templates and formatting options
- **GalaxyArt**: Image generation with style options and multiple model support
- **Learn Hub**: Educational content with articles and categories

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Vercel account for deployment
- API keys for various AI providers

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kimhons/aliennova-website.git
cd aliennova-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the required environment variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
ELEVENLABS_API_KEY=your_elevenlabs_api_key
MISTRAL_API_KEY=your_mistral_api_key
COHERE_API_KEY=your_cohere_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for easy deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel project settings
3. Deploy

## Technology Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Authentication**: Clerk
- **AI Providers**: OpenAI, Anthropic, Google, Replicate, Mistral, Cohere
- **Deployment**: Vercel

## License

This project is proprietary and confidential.

## Contact

For questions or support, contact support@aliennova.com
