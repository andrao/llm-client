import { Anthropic } from '@anthropic-ai/sdk';

export type { Anthropic } from '@anthropic-ai/sdk';

/**
 * @const CLIENT_MAP
 * @description Clients keyed on API key
 */
const CLIENT_MAP: Record<string, Anthropic> = {};

/**
 * @function getAnthropicClient
 * @description Get Anthropic-configured OpenAI client
 */
export function getAnthropicClient({ anthropic_api_key }: { anthropic_api_key: string }) {
    const client =
        CLIENT_MAP[anthropic_api_key] ??
        new Anthropic({
            apiKey: anthropic_api_key,
        });

    CLIENT_MAP[anthropic_api_key] = client;

    return client;
}
