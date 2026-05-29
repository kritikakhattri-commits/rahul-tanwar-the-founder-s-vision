import { assistantCopy, type AssistantLanguage, type AssistantMessage } from "@/lib/chatbot-config";
import { buildExecutiveAssistantInstructions } from "./executive-assistant-instructions";

type ChatRequestBody = {
  language?: AssistantLanguage;
  messages?: Array<AssistantMessage>;
};

type RuntimeEnv = {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
};

const fallbackModel = "gpt-5.4-mini";

function getRuntimeEnv(env: unknown): RuntimeEnv {
  const workerEnv = env && typeof env === "object" ? (env as RuntimeEnv) : {};
  const nodeEnv = typeof process !== "undefined" ? process.env : {};

  return {
    OPENAI_API_KEY: workerEnv.OPENAI_API_KEY ?? nodeEnv.OPENAI_API_KEY,
    OPENAI_MODEL: workerEnv.OPENAI_MODEL ?? nodeEnv.OPENAI_MODEL,
  };
}

function isAssistantLanguage(value: unknown): value is AssistantLanguage {
  return value === "en" || value === "ar";
}

function normalizeMessages(value: unknown): Array<AssistantMessage> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((message): message is AssistantMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const fields = message as Record<string, unknown>;
      return (
        (fields.role === "user" || fields.role === "assistant") &&
        typeof fields.content === "string" &&
        fields.content.trim().length > 0
      );
    })
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));
}

function formatConversation(messages: Array<AssistantMessage>) {
  return messages
    .map((message) => `${message.role === "user" ? "Visitor" : "Office"}: ${message.content}`)
    .join("\n");
}

function extractResponseText(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const fields = payload as Record<string, unknown>;

  if (typeof fields.output_text === "string") {
    return fields.output_text;
  }

  if (!Array.isArray(fields.output)) {
    return undefined;
  }

  const parts: Array<string> = [];

  for (const item of fields.output) {
    if (!item || typeof item !== "object") continue;
    const itemFields = item as Record<string, unknown>;
    if (!Array.isArray(itemFields.content)) continue;

    for (const content of itemFields.content) {
      if (!content || typeof content !== "object") continue;
      const contentFields = content as Record<string, unknown>;
      if (typeof contentFields.text === "string") {
        parts.push(contentFields.text);
      }
    }
  }

  return parts.join("\n").trim() || undefined;
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init?.headers,
    },
  });
}

export async function handleExecutiveAssistantRequest(request: Request, env: unknown) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, { status: 400 });
  }

  const language = isAssistantLanguage(body.language) ? body.language : "en";
  const messages = normalizeMessages(body.messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return jsonResponse({ error: "A user message is required" }, { status: 400 });
  }

  const runtimeEnv = getRuntimeEnv(env);

  if (!runtimeEnv.OPENAI_API_KEY) {
    return jsonResponse(
      {
        reply: assistantCopy[language].unavailable,
        missingConfiguration: true,
      },
      { status: 503 },
    );
  }

  const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${runtimeEnv.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: runtimeEnv.OPENAI_MODEL ?? fallbackModel,
      instructions: buildExecutiveAssistantInstructions(language),
      input: `Conversation so far:\n${formatConversation(messages)}\n\nRespond to the latest visitor message.`,
      max_output_tokens: 500,
    }),
  });

  if (!openAIResponse.ok) {
    const errorText = await openAIResponse.text();
    console.error(`Executive assistant request failed: ${openAIResponse.status} ${errorText}`);
    return jsonResponse({ reply: assistantCopy[language].unavailable }, { status: 502 });
  }

  const payload = await openAIResponse.json();
  const reply = extractResponseText(payload);

  return jsonResponse({
    reply: reply?.trim() || assistantCopy[language].unavailable,
  });
}
