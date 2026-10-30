import fs from 'fs-extra';
import signale from 'signale';
import path from 'node:path';
import { execSync } from 'node:child_process';

async function generateDts() {
  try {
    execSync('npx tsc --project tsconfig.build.json', { stdio: 'inherit' });
    await fs.copy(
      path.join(process.cwd(), 'package/dist/types/index.d.ts'),
      path.join(process.cwd(), 'package/dist/types/index.d.mts')
    );
  } catch (err) {
    signale.error('Failed to generate d.ts files');
    signale.error(err);
    process.exit(1);
  }
}

generateDts();
