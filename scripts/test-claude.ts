import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL,
});

async function main() {
  console.log("Testing Claude connection via Vercel AI Gateway...");
  console.log("Base URL:", process.env.ANTHROPIC_BASE_URL ?? "(default Anthropic)");

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: "Say 'Connection successful!' and nothing else.",
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  console.log("Response:", text);
  console.log("Tokens used:", response.usage);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
