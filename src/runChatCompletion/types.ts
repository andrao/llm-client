import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';
import type { TogetherModel } from '../types/together';

/**
 * @interface IModelInput
 * @description Model selection + API key
 */
export type IModelInput =
    | {
          model: 'gpt-3.5-turbo' | 'gpt-4-turbo-preview' | 'gpt-4-vision-preview';
          openai_api_key: string;
          together_api_key?: never;
          anthropic_api_key?: never;

          messages: ChatCompletionCreateParamsBase['messages'];
          system?: never;
      }
    | {
          model: TogetherModel;
          together_api_key: string;
          openai_api_key?: never;
          anthropic_api_key?: never;

          messages: ChatCompletionCreateParamsBase['messages'];
          system?: never;
      }
    | {
          model: 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307';
          anthropic_api_key: string;
          openai_api_key?: never;
          together_api_key?: never;

          messages: Array<MessageParam>;
          system?: string;
      };
