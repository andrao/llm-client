import { OpenAI } from 'openai';

/**
 * @const TOGETHER_AI_API_BASE_URL
 * @description together.ai API base URL
 */
const TOGETHER_AI_API_BASE_URL = 'https://api.together.xyz/v1';

/**
 * @const CLIENT_MAP
 * @description Clients keyed on API key
 */
const CLIENT_MAP: Record<string, OpenAI> = {};

/**
 * @function getTogetherClient
 * @description Get together.ai-configured OpenAI client
 */
export function getTogetherClient({ together_api_key }: { together_api_key: string }) {
    const client =
        CLIENT_MAP[together_api_key] ??
        new OpenAI({ apiKey: together_api_key, baseURL: TOGETHER_AI_API_BASE_URL });

    CLIENT_MAP[together_api_key] = client;

    return client;
}
