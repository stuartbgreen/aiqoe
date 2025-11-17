import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { EB_Garamond, Geist } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arvus - AI-Powered Due Diligence for M&A Teams",
  description: "Arvus helps private equity and transaction advisory firms automate repetitive data cleanup and reporting tasks. Streamline your M&A due diligence process with AI.",
  alternates: {
    canonical: "https://arvus.ai",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${ebGaramond.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
