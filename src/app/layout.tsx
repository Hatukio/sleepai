import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SleepAI - AI 助眠",
  description: "个性化催眠故事，帮助你快速入睡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
