import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';
import { getAnthropicClient } from '../getAnthropicClient';
import { getOpenAIClient } from '../getOpenAIClient';
import { getTogetherClient } from '../getTogetherClient';
import { runAnthropicCompletion } from './runAnthropicCompletion';
import { runOpenAiCompletion } from './runOpenAiCompletion';
import type { IModelInput } from './types';

type IArgs = Omit<ChatCompletionCreateParamsBase, 'messages' | 'model' | 'stream'> &
    IModelInput & {
        src: string;
        timeout?: number;
    };

/**
 * @const DEFAULT_REQUEST_TIMEOUT_IN_MS
 * @description Chat completion request timeout
 */
const DEFAULT_REQUEST_TIMEOUT_IN_MS = 1000 * 40;

/**
 * @function runChatCompletion
 * @description Run chat completion
 */
export async function runChatCompletion({
    src,
    timeout = DEFAULT_REQUEST_TIMEOUT_IN_MS,
    ...params
}: IArgs): Promise<string> {
    const { client, type } = getClient(params);

    if (type === 'anthropic' && params.anthropic_api_key)
        return await runAnthropicCompletion({ client, src, params: cleanParams(params), timeout });
    else if (type === 'openai' && (params.openai_api_key ?? params.together_api_key))
        return await runOpenAiCompletion({ client, src, params: cleanParams(params), timeout });

    throw new Error(`Invalid input`);
}

/**
 * @function getClient
 * @description Get client based on input API key
 */
function getClient({
    anthropic_api_key,
    openai_api_key,
    together_api_key,
}: Pick<IModelInput, 'anthropic_api_key' | 'openai_api_key' | 'together_api_key'>) {
    if (anthropic_api_key)
        return { type: 'anthropic' as const, client: getAnthropicClient({ anthropic_api_key }) };
    else if (openai_api_key)
        return { type: 'openai' as const, client: getOpenAIClient({ openai_api_key }) };
    else if (together_api_key)
        return { type: 'openai' as const, client: getTogetherClient({ together_api_key }) };

    throw new Error(`Invalid input`);
}

/**
 * @function cleanParams
 * @description Remove API keys from input params
 */
function cleanParams<P extends Omit<IArgs, 'src' | 'timeout'>>(input: P) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { anthropic_api_key, openai_api_key, together_api_key, ...params } = input;

    return params;
}
