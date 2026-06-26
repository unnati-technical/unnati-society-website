const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const adminSrc = path.join(__dirname, 'apps/admin/src');
const files = walkSync(adminSrc);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove eslint-disable comments
  content = content.replace(/.*eslint-disable-next-line.*/g, '');
  
  // Replace catch (err) with catch (_err)
  content = content.replace(/catch\s*\(\s*err\s*\)/g, 'catch (_err)');
  content = content.replace(/catch\s*\(\s*error\s*\)/g, 'catch (_error)');
  content = content.replace(/catch\s*\(\s*createErr\s*\)/g, 'catch (_createErr)');
  
  // Custom fixes for AdminEvents.jsx
  if (file.includes('AdminEvents.jsx')) {
    content = content.replace(/const \[showAll, setShowAll\] = useState\(false\);/, '');
  }
  
  // Custom fixes for AdminTeamLeads.jsx
  if (file.includes('AdminTeamLeads.jsx')) {
    content = content.replace(/import { motion, AnimatePresence } from 'framer-motion';/, "import { AnimatePresence } from 'framer-motion';");
    content = content.replace(/const \[loading, setLoading\] = useState\(true\);/, "const [, setLoading] = useState(true);");
    content = content.replace(/const handleGenerate = async \(\) => {[\s\S]*?};/, '');
    content = content.replace(/const handleReset = async \(\) => {[\s\S]*?};/, '');
  }

  // Write back
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Done');
