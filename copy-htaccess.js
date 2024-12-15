import fs from 'fs';
import path from 'path';

try {
  const sourceFile = path.resolve('.htaccess');
  const destFile = path.resolve('dist/.htaccess');

  // Ensure dist directory exists
  fs.mkdirSync('dist', { recursive: true });

  // Copy file
  fs.copyFileSync(sourceFile, destFile);
  console.log('Successfully copied .htaccess to dist directory');
} catch (error) {
  console.error('Error copying .htaccess:', error);
  process.exit(1);
}
