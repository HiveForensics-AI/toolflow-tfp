"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatOpenAI = chatOpenAI;
exports.embedOpenAI = embedOpenAI;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
async function chatOpenAI(prompt, model = process.env.OPENAI_MODEL || 'gpt-4o-mini') {
    var _a;
    const res = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }]
    });
    return (_a = res.choices[0].message.content) !== null && _a !== void 0 ? _a : '';
}
async function embedOpenAI(text, model = process.env.OPENAI_EMBED_MODEL || 'text-embedding-3-small') {
    const e = await openai.embeddings.create({ model, input: text });
    return e.data[0].embedding;
}
