import { retry } from '@andrao/tools';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';
import type { OpenAI } from '../getOpenAIClient';
import { TogetherStopSequences, type TogetherModel } from '../types/together';

/**
 * @function runOpenAiCompletion
 * @description Run chat completion using OpenAI client
 */
export async function runOpenAiCompletion({
    client,
    src,
    timeout,
    params,
}: {
    client: OpenAI;
    src: string;
    timeout: number;
    params: Omit<ChatCompletionCreateParamsBase, 'stream'>;
}) {
    const stop = TogetherStopSequences[params.model as TogetherModel] as Array<string> | undefined;

    /**
     * Get chat stream
     * @comment Using a stream seems to be more reliable than _not_ using a stream; the latter often hangs
     */
    const stream = await retry(
        () =>
            client.chat.completions.create(
                {
                    stop,
                    ...params,
                    stream: true,
                },
                { timeout },
            ),
        { max_attempts: 3, timeout, src },
    );

    /**
     * Parse message from stream
     */
    let response = ``;

    for await (const chunk of stream) response += chunk.choices[0]?.delta?.content ?? '';

    return response;
}
