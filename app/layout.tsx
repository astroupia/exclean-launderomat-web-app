import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/shared/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclean Laundermat Website",
  description: "For an Extra clean Clothes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
