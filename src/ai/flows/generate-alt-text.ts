'use server';

/**
 * @fileOverview A flow to generate alt text for images.
 *
 * - generateAltText - A function that takes an image data URI and returns an alt text description.
 * - GenerateAltTextInput - The input type for the generateAltText function.
 * - GenerateAltTextOutput - The return type for the generateAltText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAltTextInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateAltTextInput = z.infer<typeof GenerateAltTextInputSchema>;

const GenerateAltTextOutputSchema = z.object({
  altText: z.string().describe('A concise and descriptive alt text for the image.'),
});
export type GenerateAltTextOutput = z.infer<typeof GenerateAltTextOutputSchema>;

export async function generateAltText(input: GenerateAltTextInput): Promise<GenerateAltTextOutput> {
  return generateAltTextFlow(input);
}

const altTextPrompt = ai.definePrompt({
  name: 'altTextPrompt',
  input: {schema: GenerateAltTextInputSchema},
  output: {schema: GenerateAltTextOutputSchema},
  prompt: `You are an expert in creating alt text for images for websites.

  Given the following image, create a concise and descriptive alt text that accurately represents the image content for SEO and accessibility purposes.

  Image: {{media url=imageDataUri}}
  `,
});

const generateAltTextFlow = ai.defineFlow(
  {
    name: 'generateAltTextFlow',
    inputSchema: GenerateAltTextInputSchema,
    outputSchema: GenerateAltTextOutputSchema,
  },
  async input => {
    const {output} = await altTextPrompt(input);
    return output!;
  }
);
