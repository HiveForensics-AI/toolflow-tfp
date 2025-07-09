"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const types_1 = require("./protocol/types");
const echo_1 = require("./tools/echo");
const llmChat_1 = require("./tools/llmChat");
const ragSearch_1 = require("./tools/ragSearch");
const ragAddDoc_1 = require("./tools/ragAddDoc");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const registry = {};
function registerTool(desc, handler) {
    registry[desc.toolId] = { descriptor: desc, handler };
}
registerTool(echo_1.descriptor, echo_1.handler);
registerTool(llmChat_1.descriptor, llmChat_1.handler);
registerTool(ragSearch_1.descriptor, ragSearch_1.handler);
registerTool(ragAddDoc_1.descriptor, ragAddDoc_1.handler);
/* ---------------- Endpoints ----------------- */
// List tools
app.get('/tfp/tools', (_req, res) => {
    res.json(Object.values(registry).map(r => r.descriptor));
});
// Invoke tool
app.post('/tfp/invoke', async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const parsedReq = types_1.CallToolRequestSchema.parse({
            ...req.body,
            requestId: (_a = req.body.requestId) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)()
        });
        const toolEntry = registry[parsedReq.toolId];
        if (!toolEntry) {
            res.status(404).json({
                requestId: parsedReq.requestId,
                toolId: parsedReq.toolId,
                metadata: { timestamp: new Date().toISOString(), status: 'error' },
                error: { code: 'ToolNotFound', message: 'Unknown tool', details: null }
            });
            return;
        }
        // Validate input
        const validInput = toolEntry.descriptor.inputSchema.parse(parsedReq.input);
        const start = Date.now();
        const output = await toolEntry.handler(validInput);
        // Validate output
        toolEntry.descriptor.outputSchema.parse(output);
        const successBody = {
            requestId: parsedReq.requestId,
            toolId: parsedReq.toolId,
            output,
            metadata: {
                durationMs: Date.now() - start,
                timestamp: new Date().toISOString(),
                status: 'success'
            }
        };
        res.json(successBody);
    }
    catch (err) {
        res.status(400).json({
            requestId: (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.requestId) !== null && _c !== void 0 ? _c : (0, uuid_1.v4)(),
            toolId: (_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.toolId) !== null && _e !== void 0 ? _e : 'unknown',
            metadata: { timestamp: new Date().toISOString(), status: 'error' },
            error: {
                code: (_f = err.name) !== null && _f !== void 0 ? _f : 'ValidationError',
                message: (_g = err.message) !== null && _g !== void 0 ? _g : 'Invalid request',
                details: err.stack
            }
        });
    }
});
function start(port = 3000) {
    app.listen(port, () => {
        console.log(`[TFP] Server listening on http://localhost:${port}`);
    });
}
