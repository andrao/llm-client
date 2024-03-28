/**
 * @enum TogetherModel
 * @description together.ai inference models
 * @see https://docs.together.ai/docs/inference-models
 */
export enum TogetherModel {
    'mistralai/Mixtral-8x7B-v0.1' = 'mistralai/Mixtral-8x7B-v0.1',
    'mistralai/Mixtral-8x7B-Instruct-v0.1' = 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    'NousResearch/Nous-Hermes-llama-2-7b' = 'NousResearch/Nous-Hermes-llama-2-7b',
    'NousResearch/Nous-Hermes-Llama2-13b' = 'NousResearch/Nous-Hermes-Llama2-13b',
    'NousResearch/Nous-Hermes-2-Mistral-7B-DPO' = 'NousResearch/Nous-Hermes-2-Mistral-7B-DPO',
    'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO' = 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO',
    'NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT' = 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT',
    'meta-llama/Llama-2-7b-chat-hf' = 'meta-llama/Llama-2-7b-chat-hf',
    'meta-llama/Llama-2-13b-chat-hf' = 'meta-llama/Llama-2-13b-chat-hf',
    'meta-llama/Llama-2-70b-chat-hf' = 'meta-llama/Llama-2-70b-chat-hf',
}

export const TogetherStopSequences: Record<TogetherModel, Array<string>> = {
    'mistralai/Mixtral-8x7B-v0.1': ['</s>'],
    'mistralai/Mixtral-8x7B-Instruct-v0.1': ['</s>', '[/INST]'],
    'NousResearch/Nous-Hermes-llama-2-7b': ['###', '</s>'],
    'NousResearch/Nous-Hermes-Llama2-13b': ['###', '</s>'],
    'NousResearch/Nous-Hermes-2-Mistral-7B-DPO': ['<|im_end|>'],
    'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO': ['<|im_end|>'],
    'NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT': ['<|im_end|>'],
    'meta-llama/Llama-2-7b-chat-hf': ['</s>', '[/INST]'],
    'meta-llama/Llama-2-13b-chat-hf': ['</s>', '[/INST]'],
    'meta-llama/Llama-2-70b-chat-hf': ['</s>', '[/INST]'],
};
