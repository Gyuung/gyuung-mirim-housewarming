import NameEntryForm from "@/components/NameEntryForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroPhoto} />
        <div className={styles.heroContent}>
          <p className={styles.smallTitle}>Housewarming Invitation</p>
          <h1>
            집들이에
            <br />
            초대합니다
          </h1>
          <p className={styles.dallongiBadge}>달롱이 (우파루파) 보러 오세요</p>
          <p>이름을 입력하면 초대장이 열려요.</p>
        </div>
      </section>

      <section className={styles.joinSection} aria-label="집들이 참여">
        <NameEntryForm />
      </section>
    </main>
  );
}
