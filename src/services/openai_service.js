import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function openAiCodeReviewResponse(code, tags = [], description = "") {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a senior developer providing feedback to another member on your team. Your response should be in complete sentences." },
      { role: "system", content: "You are tasked with helping a user analyze their code and offering helpful suggestions to improve it." },
      { role: "system", content: "Your feedback should focus on improving code quality, identifying potential bugs, and suggesting optimizations." },
      { role: "system", content: `Consider the given tags: ${tags.join(", ")}, and the description: ${description}. Analyze the following code and provide constructive feedback:` },
      { role: "user", content: code },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 150,
  });
  return response.choices[0].message.content;
}

export { openAiCodeReviewResponse };
