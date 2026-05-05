import ClientLayout from "../components/layout/ClientLayout";
import { ThemeProvider } from "../components/layout/ThemeProvider";
import "./globals.css";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" suppressHydrationWarning>
 <body className="bg-[#f5f7fb] dark:bg-[#0a0a0a] text-[#0f172a] dark:text-[#f8fafc]">
 <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
 <ClientLayout>
 {children}
 </ClientLayout>
 </ThemeProvider>
 </body>
 </html>
 );
}