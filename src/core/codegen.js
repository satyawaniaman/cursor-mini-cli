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

  // Fallback: if no files found with the above pattern, try simpler pattern
  if (files.length === 0) {
    const simpleRegex = /```(\w*)\n([\s\S]*?)```/g;
    let simpleMatch;
    let fileIndex = 1;
    
    while ((simpleMatch = simpleRegex.exec(code)) !== null) {
      const language = simpleMatch[1].toLowerCase();
      const fileContent = simpleMatch[2].trim();
      if (fileContent) {
        // Try to guess file type from language or content
        let extension = '.txt';
        let filename = `file${fileIndex}`;
        
        if (language === 'html' || fileContent.includes('<!DOCTYPE html') || fileContent.includes('<html')) {
          extension = '.html';
          filename = fileIndex === 1 ? 'index' : `page${fileIndex}`;
        } else if (language === 'css' || fileContent.includes('body {') || fileContent.includes('color:') || fileContent.includes('background-color')) {
          extension = '.css';
          filename = 'styles';
        } else if (language === 'javascript' || language === 'js' || fileContent.includes('function') || fileContent.includes('const ') || fileContent.includes('let ')) {
          extension = '.js';
          filename = 'script';
        } else if (language === 'python' || language === 'py') {
          extension = '.py';
          filename = 'main';
        } else if (language === 'json') {
          extension = '.json';
          filename = 'data';
        }
        
        files.push({ 
          filePath: `${filename}${extension}`, 
          fileContent 
        });
        fileIndex++;
      }
    }
  }

  return files;
}
