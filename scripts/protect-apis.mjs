import fs from 'fs';
import path from 'path';

const filesToProtect = [
  'src/app/api/services/route.ts',
  'src/app/api/projects/route.ts',
  'src/app/api/clients/route.ts',
  'src/app/api/packages/route.ts',
  'src/app/api/services/[id]/route.ts',
  'src/app/api/projects/[id]/route.ts',
  'src/app/api/clients/[id]/route.ts',
  'src/app/api/packages/[id]/route.ts',
  'src/app/api/contacts/route.ts',
  'src/app/api/contacts/[id]/route.ts'
];

for (const relPath of filesToProtect) {
  const filePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${filePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // Add import if not present
  if (!content.includes('verifyAdminAPI')) {
    content = content.replace('import { NextRequest', 'import { verifyAdminAPI } from "@/lib/auth";\nimport { NextRequest');
    updated = true;
  }

  // Protect specific methods
  const protectMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  for (const method of protectMethods) {
    if (relPath.includes('contacts/route.ts') && method === 'POST') continue;
    
    // Match export async function POST(req: NextRequest...) {
    const regex = new RegExp(`export async function \\s*${method}\\s*\\([^{]*\\)\\s*\\{`, 'g');
    if (!content.includes(`verifyAdminAPI(req)`)) {
      const newContent = content.replace(regex, (match) => {
        return `${match}\n  const authError = verifyAdminAPI(req);\n  if (authError) return authError;\n`;
      });
      if (newContent !== content) {
        content = newContent;
        updated = true;
      }
    }
  }

  // Special case for GET in contacts
  if (relPath.includes('contacts/route') && !content.includes('verifyAdminAPI(req)')) { // works for [id] as well
    const getRegex1 = /export async function GET\(req: NextRequest(?:, \{ params \}: any)?\) \{/g;
    const getRegex2 = /export async function GET\(\) \{/g;
    
    if (getRegex1.test(content)) {
      content = content.replace(getRegex1, (match) => {
        return `${match}\n  const authError = verifyAdminAPI(req);\n  if (authError) return authError;\n`;
      });
      updated = true;
    } else if (getRegex2.test(content)) {
      content = content.replace(getRegex2, (match) => {
        return `export async function GET(req: NextRequest) {\n  const authError = verifyAdminAPI(req);\n  if (authError) return authError;\n`;
      });
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Protected: ${relPath}`);
  }
}
