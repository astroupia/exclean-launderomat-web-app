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
        <div id="contact">
          <Footer />
        </div>
      </body>
    </html>
  );
}
