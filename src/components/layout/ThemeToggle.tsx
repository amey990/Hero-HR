"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
 const { theme, setTheme, resolvedTheme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 setMounted(true);
 }, []);

 if (!mounted) {
 return <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#111111]" />;
 }

 const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full text-gray-500 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#181818] hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer overflow-hidden shrink-0 flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun 
          size={20} 
          strokeWidth={2.5}
          className={`absolute transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`} 
        />
        <Moon 
          size={20} 
          strokeWidth={2.5}
          className={`absolute transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`} 
        />
      </div>
    </button>
  );
}
