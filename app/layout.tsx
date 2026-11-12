import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "FlipProof — Know what it's worth", description: "Identify it. Price it. Flip it.", applicationName: "FlipProof" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101411" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}