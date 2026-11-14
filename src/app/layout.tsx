
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NÔM VIỆT – Khám phá di sản chữ Nôm",
  description:
    "Nền tảng học tập, tra cứu và khám phá di sản chữ Nôm Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
