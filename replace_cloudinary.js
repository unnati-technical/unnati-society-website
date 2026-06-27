const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'apps', 'web', 'src');
const searchString = 'dyubgh5k4';
const replaceString = 'drhkvdtw2';

function traverseAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseAndReplace(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(searchString)) {
        const updatedContent = content.replace(new RegExp(searchString, 'g'), replaceString);
        fs.writeFileSync(fullPath, updatedContent, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

traverseAndReplace(directory);
console.log('Finished replacing cloud names in frontend code.');
