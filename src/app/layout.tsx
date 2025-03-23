import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { EditorStoreProvider } from "@/providers/editor-store-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Google Docs Clone",
    description: "A clone of Google Docs built with Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <EditorStoreProvider>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </EditorStoreProvider>
            </body>
        </html>
    );
}
