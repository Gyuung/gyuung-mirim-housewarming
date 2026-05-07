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
  const title = "미림 규웅 집들이";
  const description = invitation
    ? `달롱이와 함께 기다릴게요. ${invitation.dateLabel} ${invitation.timeLabel}, 편한 마음으로 놀러 와주세요.`
    : "달롱이와 함께 기다릴게요. 편한 마음으로 놀러 와주세요.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/dallongi.jpg",
          width: 1200,
          height: 630,
          alt: "달롱이 집들이 초대장",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/dallongi.jpg"],
    },
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
