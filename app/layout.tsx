import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "미림 규웅 집들이",
  description: "달롱이와 함께 기다릴게요. 편한 마음으로 놀러 와주세요.",
  openGraph: {
    title: "미림 규웅 집들이",
    description: "달롱이와 함께 기다릴게요. 편한 마음으로 놀러 와주세요.",
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
    title: "미림 규웅 집들이",
    description: "달롱이와 함께 기다릴게요. 편한 마음으로 놀러 와주세요.",
    images: ["/dallongi.jpg"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
