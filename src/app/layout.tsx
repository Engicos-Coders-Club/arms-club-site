import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "./Context";
import Wrapper from "@/components/Wrapper";

export const metadata: Metadata = {
  title: "ARM Website",
  description:
    "A community-driven club dedicated to exploring and advancing robotics technology through hands-on projects, workshops, and competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-zinc-950 text-[#FAFAFA]`}>
          <Wrapper>
            <Header />
            {children}
          </Wrapper>
      </body>
    </html>
  );
}
