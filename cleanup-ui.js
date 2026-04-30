const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Fix the messy generated classes from previous script
  // e.g. hover:bg-blue-50 dark:bg-blue-500/10 dark:hover:bg-blue-50 dark:bg-blue-500/100/20/30
  content = content.replace(/hover:bg-blue-50 dark:bg-blue-500\/10 dark:hover:bg-blue-50 dark:bg-blue-500\/100\/20\/30/g, "hover:bg-gray-50 dark:hover:bg-[#181818]");
  content = content.replace(/hover:bg-blue-50 dark:bg-blue-500\/10 dark:hover:bg-blue-50 dark:bg-blue-500\/100\/20/g, "hover:bg-gray-50 dark:hover:bg-[#181818]");
  
  // 2. Replace any leftover hover:bg-blue-50 with gray hover
  content = content.replace(/hover:bg-blue-50(?!\/)/g, "hover:bg-gray-50");
  
  // 3. Remove messy dark:bg-blue-500/100... strings
  content = content.replace(/dark:bg-blue-500\/100(\/\d+)+/g, "");
  
  // 4. Remove all card hover borders and expanding shadows for a flatter look
  content = content.replace(/\s*hover:shadow-md/g, "");
  content = content.replace(/\s*hover:shadow-lg/g, "");
  content = content.replace(/\s*hover:border-blue-200/g, "");
  content = content.replace(/\s*group-hover:border-blue-200/g, "");
  content = content.replace(/\s*dark:group-hover:border-\[#333333\]/g, "");
  content = content.replace(/\s*group-hover:scale-110/g, ""); // Remove the icon pop effect on cards
  content = content.replace(/\s*hover:-translate-y-1/g, ""); // Remove any lifting effect

  // Clean up any double spaces introduced by removals
  content = content.replace(/  +/g, ' ');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned: ${filePath}`);
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
console.log("Cleanup complete.");
