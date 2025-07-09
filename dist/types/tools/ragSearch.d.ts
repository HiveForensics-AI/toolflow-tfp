import { z } from 'zod';
import { ToolDescriptor } from '../protocol/types';
export declare const inputSchema: z.ZodObject<{
    query: z.ZodString;
    provider: z.ZodOptional<z.ZodEnum<["openai", "ollama"]>>;
    topK: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    query: string;
    provider?: "openai" | "ollama" | undefined;
    topK?: number | undefined;
}, {
    query: string;
    provider?: "openai" | "ollama" | undefined;
    topK?: number | undefined;
}>;
export declare const outputSchema: z.ZodObject<{
    answer: z.ZodString;
    docs: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        id: string;
    }, {
        text: string;
        id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    answer: string;
    docs: {
        text: string;
        id: string;
    }[];
}, {
    answer: string;
    docs: {
        text: string;
        id: string;
    }[];
}>;
export declare const descriptor: ToolDescriptor;
export declare function handler({ query, provider, topK: k }: z.infer<typeof inputSchema>): Promise<{
    answer: string;
    docs: {
        id: string;
        text: string;
    }[];
}>;
