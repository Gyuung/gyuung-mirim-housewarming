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
      };
      Navi?: {
        start: (params: Record<string, unknown>) => void;
      };
    };
  }
}

const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

type BottomActionBarProps = {
  invitation: Invitation;
};

export default function BottomActionBar({ invitation }: BottomActionBarProps) {
  const [copied, setCopied] = useState(false);

  const initializeKakao = () => {
    if (!kakaoKey || !window.Kakao) {
      return false;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }

    return true;
  };

  const getCurrentUrl = () => window.location.href;

  const copyLink = async () => {
    await navigator.clipboard.writeText(getCurrentUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareKakao = async () => {
    if (initializeKakao() && window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: "text",
        text: `${invitation.dateLabel} ${invitation.timeLabel} 집들이 초대장\n${houseLocation.name}`,
        link: {
          mobileWebUrl: getCurrentUrl(),
          webUrl: getCurrentUrl(),
        },
      });
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: "집들이 초대장",
        text: `${invitation.dateLabel} ${invitation.timeLabel}`,
        url: getCurrentUrl(),
      });
      return;
    }

    await copyLink();
  };

  return (
    <>
      {kakaoKey ? (
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="afterInteractive"
          onLoad={initializeKakao}
        />
      ) : null}
      <nav className={styles.bar} aria-label="초대장 빠른 실행">
        <button type="button" onClick={copyLink}>
          {copied ? "링크가 복사되었습니다" : "링크 복사"}
        </button>
        <button type="button" className={styles.kakaoShare} onClick={shareKakao}>
          카카오톡 공유
        </button>
      </nav>
    </>
  );
}
