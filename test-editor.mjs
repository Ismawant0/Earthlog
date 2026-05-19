import fs from 'fs/promises';
const file = await fs.readFile('./content/equipment/pump-basic.mdx', 'utf-8');
console.log("PUMP-BASIC CONTENT:", file.substring(0, 200));
