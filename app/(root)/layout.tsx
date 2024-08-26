import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "@/app/globals.css";
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
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
