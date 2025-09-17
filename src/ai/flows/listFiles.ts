'use server';
/**
 * @fileOverview A flow to list files in the project directory.
 *
 * - listFiles - A function that returns a list of files in the project's root directory.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

const ListFilesOutputSchema = z.object({
  files: z.array(z.string()).describe('A list of files and directories.'),
});
export type ListFilesOutput = z.infer<typeof ListFilesOutputSchema>;

export async function listFiles(): Promise<ListFilesOutput> {
  return listFilesFlow();
}

const listFilesFlow = ai.defineFlow(
  {
    name: 'listFilesFlow',
    outputSchema: ListFilesOutputSchema,
  },
  async () => {
    try {
      // Navigate to the project root directory from the current file's location
      const projectRoot = path.join(process.cwd());
      const files = await fs.readdir(projectRoot);
      console.log('Files in project root:', files);
      return { files };
    } catch (err) {
      console.error('Error reading directory:', err);
      // In case of an error, return an empty array
      return { files: [] };
    }
  }
);
