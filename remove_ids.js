const fs = require('fs');
const file = 'src/components/sections/HomelabVisual.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<span className="text-\[10px\].*?\{n\.\w+\.id\}<\/span>\n\s*/g, '');
content = content.replace(/<span className="text-xs.*?\{n\.\w+\.id\}<\/span>\n\s*/g, '');
fs.writeFileSync(file, content);
console.log('done');
