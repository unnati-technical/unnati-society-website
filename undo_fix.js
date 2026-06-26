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
  
  // Revert catch variables
  content = content.replace(/catch\s*\(\s*_err\s*\)/g, 'catch (err)');
  content = content.replace(/catch\s*\(\s*_error\s*\)/g, 'catch (error)');
  content = content.replace(/catch\s*\(\s*_createErr\s*\)/g, 'catch (createErr)');
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Reverted catch vars in admin');
