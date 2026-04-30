const fs = require('fs');
const path = require('path');

const replacements = {
  // Page Backgrounds & Modals
  "dark:bg-slate-900": "dark:bg-[#0a0a0a]", 
  "dark:bg-[#0f172a]": "dark:bg-[#0b0b0b]", // Sidebar bg mostly
  
  // Cards & Modals
  "dark:bg-slate-800": "dark:bg-[#111111]",
  
  // Hover Backgrounds
  "dark:hover:bg-slate-800/80": "dark:hover:bg-[#181818]",
  "dark:hover:bg-slate-800": "dark:hover:bg-[#181818]",
  "dark:hover:bg-slate-700/50": "dark:hover:bg-[#181818]",
  "dark:hover:bg-slate-700": "dark:hover:bg-[#181818]",
  
  // Borders
  "dark:border-slate-800": "dark:border-[#262626]",
  "dark:border-slate-700/50": "dark:border-[#262626]",
  "dark:border-slate-700": "dark:border-[#262626]",
  "dark:border-slate-600": "dark:border-[#262626]",
  "dark:divide-slate-800": "dark:divide-[#262626]",
  "dark:divide-slate-700": "dark:divide-[#262626]",
  
  // Text
  "dark:text-slate-100": "dark:text-[#f8fafc]",
  "dark:text-slate-200": "dark:text-[#e2e8f0]",
  "dark:text-slate-300": "dark:text-[#cbd5e1]",
  "dark:text-slate-400": "dark:text-[#a1a1aa]",
  "dark:text-slate-500": "dark:text-[#737373]",
  "dark:group-hover:text-slate-300": "dark:group-hover:text-[#f8fafc]",
  
  // Placeholders
  "dark:placeholder:text-slate-500": "dark:placeholder:text-[#737373]",
  
  // bg-white issues in dark mode
  // The user said "White cards should become #111111 in dark mode."
  // Wait, the previous script changed bg-white to `bg-white dark:bg-slate-900`.
  // The first replacement above changes `dark:bg-slate-900` to `dark:bg-[#0a0a0a]`.
  // BUT cards should be `#111111`, and page should be `#0a0a0a`.
  // In `src/app/layout.tsx` the body is `#0a0a0a`.
  // So all `dark:bg-[#0a0a0a]` that were on cards need to be `#111111`.
  // Let's do a smart replace specifically for bg-white.
};

// We will just do string replacement
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace all slate classes
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }

  // Ensure cards (which had bg-white) become #111111. 
  // Previously they became `bg-white dark:bg-slate-900`, which the above loop turned into `bg-white dark:bg-[#0a0a0a]`.
  // Let's change `bg-white dark:bg-[#0a0a0a]` to `bg-white dark:bg-[#111111]`.
  content = content.split("bg-white dark:bg-[#0a0a0a]").join("bg-white dark:bg-[#111111]");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverseDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

traverseDir(path.join(__dirname, 'src/app'));
traverseDir(path.join(__dirname, 'src/components'));
console.log("Done fixing true dark colors!");
