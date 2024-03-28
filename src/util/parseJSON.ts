import type { z } from 'zod';

/**
 * @function parseJSON
 * @description Parse input string using schema
 */
export function parseJSON<S extends z.SomeZodObject>(input: string | null, schema: S): z.infer<S> {
    let data;

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/prefer-nullish-coalescing
        data = JSON.parse(input || '{}');
    } catch {
        throw new Error(`Failed to parse JSON: ${input}`);
    }

    try {
        return schema.parse(data);
    } catch (error) {
        console.error(`parseJSON failed`);
        console.dir(data, { depth: null });

        throw error;
    }
}
