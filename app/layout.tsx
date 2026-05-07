import type { Metadata } from "next";
import type { ReactNode } from "react";
import { shareMetadata } from "@/lib/share";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: shareMetadata.title,
  description: shareMetadata.description,
  openGraph: {
    title: shareMetadata.title,
    description: shareMetadata.description,
    images: [
      {
        url: shareMetadata.image.path,
        width: shareMetadata.image.width,
        height: shareMetadata.image.height,
        alt: shareMetadata.image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: shareMetadata.title,
    description: shareMetadata.description,
    images: [shareMetadata.image.path],
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
