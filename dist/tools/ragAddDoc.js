"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptor = exports.outputSchema = exports.inputSchema = void 0;
exports.handler = handler;
const zod_1 = require("zod");
const openaiAdapter_1 = require("../llm/openaiAdapter");
const ollamaAdapter_1 = require("../llm/ollamaAdapter");
const vectorStore_1 = require("../rag/vectorStore");
const crypto_1 = require("crypto");
exports.inputSchema = zod_1.z.object({
    text: zod_1.z.string().min(10),
    provider: zod_1.z.enum(['openai', 'ollama']).optional()
});
exports.outputSchema = zod_1.z.object({
    id: zod_1.z.string(),
    status: zod_1.z.literal('added')
});
exports.descriptor = {
    toolId: 'rag.addDoc',
    name: 'RAG Add Doc',
    description: 'Adds a document to the local vector store for RAG.',
    version: '1.0.0',
    inputSchema: exports.inputSchema,
    outputSchema: exports.outputSchema,
    tags: ['rag', 'vector']
};
async function handler({ text, provider = 'openai' }) {
    const embed = provider === 'ollama' ? ollamaAdapter_1.embedOllama : openaiAdapter_1.embedOpenAI;
    const embedding = await embed(text);
    const id = (0, crypto_1.randomUUID)();
    await (0, vectorStore_1.addDoc)({ id, text, embedding });
    return { id, status: 'added' };
}
