
'use server';
/**
 * @fileOverview A flow to send a lead to a predefined email address.
 *
 * - sendLead - A function that takes lead data and sends it.
 * - SendLeadInput - The input type for the sendLead function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SendLeadInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  email: z.string().email().describe('The email of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  notes: z.string().optional().describe('Additional notes from the person.'),
  property: z.string().optional().describe('The property the person is interested in.'),
});
export type SendLeadInput = z.infer<typeof SendLeadInputSchema>;

export async function sendLead(input: SendLeadInput): Promise<void> {
  return sendLeadFlow(input);
}

const emailPrompt = ai.definePrompt({
    name: 'leadEmailPrompt',
    input: { schema: SendLeadInputSchema },
    prompt: `
      You are an assistant responsible for creating email drafts.
      Based on the provided lead information, generate a plain text email to be sent to info@sighteg.com.
      The email should have a clear subject and a body containing all the lead's details.

      Subject: New Property Inquiry: {{{property}}}

      Lead Details:
      - Property: {{{property}}}
      - Name: {{{name}}}
      - Email: {{{email}}}
      - Phone: {{{phone}}}
      - Notes: {{{notes}}}
    `,
    output: {
      format: 'text'
    }
});


const sendLeadFlow = ai.defineFlow(
  {
    name: 'sendLeadFlow',
    inputSchema: SendLeadInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {

    // NOTE: This is a placeholder for sending an email.
    // In a real application, you would integrate an email sending service here.
    // For this prototype, we are logging the email content to the console.
    const emailContent = await emailPrompt(input);
    console.log("--- New Lead Email ---");
    console.log("To: info@sighteg.com");
    console.log(emailContent.output);
    console.log("----------------------");

    // In a real app, you would have something like:
    // await emailService.send({
    //   to: 'info@sighteg.com',
    //   subject: `New Property Inquiry: ${input.property}`,
    //   body: emailContent.output,
    // });
  }
);

    