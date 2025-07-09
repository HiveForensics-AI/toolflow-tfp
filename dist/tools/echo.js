"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptor = exports.outputSchema = exports.inputSchema = void 0;
exports.handler = handler;
const zod_1 = require("zod");
exports.inputSchema = zod_1.z.object({
    text: zod_1.z.string()
});
exports.outputSchema = zod_1.z.object({
    echoed: zod_1.z.string()
});
exports.descriptor = {
    toolId: 'echo.v1',
    name: 'Echo',
    description: 'Returns the same text sent in the input.',
    version: '1.0.0',
    inputSchema: exports.inputSchema,
    outputSchema: exports.outputSchema,
    tags: ['utility']
};
// ---- Handler ----
async function handler(input) {
    return { echoed: input.text };
}
