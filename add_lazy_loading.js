const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let updated = false;
      const newContent = content.replace(/<img\s([^>]+)>/g, (match, attrs) => {
        if (attrs.includes('loading=')) {
          return match;
        }
        updated = true;
        return `<img loading="lazy" ${attrs}>`;
      });
      
      if (updated) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Updated:', fullPath);
      }
    }
  });
}

const targetDir = path.join(__dirname, 'apps/web/src');
console.log('Processing:', targetDir);
processDir(targetDir);
console.log('Done.');
