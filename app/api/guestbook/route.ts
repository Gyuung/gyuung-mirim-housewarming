import { NextResponse } from "next/server";

type GuestbookRow = {
  id: string;
  invitation_slug: string;
  name: string;
  message: string;
  created_at: string;
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const tableName = "guestbook_messages";

function getSupabaseHeaders(extraHeaders?: HeadersInit) {
  return {
    apikey: supabaseAnonKey ?? "",
    Authorization: `Bearer ${supabaseAnonKey ?? ""}`,
    ...extraHeaders,
  };
}

function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function normalizeInput(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export async function GET(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ message: "Supabase 환경변수가 설정되지 않았습니다." }, { status: 503 });
  }

  const requestUrl = new URL(request.url);
  const invitationSlug = normalizeInput(requestUrl.searchParams.get("invitation"), 20);

  if (!invitationSlug) {
    return NextResponse.json({ message: "초대장 정보가 없습니다." }, { status: 400 });
  }

  const url = new URL(`/rest/v1/${tableName}`, supabaseUrl);

  url.searchParams.set("select", "id,invitation_slug,name,message,created_at");
  url.searchParams.set("invitation_slug", `eq.${invitationSlug}`);
  url.searchParams.set("order", "created_at.desc");
  url.searchParams.set("limit", "30");

  const response = await fetch(url, {
    headers: getSupabaseHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "방명록을 불러오지 못했습니다." }, { status: response.status });
  }

  const messages = (await response.json()) as GuestbookRow[];

  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ message: "Supabase 환경변수가 설정되지 않았습니다." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | { invitation?: unknown; name?: unknown; message?: unknown; website?: unknown }
    | null;

  const invitationSlug = normalizeInput(body?.invitation, 20);
  const name = normalizeInput(body?.name, 16);
  const message = normalizeInput(body?.message, 140);
  const website = normalizeInput(body?.website, 80);

  if (website) {
    return NextResponse.json({ message: "방명록을 남겼습니다.", entry: null });
  }

  if (!invitationSlug || !name || !message) {
    return NextResponse.json({ message: "이름과 메시지를 입력해주세요." }, { status: 400 });
  }

  const url = new URL(`/rest/v1/${tableName}`, supabaseUrl);

  const response = await fetch(url, {
    method: "POST",
    headers: getSupabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify({ invitation_slug: invitationSlug, name, message }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "방명록을 저장하지 못했습니다." }, { status: response.status });
  }

  const [entry] = (await response.json()) as GuestbookRow[];

  return NextResponse.json({ message: "방명록을 남겼습니다.", entry });
}
