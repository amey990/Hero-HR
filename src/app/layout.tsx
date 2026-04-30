import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
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
 <div className="flex h-screen overflow-hidden">
 {/* Sidebar */}
 <Sidebar />

 {/* Main Content */}
 <div className="flex-1 flex flex-col">
 <Navbar />

 <main className="flex-1 p-6 overflow-y-auto">
 {children}
 </main>
 </div>
 </div>
 </ThemeProvider>
 </body>
 </html>
 );
}