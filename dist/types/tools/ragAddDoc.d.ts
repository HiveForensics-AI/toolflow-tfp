import { z } from 'zod';
import { ToolDescriptor } from '../protocol/types';
export declare const inputSchema: z.ZodObject<{
    text: z.ZodString;
    provider: z.ZodOptional<z.ZodEnum<["openai", "ollama"]>>;
}, "strip", z.ZodTypeAny, {
    text: string;
    provider?: "openai" | "ollama" | undefined;
}, {
    text: string;
    provider?: "openai" | "ollama" | undefined;
}>;
export declare const outputSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodLiteral<"added">;
}, "strip", z.ZodTypeAny, {
    status: "added";
    id: string;
}, {
    status: "added";
    id: string;
}>;
export declare const descriptor: ToolDescriptor;
export declare function handler({ text, provider }: z.infer<typeof inputSchema>): Promise<{
    id: `${string}-${string}-${string}-${string}-${string}`;
    status: string;
}>;
