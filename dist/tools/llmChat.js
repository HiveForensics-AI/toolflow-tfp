"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptor = exports.outputSchema = exports.inputSchema = void 0;
exports.handler = handler;
const zod_1 = require("zod");
const openaiAdapter_1 = require("../llm/openaiAdapter");
const ollamaAdapter_1 = require("../llm/ollamaAdapter");
exports.inputSchema = zod_1.z.object({
    prompt: zod_1.z.string(),
    provider: zod_1.z.enum(['openai', 'ollama']).optional()
});
exports.outputSchema = zod_1.z.object({ completion: zod_1.z.string() });
exports.descriptor = {
    toolId: 'llm.chat',
    name: 'LLM Chat',
    description: 'Single‑turn chat completion via OpenAI or Ollama.',
    version: '1.0.0',
    inputSchema: exports.inputSchema,
    outputSchema: exports.outputSchema,
    tags: ['llm']
};
async function handler({ prompt, provider }) {
    const completion = provider === 'ollama'
        ? await (0, ollamaAdapter_1.chatOllama)(prompt)
        : await (0, openaiAdapter_1.chatOpenAI)(prompt);
    return { completion };
}
