import { defaultCmsContent, type CmsContent } from "@/lib/cms-content";

type JsonModule = typeof import("node:fs/promises");
type PathModule = typeof import("node:path");

let memoryContent: CmsContent = structuredClone(defaultCmsContent);

async function getNodeStorage(): Promise<
  | {
      fs: JsonModule;
      path: PathModule;
      filePath: string;
    }
  | undefined
> {
  if (typeof process === "undefined" || !process.cwd) {
    return undefined;
  }

  try {
    const [fs, path] = await Promise.all([import("node:fs/promises"), import("node:path")]);
    return {
      fs,
      path,
      filePath: path.join(process.cwd(), "src", "data", "cms-content.json"),
    };
  } catch {
    return undefined;
  }
}

function mergeCmsContent(content: Partial<CmsContent>): CmsContent {
  return {
    ...defaultCmsContent,
    ...content,
    header: { ...defaultCmsContent.header, ...content.header },
    hero: { ...defaultCmsContent.hero, ...content.hero },
    about: { ...defaultCmsContent.about, ...content.about },
    ventures: { ...defaultCmsContent.ventures, ...content.ventures },
    journey: { ...defaultCmsContent.journey, ...content.journey },
    philosophy: { ...defaultCmsContent.philosophy, ...content.philosophy },
    vision: { ...defaultCmsContent.vision, ...content.vision },
    contact: { ...defaultCmsContent.contact, ...content.contact },
    seo: { ...defaultCmsContent.seo, ...content.seo },
  };
}

export async function readCmsContent(): Promise<CmsContent> {
  const storage = await getNodeStorage();

  if (!storage) {
    return memoryContent;
  }

  try {
    const raw = await storage.fs.readFile(storage.filePath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsContent>;
    const merged = mergeCmsContent(parsed);
    memoryContent = merged;
    return merged;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error(error);
    }

    await writeCmsContent(memoryContent);
    return memoryContent;
  }
}

export async function writeCmsContent(content: CmsContent): Promise<CmsContent> {
  const merged = mergeCmsContent(content);
  memoryContent = merged;

  const storage = await getNodeStorage();

  if (!storage) {
    return merged;
  }

  await storage.fs.mkdir(storage.path.dirname(storage.filePath), { recursive: true });
  await storage.fs.writeFile(storage.filePath, `${JSON.stringify(merged, null, 2)}\n`, "utf-8");

  return merged;
}

export function isAdminPassword(value: string | null | undefined, env: unknown): boolean {
  const envPassword =
    env && typeof env === "object" && "ADMIN_PASSWORD" in env
      ? String((env as { ADMIN_PASSWORD?: unknown }).ADMIN_PASSWORD ?? "")
      : "";
  const password = envPassword || process.env.ADMIN_PASSWORD || "admin123";

  return Boolean(value) && value === password;
}

export async function handleCmsRequest(request: Request, env: unknown): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/api/cms/auth" && request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as { password?: string };

    return Response.json({ ok: isAdminPassword(body.password, env) }, { status: 200 });
  }

  if (url.pathname !== "/api/cms") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (request.method === "GET") {
    return Response.json(await readCmsContent());
  }

  if (request.method === "PUT" || request.method === "POST") {
    const password = request.headers.get("x-admin-password");

    if (!isAdminPassword(password, env)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CmsContent;
    return Response.json(await writeCmsContent(body));
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
