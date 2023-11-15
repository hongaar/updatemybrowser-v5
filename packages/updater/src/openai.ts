import OpenAI from "openai";

let client: OpenAI;

function getClient({ apiKey = process.env["OPENAI_API_KEY"] } = {}) {
  if (client) {
    return client;
  }

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  return (client = new OpenAI({
    apiKey,
    maxRetries: 2,
    timeout: 60000, // 60 seconds
  }));
}

export async function generate(prompt: string, system?: string) {
  const openai = getClient();
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      ...(system ? [{ role: "system" as const, content: system }] : []),
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 32,
    n: 1,
  });

  const result = chatCompletion.choices[0]?.message.content;

  if (typeof result !== "string") {
    throw new Error("No result from gpt-3.5-turbo");
  }

  return result;
}

export async function translate(
  text: string,
  language: string,
  additionalContext?: string,
) {
  return generate(
    text,
    `You will be provided with a sentence in "en", and your task is to translate it into "${language}". ${
      additionalContext ? additionalContext : ""
    }`,
  );
}
