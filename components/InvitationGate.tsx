"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

type InvitationGateProps = {
  children: ReactNode;
  date: string;
};

export default function InvitationGate({ children, date }: InvitationGateProps) {
  const router = useRouter();
  const allowedDate = useSyncExternalStore(
    () => () => undefined,
    () => window.sessionStorage.getItem("houseparty-invitation-date"),
    () => null
  );
  const allowed = allowedDate === date;

  useEffect(() => {
    if (allowedDate !== null && !allowed) {
      router.replace("/");
    }
  }, [allowed, allowedDate, router]);

  if (!allowed) {
    return null;
  }

  return children;
}
