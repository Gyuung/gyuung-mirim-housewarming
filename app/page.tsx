"use client";

import NameEntryForm from "@/components/NameEntryForm";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [showBallongi, setShowBallongi] = useState(false);

  useEffect(() => {
    const dallongi = new window.Image();
    const ballongi = new window.Image();

    dallongi.src = "/dallongi.jpg";
    ballongi.src = "/ballongi.jpg";

    const timer = window.setInterval(() => {
      setShowBallongi((current) => !current);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroPhotoStack} aria-hidden="true">
          <div className={styles.heroPhotoBase} />
          <div className={`${styles.heroPhotoAlt} ${showBallongi ? styles.isVisible : ""}`} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.smallTitle}>Housewarming Invitation</p>
          <h1>
            집들이에
            <br />
            초대합니다
          </h1>
          <p className={styles.dallongiBadge}>
            {showBallongi ? "발롱이 (베타) 보러 오세요" : "달롱이 (우파루파) 보러 오세요"}
          </p>
          <p>이름을 입력하면 초대장이 열려요.</p>
        </div>
      </section>

      <section className={styles.joinSection} aria-label="집들이 참여">
        <NameEntryForm />
      </section>
    </main>
  );
}
