import { OpenAI } from 'openai';

/**
 * @const OLLAMA_API_BASE_URL
 * @description Ollama local API base URL
 */
const OLLAMA_API_BASE_URL = 'http://localhost:11434/v1';

/**
 * @const CLIENT_MAP
 * @description Clients keyed on API key
 */
const CLIENT_MAP: Record<string, OpenAI> = {};

/**
 * @function getOllamaClient
 * @description Get local Ollama-configured OpenAI client
 */
export function getOllamaClient({
    VERCEL_ENV,
}: {
    VERCEL_ENV: 'preview' | 'production' | 'development';
}) {
    if (VERCEL_ENV === 'preview' || VERCEL_ENV === 'production')
        throw new Error(`Ollama client is only available in development mode; got "${VERCEL_ENV}"`);

    const key = `ollama`;

    const client = CLIENT_MAP[key] ?? new OpenAI({ apiKey: key, baseURL: OLLAMA_API_BASE_URL });

    CLIENT_MAP[key] = client;

    return client;
}
