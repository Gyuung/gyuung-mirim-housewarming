"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getInvitationSlugByGuestName } from "@/lib/invitations";
import styles from "@/app/page.module.css";

export default function NameEntryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const joinInvitation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const slug = getInvitationSlugByGuestName(name);
    if (!slug) {
      setError("초대 명단의 이름을 정확히 입력해주세요.");
      return;
    }

    setError("");
    window.sessionStorage.setItem("houseparty-invitation-date", slug);
    router.push(`/${slug}`);
  };

  return (
    <form className={styles.joinForm} onSubmit={joinInvitation}>
      <div className={styles.inputRow}>
        <input
          id="guest-name"
          name="guest-name"
          type="text"
          aria-label="이름"
          autoComplete="name"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
        />
        <button type="submit">참여하기</button>
      </div>
      {error ? <p className={styles.formError}>{error}</p> : null}
    </form>
  );
}
