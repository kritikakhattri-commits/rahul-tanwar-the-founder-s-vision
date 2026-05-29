export type AssistantLanguage = "en" | "ar";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export const assistantName = "RT Executive Assistant";

export const languageStorageKey = "rt-executive-assistant-language";

export const assistantSuggestions: Record<AssistantLanguage, Array<string>> = {
  en: [
    "Tell me about Rahul Tanwar",
    "What companies does Rahul Tanwar operate?",
    "What is his vision?",
    "How can I contact Rahul Tanwar?",
  ],
  ar: [
    "أخبرني عن راهول تنوار",
    "ما الشركات التي يديرها راهول تنوار؟",
    "ما رؤيته؟",
    "كيف يمكنني التواصل مع راهول تنوار؟",
  ],
};

export const assistantCopy = {
  en: {
    launcher: "Open executive assistant",
    close: "Close assistant",
    title: "Rahul Tanwar Executive Office",
    subtitle: "Digital executive assistant",
    chooseLanguage: "Choose your preferred language",
    english: "English",
    arabic: "العربية",
    greeting:
      "Welcome to Rahul Tanwar's Executive Office. I can assist with verified information about Rahul Tanwar, his ventures, business ecosystem, India-UAE focus and contact inquiries.",
    placeholder: "Ask about Rahul Tanwar or his ecosystem...",
    send: "Send message",
    typing: "Preparing a response",
    unavailable:
      "The executive assistant is temporarily unavailable. Please contact the office at office@rahultanwar.com.",
    resetLanguage: "Language",
  },
  ar: {
    launcher: "افتح المساعد التنفيذي",
    close: "إغلاق المساعد",
    title: "المكتب التنفيذي لراهول تنوار",
    subtitle: "المساعد التنفيذي الرقمي",
    chooseLanguage: "اختر لغتك المفضلة",
    english: "English",
    arabic: "العربية",
    greeting:
      "مرحباً بك في المكتب التنفيذي لراهول تنوار. يمكنني مساعدتك بمعلومات موثقة عن راهول تنوار، مشاريعه، منظومته التجارية، تركيزه بين الهند والإمارات، وطرق التواصل.",
    placeholder: "اسأل عن راهول تنوار أو منظومته...",
    send: "إرسال الرسالة",
    typing: "جار إعداد الرد",
    unavailable:
      "المساعد التنفيذي غير متاح مؤقتاً. يرجى التواصل مع المكتب عبر office@rahultanwar.com.",
    resetLanguage: "اللغة",
  },
} satisfies Record<AssistantLanguage, Record<string, string>>;
