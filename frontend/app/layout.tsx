import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FastDesk — Production Meta WhatsApp Cloud API Engine",
  description: "Real-time Meta WhatsApp Cloud API webhook integration, webhook verification engine, and messaging backend.",
  keywords: ["FastDesk", "WhatsApp API", "FastAPI", "Meta Cloud API", "Webhook Integration", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ambient-glow" />
        {children}
      </body>
    </html>
  );
}
