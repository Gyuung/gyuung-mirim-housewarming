"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./Guestbook.module.css";

type GuestbookEntry = {
  id: string;
  invitation_slug: string;
  name: string;
  message: string;
  created_at: string;
};

type GuestbookResponse = {
  messages?: GuestbookEntry[];
  entry?: GuestbookEntry | null;
  message?: string;
};

type GuestbookProps = {
  invitationSlug: string;
  title?: string;
  description?: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export default function Guestbook({
  invitationSlug,
  title = "Guestbook",
  description = "오신다는 마음, 짧게 남겨주세요.",
}: GuestbookProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const params = new URLSearchParams({ invitation: invitationSlug });
        const response = await fetch(`/api/guestbook?${params.toString()}`, { cache: "no-store" });
        const data = (await response.json()) as GuestbookResponse;

        if (!response.ok) {
          throw new Error(data.message);
        }

        setEntries(data.messages ?? []);
      } catch {
        setStatusMessage("방명록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadEntries();
  }, [invitationSlug]);

  const submitEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedMessage || trimmedPassword.length < 4) {
      setStatusMessage("이름, 메시지, 비밀번호 4자 이상을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
          password: trimmedPassword,
          invitation: invitationSlug,
          website: formData.get("website"),
        }),
      });
      const data = (await response.json()) as GuestbookResponse;

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data.entry) {
        setEntries((currentEntries) => [data.entry as GuestbookEntry, ...currentEntries].slice(0, 30));
      }

      setMessage("");
      setPassword("");
      setStatusMessage(data.message ?? "방명록을 남겼습니다.");
    } catch {
      setStatusMessage("잠시 후 다시 남겨주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    const trimmedPassword = deletePassword.trim();

    if (trimmedPassword.length < 4) {
      setStatusMessage("삭제 비밀번호를 입력해주세요.");
      return;
    }

    setIsDeleting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: entryId,
          invitation: invitationSlug,
          password: trimmedPassword,
        }),
      });
      const data = (await response.json()) as GuestbookResponse;

      if (!response.ok) {
        throw new Error(data.message);
      }

      setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
      setDeleteTargetId(null);
      setDeletePassword("");
      setStatusMessage(data.message ?? "방명록을 삭제했습니다.");
    } catch {
      setStatusMessage("비밀번호를 확인해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className={styles.guestbook} aria-labelledby="guestbook-title">
      <p id="guestbook-title" className={styles.smallTitle}>
        {title}
      </p>
      <p className={styles.description}>{description}</p>

      <form className={styles.form} onSubmit={submitEntry}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={16}
          placeholder="이름"
          aria-label="이름"
        />
        <textarea
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={140}
          rows={3}
          placeholder="메시지를 남겨주세요"
          aria-label="방명록 메시지"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          maxLength={24}
          placeholder="삭제용 비밀번호 4자 이상"
          aria-label="삭제용 비밀번호"
        />
        <input
          className={styles.honeypot}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "남기는 중" : "남기기"}
        </button>
      </form>

      {statusMessage ? <p className={styles.status}>{statusMessage}</p> : null}

      <div className={styles.entries} aria-live="polite">
        {!isLoading && entries.map((entry) => (
          <article className={styles.entry} key={entry.id}>
            <div>
              <strong>{entry.name}</strong>
              <time dateTime={entry.created_at}>{formatDate(entry.created_at)}</time>
            </div>
            <p>{entry.message}</p>
            {deleteTargetId === entry.id ? (
              <div className={styles.deleteForm}>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(event) => setDeletePassword(event.target.value)}
                  maxLength={24}
                  placeholder="비밀번호"
                  aria-label="방명록 삭제 비밀번호"
                />
                <div>
                  <button
                    type="button"
                    onClick={() => void deleteEntry(entry.id)}
                    disabled={isDeleting}
                  >
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteTargetId(null);
                      setDeletePassword("");
                    }}
                    disabled={isDeleting}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className={styles.deleteToggle}
                onClick={() => {
                  setDeleteTargetId(entry.id);
                  setDeletePassword("");
                }}
              >
                삭제
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
