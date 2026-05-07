"use client";

import { useEffect, useMemo, useState } from "react";
import type { Invitation } from "@/lib/invitations";
import styles from "./DayCountdown.module.css";

type DayCountdownProps = {
  invitation: Invitation;
};

const millisecondsPerDay = 1000 * 60 * 60 * 24;

function getTodayAtMidnight() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getTargetDate(slug: string) {
  const [year, month, day] = slug.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function getRemainingDays(targetDate: Date) {
  const today = getTodayAtMidnight();

  return Math.ceil((targetDate.getTime() - today.getTime()) / millisecondsPerDay);
}

export default function DayCountdown({ invitation }: DayCountdownProps) {
  const targetDate = useMemo(() => getTargetDate(invitation.slug), [invitation.slug]);
  const [remainingDays, setRemainingDays] = useState(() => getRemainingDays(targetDate));

  useEffect(() => {
    const updateRemainingDays = () => setRemainingDays(getRemainingDays(targetDate));
    const intervalId = window.setInterval(updateRemainingDays, 60 * 1000);

    updateRemainingDays();

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  const dayLabel =
    remainingDays > 0 ? `D-${remainingDays}` : remainingDays === 0 ? "D-DAY" : `D+${Math.abs(remainingDays)}`;
  const message =
    remainingDays > 0
      ? "우리 집에서 만날 날까지"
      : remainingDays === 0
        ? "오늘, 우리 집에서 만나요"
        : "함께한 따뜻한 시간을 기억할게요";

  return (
    <section className={styles.countdown} aria-label="집들이 디데이">
      <div className={styles.glow} aria-hidden="true" />
      <p>{message}</p>
      <strong key={dayLabel}>{dayLabel}</strong>
      <span>
        {invitation.dateLabel}
        {invitation.timeLabel !== "시간 미정" ? ` · ${invitation.timeLabel}` : ""}
      </span>
    </section>
  );
}
