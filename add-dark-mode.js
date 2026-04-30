const fs = require('fs');
const path = require('path');

const replacements = {
  // Backgrounds
  "bg-white": "bg-white dark:bg-slate-900",
  "bg-gray-50": "bg-gray-50 dark:bg-slate-800",
  "hover:bg-gray-50": "hover:bg-gray-50 dark:hover:bg-slate-800/80",
  "bg-gray-100": "bg-gray-100 dark:bg-slate-800",
  "hover:bg-gray-100": "hover:bg-gray-100 dark:hover:bg-slate-700",
  
  // Borders
  "border-gray-50": "border-gray-50 dark:border-slate-800",
  "border-gray-100": "border-gray-100 dark:border-slate-800",
  "border-gray-200": "border-gray-200 dark:border-slate-700",
  "border-b-gray-100": "border-b-gray-100 dark:border-slate-800",
  "divide-gray-50": "divide-gray-50 dark:divide-slate-800",
  "divide-gray-100": "divide-gray-100 dark:divide-slate-800",
  "divide-gray-200": "divide-gray-200 dark:divide-slate-700",
  
  // Text
  "text-gray-900": "text-gray-900 dark:text-white",
  "text-gray-800": "text-gray-800 dark:text-slate-200",
  "text-gray-700": "text-gray-700 dark:text-slate-300",
  "text-gray-600": "text-gray-600 dark:text-slate-400",
  "text-gray-500": "text-gray-500 dark:text-slate-400",
  "text-gray-400": "text-gray-400 dark:text-slate-500",
  "text-slate-900": "text-slate-900 dark:text-white",
  "text-slate-500": "text-slate-500 dark:text-slate-400",
  "text-slate-400": "text-slate-400 dark:text-slate-500",

  // Inputs & Placeholders
  "placeholder:text-slate-400": "placeholder:text-slate-400 dark:placeholder:text-slate-500",
  "placeholder:text-gray-400": "placeholder:text-gray-400 dark:placeholder:text-slate-500",
  
  // Status Colors (Pills & Icons)
  "bg-blue-50": "bg-blue-50 dark:bg-blue-500/10",
  "hover:bg-blue-50": "hover:bg-blue-50 dark:hover:bg-blue-500/20",
  "bg-blue-100": "bg-blue-100 dark:bg-blue-500/20",
  "border-blue-200": "border-blue-200 dark:border-blue-500/30",
  
  "bg-green-50": "bg-green-50 dark:bg-green-500/10",
  "hover:bg-green-50": "hover:bg-green-50 dark:hover:bg-green-500/20",
  "border-green-200": "border-green-200 dark:border-green-500/30",
  
  "bg-yellow-50": "bg-yellow-50 dark:bg-yellow-500/10",
  "hover:bg-yellow-50": "hover:bg-yellow-50 dark:hover:bg-yellow-500/20",
  "border-yellow-200": "border-yellow-200 dark:border-yellow-500/30",
  
  "bg-red-50": "bg-red-50 dark:bg-red-500/10",
  "hover:bg-red-50": "hover:bg-red-50 dark:hover:bg-red-500/20",
  "border-red-200": "border-red-200 dark:border-red-500/30",
  
  "bg-orange-50": "bg-orange-50 dark:bg-orange-500/10",
  "border-orange-200": "border-orange-200 dark:border-orange-500/30",
  
  "bg-purple-50": "bg-purple-50 dark:bg-purple-500/10",
  "border-purple-200": "border-purple-200 dark:border-purple-500/30",
};

// Ensure we don't accidentally replace already-replaced strings by sorting keys by length descending
const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  sortedKeys.forEach(key => {
    // We use a regex with negative lookahead to prevent double-replacements
    // For example, replacing 'bg-white' should not happen if it's already followed by ' dark:bg-slate-900'
    const val = replacements[key];
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // Pattern: Match `key` that is not followed by its dark replacement (or any dark class for simplicity)
    const darkClass = val.split(' ')[1]; // The dark class part
    const escapedDarkClass = darkClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    const regex = new RegExp(`${escapedKey}(?!\\s+${escapedDarkClass})`, 'g');
    content = content.replace(regex, val);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('layout.tsx')) {
      processFile(fullPath);
    }
  });
}

traverseDir(path.join(__dirname, 'src/app'));
console.log("Done adding dark classes to app files!");
