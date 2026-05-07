import { notFound } from "next/navigation";
import InvitationGate from "@/components/InvitationGate";
import InvitationView from "@/components/InvitationView";
import { getInvitation, invitations } from "@/lib/invitations";

type InvitationPageProps = {
  params: Promise<{
    date: string;
  }>;
};

export function generateStaticParams() {
  return invitations.map((invitation) => ({
    date: invitation.slug,
  }));
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { date } = await params;
  const invitation = getInvitation(date);

  if (!invitation) {
    notFound();
  }

  return (
    <InvitationGate date={date}>
      <InvitationView invitation={invitation} />
    </InvitationGate>
  );
}
