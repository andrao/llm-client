import { retry } from '@andrao/tools';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';
import type { Anthropic } from '../getAnthropicClient';

/**
 * @function runAnthropicCompletion
 * @description Run chat completion using Anthropic client
 */
export async function runAnthropicCompletion({
    client,
    src,
    timeout,
    params,
}: {
    client: Anthropic;
    src: string;
    timeout: number;
    params: Omit<ChatCompletionCreateParamsBase, 'messages' | 'stream'> & {
        messages: Array<MessageParam>;
        system?: string;
    };
}) {
    /**
     * Run completion
     */
    const response = await retry(
        () =>
            client.messages.create(
                {
                    ...params,

                    // Type cast
                    max_tokens: params.max_tokens ?? 3000,
                    temperature: params.temperature ?? undefined,
                    top_p: params.top_p ?? undefined,
                },
                { timeout },
            ),
        {
            max_attempts: 3,
            timeout,
            src,
            isRetryable: ({ error }) => !(error as Error).message.includes('rate_limit_error'),
        },
    );

    if (response.content.length !== 1)
        throw new Error(
            `Expected exactly one completion from Anthropic, got ${response.content.length}`,
        );

    return response.content[0]?.text ?? '';
}
