"use client";

import styles from "./BackgroundMusic.module.css";

const streamingUrl = "https://music.youtube.com/watch?v=xqovGKdgAXY";

export default function BackgroundMusic() {
  return (
    <div className={styles.music}>
      <a
        href={streamingUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Suede Beautiful Ones 유튜브 뮤직으로 열기"
      >
        <span className={styles.icon} aria-hidden="true">
          <MusicIcon />
        </span>
        <span>Beautiful Ones</span>
      </a>
    </div>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M9 18.5a2.5 2.5 0 1 1-1.4-2.2V6.7L18 4.5v10.8a2.5 2.5 0 1 1-1.4-2.2V8.2L9 9.8v8.7Z" />
    </svg>
  );
}
