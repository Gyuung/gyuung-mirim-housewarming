import { notFound } from "next/navigation";
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

export async function generateMetadata({ params }: InvitationPageProps) {
  const { date } = await params;
  const invitation = getInvitation(date);

  return {
    title: invitation ? `${invitation.slug} housewarming invitation` : "housewarming invitation",
  };
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { date } = await params;
  const invitation = getInvitation(date);

  if (!invitation) {
    notFound();
  }

  return <InvitationView invitation={invitation} />;
}
