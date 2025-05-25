# AlienNova.com API Token Requirements

This document contains all the API tokens and credentials needed for the AlienNova.com website deployment with model switching functionality. Please store this information securely.

## Deployment Tokens

### GitHub Token
- **Token**: `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`
- **Purpose**: Repository access and CI/CD integration
- **Expiration**: Tonight
- **Scope**: Full account access

### Vercel Token
- **Token**: `<VERCEL_TOKEN_PLACEHOLDER>`
- **Purpose**: Deployment and project management
- **Expiration**: Tonight
- **Scope**: Full account access
- **Required Information**:
  - Organization ID: `<VERCEL_ORG_ID_PLACEHOLDER>`
  - Project ID: `<VERCEL_PROJECT_ID_PLACEHOLDER>`

## Authentication Tokens

### Clerk Authentication
- **Public Key**: `pk_test_aW5zcGlyZWQtZ2FyLTY4LmNsZXJrLmFjY291bnRzLmRldiQ`
- **Secret Key**: `sk_test_l9a6SAa1eXZpIS6SIM0V540KFAFH4oqH6UPwf0zVek`
- **Environment Variables**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public key (client-side)
  - `CLERK_SECRET_KEY`: Secret key (server-side only)
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: `/sign-up`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: `/`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: `/`

## AI Model Provider Tokens

### OpenAI
- **API Key**: `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`
- **Environment Variable**: `OPENAI_API_KEY`
- **Models Used**: 
  - GPT-4o (chat)
  - DALL-E 3 (image generation)

### Anthropic
- **API Key**: `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`
- **Environment Variable**: `ANTHROPIC_API_KEY`
- **Models Used**:
  - Claude 3 Opus (chat)

### Google AI
- **API Key**: `AIzaSyDYPL45FyFh48IOriMqnUk4SOw3rdh8ty8`
- **Environment Variable**: `GOOGLE_AI_API_KEY`
- **Models Used**:
  - Gemini 1.5 Pro (chat)

### Replicate
- **API Token**: `r8_OhDgcv4cgDF2Y5ehyVGtGTODNQtUITV0qYxOn`
- **Environment Variable**: `REPLICATE_API_TOKEN`
- **Models Used**:
  - Llama 3 70B (chat)
  - Flux (image generation)
  - Ideogram v3 (image generation)

### ElevenLabs
- **API Key**: `sk_d902decf9f04f1c32295cfcc55e5a03e35712e7d39c5e22f`
- **Environment Variable**: `ELEVENLABS_API_KEY`
- **Models Used**:
  - Voice synthesis (future implementation)

### Mistral AI
- **API Key**: `KIFepQMw4bmX53hufPX8eFH1AweKbH7b`
- **Environment Variable**: `MISTRAL_API_KEY`
- **Models Used**:
  - Mistral Large (chat)

### Cohere
- **API Key**: `exjSVKmCrZz1tHXNcaLI0awOD6AyNj54C4q90QSI`
- **Environment Variable**: `COHERE_API_KEY`
- **Models Used**:
  - Command R+ (chat)

## Security Best Practices

1. **Environment Variables**: All tokens must be stored as environment variables in Vercel, never in code
2. **Token Rotation**: Rotate all tokens after initial deployment and set up a regular rotation schedule
3. **Scope Limitation**: After initial deployment, replace full-access tokens with limited-scope tokens
4. **Access Control**: Limit access to the Vercel project and environment variables to essential team members
5. **Monitoring**: Set up alerts for unusual API usage patterns
6. **Backup**: Keep a secure backup of all tokens in case of emergency

## Vercel Environment Variables Setup

When deploying to Vercel, add all tokens as environment variables in the project settings. Ensure that only the Clerk publishable key has the `NEXT_PUBLIC_` prefix, as all other tokens should remain server-side only.

## Emergency Contact

In case of security concerns or token compromise, immediately contact:
- Security Team: security@aliennova.com
- API Provider Support: respective provider support channels
