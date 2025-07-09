"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallToolErrorSchema = exports.CallToolSuccessSchema = exports.CallToolRequestSchema = exports.ToolDescriptorSchema = void 0;
const zod_1 = require("zod");
// ---- Core Zod schemas ----
exports.ToolDescriptorSchema = zod_1.z.object({
    toolId: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    version: zod_1.z.string(), // semver
    inputSchema: zod_1.z.any(), // will be refined per‑tool
    outputSchema: zod_1.z.any(),
    tags: zod_1.z.array(zod_1.z.string()).optional()
});
exports.CallToolRequestSchema = zod_1.z.object({
    requestId: zod_1.z.string(), // uuid
    toolId: zod_1.z.string(),
    input: zod_1.z.any()
});
exports.CallToolSuccessSchema = zod_1.z.object({
    requestId: zod_1.z.string(),
    toolId: zod_1.z.string(),
    output: zod_1.z.any(),
    metadata: zod_1.z.object({
        durationMs: zod_1.z.number(),
        timestamp: zod_1.z.string(),
        status: zod_1.z.literal('success')
    })
});
exports.CallToolErrorSchema = zod_1.z.object({
    requestId: zod_1.z.string(),
    toolId: zod_1.z.string(),
    metadata: zod_1.z.object({
        timestamp: zod_1.z.string(),
        status: zod_1.z.literal('error')
    }),
    error: zod_1.z.object({
        code: zod_1.z.string(),
        message: zod_1.z.string(),
        details: zod_1.z.any().optional()
    })
});
