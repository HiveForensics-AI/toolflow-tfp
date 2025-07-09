"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDoc = addDoc;
exports.topK = topK;
const promises_1 = __importDefault(require("fs/promises"));
const storePath = process.env.VECTOR_STORE_PATH || 'vectorStore.json';
async function load() {
    try {
        return JSON.parse(await promises_1.default.readFile(storePath, 'utf8'));
    }
    catch {
        return [];
    }
}
async function save(docs) {
    await promises_1.default.writeFile(storePath, JSON.stringify(docs, null, 2), 'utf8');
}
async function addDoc(doc) {
    const docs = await load();
    docs.push(doc);
    await save(docs);
}
function cosine(a, b) {
    const dot = a.reduce((s, v, i) => s + v * b[i], 0);
    const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
    return dot / (magA * magB);
}
async function topK(queryEmb, k = 3) {
    const docs = await load();
    return docs
        .map(d => ({ doc: d, score: cosine(queryEmb, d.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(({ doc }) => doc);
}
