
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Othello",
  description: "Othello",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}
      style={{
        height: '100svh',
        backgroundColor: '#34140A'
        }}>{children}</body>
    </html>
  );
}
