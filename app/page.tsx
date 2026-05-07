import Link from "next/link";
import { invitations } from "@/lib/invitations";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroPhoto} />
      </section>

      <section className={styles.heroContent}>
        <p className={styles.smallTitle}>Housewarming Invitation</p>
        <h1>
          집들이 날짜를
          <br />
          골라주세요
        </h1>
        <p className={styles.dallongiBadge}>달롱이 (우파루파) 보러 오세요</p>
        <p>초대받은 날짜를 선택하면 모바일 초대장이 열려요.</p>
      </section>

      <section className={styles.datePicker} aria-label="예정된 집들이 날짜">
        {invitations.map((invitation) => (
          <Link className={styles.dateLink} href={`/${invitation.slug}`} key={invitation.slug}>
            <span>
              {invitation.monthName} {invitation.day}
            </span>
            <strong>{invitation.dateLabel}</strong>
            <em>{invitation.timeLabel}</em>
          </Link>
        ))}
      </section>
    </main>
  );
}
