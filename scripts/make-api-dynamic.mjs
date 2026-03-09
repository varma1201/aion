import fs from 'fs';
import path from 'path';

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith('route.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
const routes = walkDir(apiDir);

routes.forEach(route => {
  const content = fs.readFileSync(route, 'utf8');
  if (!content.includes('export const dynamic = "force-dynamic";')) {
    const newContent = 'export const dynamic = "force-dynamic";\n' + content;
    fs.writeFileSync(route, newContent);
    console.log(`Updated ${route}`);
  }
});
