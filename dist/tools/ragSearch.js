"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptor = exports.outputSchema = exports.inputSchema = void 0;
exports.handler = handler;
const zod_1 = require("zod");
const openaiAdapter_1 = require("../llm/openaiAdapter");
const ollamaAdapter_1 = require("../llm/ollamaAdapter");
const vectorStore_1 = require("../rag/vectorStore");
const openaiAdapter_2 = require("../llm/openaiAdapter");
const ollamaAdapter_2 = require("../llm/ollamaAdapter");
exports.inputSchema = zod_1.z.object({
    query: zod_1.z.string(),
    provider: zod_1.z.enum(['openai', 'ollama']).optional(),
    topK: zod_1.z.number().int().min(1).max(10).optional()
});
exports.outputSchema = zod_1.z.object({
    answer: zod_1.z.string(),
    docs: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string(), text: zod_1.z.string() }))
});
exports.descriptor = {
    toolId: 'rag.search',
    name: 'RAG Search',
    description: 'Retrieves top‑K similar docs then answers with the LLM.',
    version: '1.0.0',
    inputSchema: exports.inputSchema,
    outputSchema: exports.outputSchema,
    tags: ['rag', 'search']
};
async function handler({ query, provider = 'openai', topK: k = 3 }) {
    const embed = provider === 'ollama' ? ollamaAdapter_1.embedOllama : openaiAdapter_1.embedOpenAI;
    const chat = provider === 'ollama' ? ollamaAdapter_2.chatOllama : openaiAdapter_2.chatOpenAI;
    const queryEmb = await embed(query);
    const docs = await (0, vectorStore_1.topK)(queryEmb, k);
    const context = docs.map(d => `• ${d.text}`).join('\n');
    const prompt = `Answer the user question using ONLY the context below.\n\nContext:\n${context}\n\nQuestion: ${query}`;
    const answer = await chat(prompt);
    return { answer, docs: docs.map(({ id, text }) => ({ id, text })) };
}
