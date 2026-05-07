import Link from "next/link";
import { invitations } from "@/lib/invitations";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <p className={styles.smallTitle}>Housewarming Invitation</p>
        <h1>집들이 날짜 선택</h1>
        <p>초대받은 날짜를 선택하면 해당 날짜의 모바일 초대장을 볼 수 있어요.</p>
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
