import { z } from 'zod';
import { ToolDescriptor } from '../protocol/types';
export declare const inputSchema: z.ZodObject<{
    prompt: z.ZodString;
    provider: z.ZodOptional<z.ZodEnum<["openai", "ollama"]>>;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    provider?: "openai" | "ollama" | undefined;
}, {
    prompt: string;
    provider?: "openai" | "ollama" | undefined;
}>;
export declare const outputSchema: z.ZodObject<{
    completion: z.ZodString;
}, "strip", z.ZodTypeAny, {
    completion: string;
}, {
    completion: string;
}>;
export declare const descriptor: ToolDescriptor;
export declare function handler({ prompt, provider }: z.infer<typeof inputSchema>): Promise<{
    completion: string;
}>;
