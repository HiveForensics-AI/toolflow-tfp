import { z } from 'zod';
export declare const ToolDescriptorSchema: z.ZodObject<{
    toolId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    version: z.ZodString;
    inputSchema: z.ZodAny;
    outputSchema: z.ZodAny;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    name: string;
    description: string;
    version: string;
    inputSchema?: any;
    outputSchema?: any;
    tags?: string[] | undefined;
}, {
    toolId: string;
    name: string;
    description: string;
    version: string;
    inputSchema?: any;
    outputSchema?: any;
    tags?: string[] | undefined;
}>;
export type ToolDescriptor = z.infer<typeof ToolDescriptorSchema>;
export declare const CallToolRequestSchema: z.ZodObject<{
    requestId: z.ZodString;
    toolId: z.ZodString;
    input: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    requestId: string;
    input?: any;
}, {
    toolId: string;
    requestId: string;
    input?: any;
}>;
export declare const CallToolSuccessSchema: z.ZodObject<{
    requestId: z.ZodString;
    toolId: z.ZodString;
    output: z.ZodAny;
    metadata: z.ZodObject<{
        durationMs: z.ZodNumber;
        timestamp: z.ZodString;
        status: z.ZodLiteral<"success">;
    }, "strip", z.ZodTypeAny, {
        status: "success";
        durationMs: number;
        timestamp: string;
    }, {
        status: "success";
        durationMs: number;
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    requestId: string;
    metadata: {
        status: "success";
        durationMs: number;
        timestamp: string;
    };
    output?: any;
}, {
    toolId: string;
    requestId: string;
    metadata: {
        status: "success";
        durationMs: number;
        timestamp: string;
    };
    output?: any;
}>;
export declare const CallToolErrorSchema: z.ZodObject<{
    requestId: z.ZodString;
    toolId: z.ZodString;
    metadata: z.ZodObject<{
        timestamp: z.ZodString;
        status: z.ZodLiteral<"error">;
    }, "strip", z.ZodTypeAny, {
        status: "error";
        timestamp: string;
    }, {
        status: "error";
        timestamp: string;
    }>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: any;
    }, {
        code: string;
        message: string;
        details?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    requestId: string;
    metadata: {
        status: "error";
        timestamp: string;
    };
    error: {
        code: string;
        message: string;
        details?: any;
    };
}, {
    toolId: string;
    requestId: string;
    metadata: {
        status: "error";
        timestamp: string;
    };
    error: {
        code: string;
        message: string;
        details?: any;
    };
}>;
export type CallToolRequest = z.infer<typeof CallToolRequestSchema>;
export type CallToolSuccess = z.infer<typeof CallToolSuccessSchema>;
export type CallToolError = z.infer<typeof CallToolErrorSchema>;
