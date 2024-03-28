# 🤖 @andrao/llm-client

[![npm version](https://badge.fury.io/js/@andrao%2Fllm-client.svg)](https://badge.fury.io/js/@andrao/llm-client)
![build](https://github.com/andrao/llm-client/workflows/CI/badge.svg)

This repo provides a single interface for interacting with LLMs from [Anthropic](https://www.anthropic.com/), [OpenAI](https://openai.com/), [Together.ai](https://www.together.ai/), and, locally, [Ollama](https://ollama.com/).

## Primary exports

| Function            | Description                            |
| ------------------- | -------------------------------------- |
| `runChatCompletion` | Interoperable chat completion function |

## Secondary exports

| Function             | Description                                      |
| -------------------- | ------------------------------------------------ |
| `getAnthropicClient` | Lazy-init an Anthropic SDK client                |
| `getOllamaClient`    | Lazy-init an Ollama client via the OpenAI SDK    |
| `getOpenAIClient`    | Lazy-init an OpenAI SDK client                   |
| `getTogetherClient`  | Lazy-init a Togeter.ai client via the OpenAI SDK |
