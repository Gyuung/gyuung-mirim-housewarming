import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

type GuestbookRow = {
  id: string;
  invitation_slug: string;
  name: string;
  message: string;
  password_hash?: string;
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

function getPasswordHash(password: string) {
  return createHash("sha256").update(password).digest("hex");
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
    | { invitation?: unknown; name?: unknown; message?: unknown; password?: unknown; website?: unknown }
    | null;

  const invitationSlug = normalizeInput(body?.invitation, 20);
  const name = normalizeInput(body?.name, 16);
  const message = normalizeInput(body?.message, 140);
  const password = normalizeInput(body?.password, 24);
  const website = normalizeInput(body?.website, 80);

  if (website) {
    return NextResponse.json({ message: "방명록을 남겼습니다.", entry: null });
  }

  if (!invitationSlug || !name || !message || password.length < 4) {
    return NextResponse.json({ message: "이름, 메시지, 비밀번호를 입력해주세요." }, { status: 400 });
  }

  const url = new URL(`/rest/v1/${tableName}`, supabaseUrl);

  const response = await fetch(url, {
    method: "POST",
    headers: getSupabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify({
      invitation_slug: invitationSlug,
      name,
      message,
      password_hash: getPasswordHash(password),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "방명록을 저장하지 못했습니다." }, { status: response.status });
  }

  const [entry] = (await response.json()) as GuestbookRow[];

  return NextResponse.json({ message: "방명록을 남겼습니다.", entry });
}

export async function DELETE(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ message: "Supabase 환경변수가 설정되지 않았습니다." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | { id?: unknown; invitation?: unknown; password?: unknown }
    | null;
  const id = normalizeInput(body?.id, 80);
  const invitationSlug = normalizeInput(body?.invitation, 20);
  const password = normalizeInput(body?.password, 24);

  if (!id || !invitationSlug || password.length < 4) {
    return NextResponse.json({ message: "비밀번호를 입력해주세요." }, { status: 400 });
  }

  const readUrl = new URL(`/rest/v1/${tableName}`, supabaseUrl);

  readUrl.searchParams.set("select", "id,password_hash");
  readUrl.searchParams.set("id", `eq.${id}`);
  readUrl.searchParams.set("invitation_slug", `eq.${invitationSlug}`);
  readUrl.searchParams.set("limit", "1");

  const readResponse = await fetch(readUrl, {
    headers: getSupabaseHeaders(),
    cache: "no-store",
  });

  if (!readResponse.ok) {
    return NextResponse.json({ message: "방명록을 확인하지 못했습니다." }, { status: readResponse.status });
  }

  const [entry] = (await readResponse.json()) as Pick<GuestbookRow, "id" | "password_hash">[];

  if (!entry || entry.password_hash !== getPasswordHash(password)) {
    return NextResponse.json({ message: "비밀번호가 맞지 않습니다." }, { status: 403 });
  }

  const deleteUrl = new URL(`/rest/v1/${tableName}`, supabaseUrl);

  deleteUrl.searchParams.set("id", `eq.${id}`);
  deleteUrl.searchParams.set("invitation_slug", `eq.${invitationSlug}`);

  const deleteResponse = await fetch(deleteUrl, {
    method: "DELETE",
    headers: getSupabaseHeaders(),
    cache: "no-store",
  });

  if (!deleteResponse.ok) {
    return NextResponse.json({ message: "방명록을 삭제하지 못했습니다." }, { status: deleteResponse.status });
  }

  return NextResponse.json({ message: "방명록을 삭제했습니다." });
}
