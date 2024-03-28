import { OpenAI } from 'openai';

export type { OpenAI } from 'openai';

/**
 * @const CLIENT_MAP
 * @description Clients keyed on API key
 */
const CLIENT_MAP: Record<string, OpenAI> = {};

/**
 * @function getOpenAIClient
 * @description Get OpenAI client
 */
export function getOpenAIClient({ openai_api_key }: { openai_api_key: string }) {
    const client = CLIENT_MAP[openai_api_key] ?? new OpenAI({ apiKey: openai_api_key });
    CLIENT_MAP[openai_api_key] = client;

    return client;
}
