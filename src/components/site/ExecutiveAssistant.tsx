import { Globe2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  assistantCopy,
  assistantName,
  assistantSuggestions,
  languageStorageKey,
  type AssistantLanguage,
  type AssistantMessage,
} from "@/lib/chatbot-config";

type ChatMessage = AssistantMessage & {
  id: string;
};

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

function isAssistantLanguage(value: string | null): value is AssistantLanguage {
  return value === "en" || value === "ar";
}

export function ExecutiveAssistant() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<AssistantLanguage | null>(null);
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeLanguage = language ?? "en";
  const copy = assistantCopy[activeLanguage];
  const isArabic = activeLanguage === "ar";

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);

    if (isAssistantLanguage(storedLanguage)) {
      setLanguage(storedLanguage);
      setMessages([createMessage("assistant", assistantCopy[storedLanguage].greeting)]);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const chooseLanguage = (nextLanguage: AssistantLanguage) => {
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    setLanguage(nextLanguage);
    setMessages([createMessage("assistant", assistantCopy[nextLanguage].greeting)]);
  };

  const resetLanguage = () => {
    window.localStorage.removeItem(languageStorageKey);
    setLanguage(null);
    setMessages([]);
    setInput("");
  };

  const sendMessage = async (message: string) => {
    const content = message.trim();

    if (!content || loading || !language) {
      return;
    }

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/executive-assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          language,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { reply?: string };

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", data.reply || assistantCopy[language].unavailable),
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", assistantCopy[language].unavailable),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="rt-assistant" dir={isArabic ? "rtl" : "ltr"}>
      {open ? (
        <section className="rt-assistant__window" aria-label={assistantName} aria-live="polite">
          <header className="rt-assistant__header">
            <div>
              <div className="rt-assistant__eyebrow">{copy.subtitle}</div>
              <h2>{copy.title}</h2>
            </div>
            <div className="rt-assistant__header-actions">
              {language ? (
                <button type="button" onClick={resetLanguage} className="rt-assistant__icon-btn">
                  <Globe2 aria-hidden="true" size={17} />
                  <span>{copy.resetLanguage}</span>
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rt-assistant__close"
                aria-label={copy.close}
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
          </header>

          {!language ? (
            <div className="rt-assistant__language-panel">
              <div>
                <div className="rt-assistant__eyebrow">{assistantName}</div>
                <h3>{copy.chooseLanguage}</h3>
              </div>
              <div className="rt-assistant__language-grid">
                <button type="button" onClick={() => chooseLanguage("en")}>
                  <span>English</span>
                  <small>Executive office</small>
                </button>
                <button type="button" onClick={() => chooseLanguage("ar")}>
                  <span>العربية</span>
                  <small>المكتب التنفيذي</small>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="rt-assistant__messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rt-assistant__message rt-assistant__message--${message.role}`}
                  >
                    {message.content}
                  </div>
                ))}
                {loading ? (
                  <div className="rt-assistant__typing">
                    <span>{copy.typing}</span>
                    <i />
                    <i />
                    <i />
                  </div>
                ) : null}
              </div>

              <div className="rt-assistant__suggestions">
                {assistantSuggestions[language].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    disabled={loading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="rt-assistant__composer">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={copy.placeholder}
                  aria-label={copy.placeholder}
                  disabled={loading}
                />
                <button type="submit" disabled={loading || !input.trim()} aria-label={copy.send}>
                  <Send aria-hidden="true" size={18} />
                </button>
              </form>
            </>
          )}
        </section>
      ) : null}

      <button
        type="button"
        className="rt-assistant__launcher"
        onClick={() => setOpen(true)}
        aria-label={copy.launcher}
      >
        <MessageCircle aria-hidden="true" size={22} />
        <span>{assistantName}</span>
      </button>
    </div>
  );
}
