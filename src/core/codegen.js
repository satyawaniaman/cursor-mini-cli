import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateCode(task, context = []) {
  const contextString = context
    .map((file) => `// ${file.file}\n${file.content}`)
    .join("\n\n");

  const systemPrompt = `You're a senior developer. Based on the codebase and the following request, generate complete, working code files.

IMPORTANT: Format your response with code blocks using this exact pattern:
\`\`\`html:filename.html
<code content here>
\`\`\`

Or for other file types:
\`\`\`javascript:app.js
<code content here>
\`\`\`
\`\`\`css:styles.css
<code content here>
\`\`\`

Always include the filename after the colon. Generate complete, functional files that work together.`;

  const userPrompt = `Task: ${task}\n\nProject Context:\n${contextString}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return res.choices[0].message.content;
}
// extract code blocks from LLM response
export function extractFilesFromCode(code) {
  // Look for patterns like:
  // ```html:index.html or ```javascript:app.js
  const fileRegex = /```(\w+):([\w\-./]+)\n([\s\S]*?)```/g;
  const files = [];
  let match;

  while ((match = fileRegex.exec(code)) !== null) {
    const filePath = match[2].trim();
    const fileContent = match[3].trim();

    if (filePath && fileContent) {
      files.push({ filePath, fileContent });
    }
  }

  return files;
}
