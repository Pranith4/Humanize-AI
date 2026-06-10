import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HumanizeAI — Write Like a Human",
  description: "Transform AI-generated text into natural, undetectable human writing instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
