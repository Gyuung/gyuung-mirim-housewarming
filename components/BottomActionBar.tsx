"use client";

import Script from "next/script";
import { useState } from "react";
import type { Invitation } from "@/lib/invitations";
import { houseLocation } from "@/lib/location";
import styles from "./BottomActionBar.module.css";

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share?: {
        sendDefault: (template: Record<string, unknown>) => void;
        sendScrap: (template: Record<string, unknown>) => void;
      };
      Navi?: {
        start: (params: Record<string, unknown>) => void;
      };
    };
  }
}

const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const kakaoSdkUrl = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
const calendarTitle = "집들이 초대";
const privateIpPattern =
  /^(10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/;

type BottomActionBarProps = {
  invitation: Invitation;
};

export default function BottomActionBar({ invitation }: BottomActionBarProps) {
  const [copied, setCopied] = useState(false);
  const calendarUrl = new URL("https://calendar.google.com/calendar/render");

  calendarUrl.searchParams.set("action", "TEMPLATE");
  calendarUrl.searchParams.set("text", calendarTitle);
  calendarUrl.searchParams.set(
    "dates",
    `${invitation.calendarStart}/${invitation.calendarEnd}`
  );
  calendarUrl.searchParams.set("details", `${invitation.dateLabel} ${invitation.timeLabel}`);
  calendarUrl.searchParams.set("location", houseLocation.address);

  const waitForKakaoSdk = async () => {
    for (let count = 0; count < 40; count += 1) {
      if (window.Kakao) {
        return true;
      }

      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }

    return false;
  };

  const initializeKakao = async () => {
    if (!kakaoKey) {
      return false;
    }

    const hasKakaoSdk = await waitForKakaoSdk();

    if (!hasKakaoSdk || !window.Kakao) {
      return false;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }

    return true;
  };

  const getEntryUrl = () => {
    if (siteUrl) {
      return new URL("/", siteUrl).toString();
    }

    return new URL("/", window.location.origin).toString();
  };

  const isPublicWebUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      return (
        parsedUrl.protocol === "https:" &&
        parsedUrl.hostname !== "localhost" &&
        !privateIpPattern.test(parsedUrl.hostname)
      );
    } catch {
      return false;
    }
  };

  const copyLink = async (url = getEntryUrl()) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareKakao = async () => {
    const shareUrl = getEntryUrl();

    try {
      if (isPublicWebUrl(shareUrl) && (await initializeKakao()) && window.Kakao?.Share) {
        window.Kakao.Share.sendScrap({
          requestUrl: shareUrl,
        });
        return;
      }
    } catch (error) {
      console.error("Kakao share failed", error);
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "집들이 초대장",
          url: shareUrl,
        });
        return;
      } catch (error) {
        console.error("Native share failed", error);
      }
    }

    await copyLink(shareUrl);
  };

  return (
    <>
      {kakaoKey ? (
        <Script
          src={kakaoSdkUrl}
          strategy="afterInteractive"
          onLoad={initializeKakao}
        />
      ) : null}
      <nav className={styles.bar} aria-label="초대장 빠른 실행">
        <a
          href={calendarUrl.toString()}
          target="_blank"
          rel="noreferrer"
          aria-label="일정 등록"
        >
          <CalendarIcon />
          <span>일정 등록</span>
        </a>
        <button type="button" onClick={() => void copyLink()} aria-label="링크 복사">
          <LinkIcon />
          <span>{copied ? "복사 완료" : "링크 복사"}</span>
        </button>
        <button type="button" className={styles.kakaoShare} onClick={shareKakao}>
          <KakaoIcon />
          <span>카카오 공유</span>
        </button>
      </nav>
    </>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2v3M17 2v3M4.5 9h15M6 4.5h12A2.5 2.5 0 0 1 20.5 7v11A2.5 2.5 0 0 1 18 20.5H6A2.5 2.5 0 0 1 3.5 18V7A2.5 2.5 0 0 1 6 4.5Z" />
      <path d="M8 12.5h2.5M8 16h2.5M13.5 12.5H16M13.5 16H16" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m10 13.5 4-4M9.4 7.8l1.4-1.4a4 4 0 0 1 5.7 5.7l-1.4 1.4M14.6 16.2l-1.4 1.4a4 4 0 0 1-5.7-5.7l1.4-1.4" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4C6.8 4 2.6 7.1 2.6 11c0 2.4 1.6 4.5 4 5.7l-.7 2.6c-.1.4.3.7.6.5l3.2-2c.7.1 1.5.2 2.3.2 5.2 0 9.4-3.1 9.4-7S17.2 4 12 4Z" />
    </svg>
  );
}
