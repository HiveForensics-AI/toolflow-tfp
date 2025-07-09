import { z } from 'zod';
import { ToolDescriptor } from '../protocol/types';
export declare const inputSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export declare const outputSchema: z.ZodObject<{
    echoed: z.ZodString;
}, "strip", z.ZodTypeAny, {
    echoed: string;
}, {
    echoed: string;
}>;
export declare const descriptor: ToolDescriptor;
export declare function handler(input: z.infer<typeof inputSchema>): Promise<{
    echoed: string;
}>;
