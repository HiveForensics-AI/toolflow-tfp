"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatOllama = chatOllama;
exports.embedOllama = embedOllama;
const axios_1 = __importDefault(require("axios"));
const base = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const chatModel = process.env.OLLAMA_MODEL || 'llama3';
const embedModel = process.env.OLLAMA_EMBED_MODEL || 'llama3';
async function chatOllama(prompt) {
    var _a, _b;
    const { data } = await axios_1.default.post(`${base}/api/chat`, {
        model: chatModel,
        messages: [{ role: 'user', content: prompt }]
    });
    return (_b = (_a = data.message) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : '';
}
async function embedOllama(text) {
    const { data } = await axios_1.default.post(`${base}/api/embeddings`, {
        model: embedModel,
        prompt: text
    });
    return data.embedding;
}
