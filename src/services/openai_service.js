import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function openAiCodeReviewResponse(code, tags = []) {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: "You are a senior developer providing feedback to another member on your team. Your response should be in complete sentences." },
      { role: "system", content: "You are tasked with helping a user analyze their code, and offering helpful suggestions to improve it." },
      { role: "system", content: "A user will provide a code block. Your primary task is to improve the code quality." },
      { role: "system", content: `If possible, you should also return potential edgecases to watch out for.` },
      { role: "system", content: `Respond with a string in paragraph format.` },
      { role: "user", content: `Given the following tags: ${tags}, please review the following code, and respond to the software developer: ${code}` },
    ],
    model: "gpt-3.5-turbo",
  });
  return response.choices[0].message.content;
}

export { openAiCodeReviewResponse };
