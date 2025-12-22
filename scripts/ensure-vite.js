#!/usr/bin/env node
// Script to ensure vite is installed if npm fails to install it
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const viteDir = join(rootDir, 'node_modules', 'vite');

if (!existsSync(viteDir)) {
  console.log('⚠️  Vite not found, attempting to install...');
  try {
    execSync('npm pack vite@5.4.21', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/vite', { cwd: rootDir, stdio: 'inherit' });
    execSync('tar -xzf vite-5.4.21.tgz -C node_modules/vite --strip-components=1', { cwd: rootDir, stdio: 'inherit' });
    execSync('rm vite-5.4.21.tgz', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/.bin', { cwd: rootDir, stdio: 'inherit' });
    execSync('ln -sf ../vite/bin/vite.js node_modules/.bin/vite', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Vite manually installed');
  } catch (error) {
    console.error('❌ Failed to install vite:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Vite is installed');
}

// Also check for esbuild
const esbuildDir = join(rootDir, 'node_modules', 'esbuild');
if (!existsSync(esbuildDir)) {
  console.log('⚠️  esbuild not found, attempting to install...');
  try {
    execSync('npm pack esbuild@0.21.3', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/esbuild', { cwd: rootDir, stdio: 'inherit' });
    execSync('tar -xzf esbuild-0.21.3.tgz -C node_modules/esbuild --strip-components=1', { cwd: rootDir, stdio: 'inherit' });
    execSync('rm esbuild-0.21.3.tgz', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ esbuild manually installed');
  } catch (error) {
    console.error('❌ Failed to install esbuild:', error.message);
  }
} else {
  console.log('✅ esbuild is installed');
}

// Check for esbuild binary (platform-specific)
const esbuildBinaryDir = join(rootDir, 'node_modules', '@esbuild', 'linux-x64');
if (!existsSync(esbuildBinaryDir)) {
  console.log('⚠️  esbuild binary not found, attempting to install...');
  try {
    execSync('npm pack @esbuild/linux-x64', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/@esbuild/linux-x64', { cwd: rootDir, stdio: 'inherit' });
    const tgzFiles = execSync('ls @esbuild-linux-x64-*.tgz 2>/dev/null', { cwd: rootDir, encoding: 'utf8' }).trim();
    if (tgzFiles) {
      execSync(`tar -xzf ${tgzFiles} -C node_modules/@esbuild/linux-x64 --strip-components=1`, { cwd: rootDir, stdio: 'inherit' });
      execSync(`rm ${tgzFiles}`, { cwd: rootDir, stdio: 'inherit' });
      console.log('✅ esbuild binary manually installed');
    }
  } catch (error) {
    console.error('❌ Failed to install esbuild binary:', error.message);
  }
} else {
  console.log('✅ esbuild binary is installed');
}

// Check for rollup (vite dependency)
const rollupDir = join(rootDir, 'node_modules', 'rollup');
if (!existsSync(rollupDir)) {
  console.log('⚠️  rollup not found, attempting to install...');
  try {
    execSync('npm pack rollup@4.20.0', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/rollup', { cwd: rootDir, stdio: 'inherit' });
    execSync('tar -xzf rollup-4.20.0.tgz -C node_modules/rollup --strip-components=1', { cwd: rootDir, stdio: 'inherit' });
    execSync('rm rollup-4.20.0.tgz', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ rollup manually installed');
  } catch (error) {
    console.error('❌ Failed to install rollup:', error.message);
  }
} else {
  console.log('✅ rollup is installed');
}

// Check for rollup binary (platform-specific)
const rollupBinaryDir = join(rootDir, 'node_modules', '@rollup', 'rollup-linux-x64-gnu');
if (!existsSync(rollupBinaryDir)) {
  console.log('⚠️  rollup binary not found, attempting to install...');
  try {
    execSync('npm pack @rollup/rollup-linux-x64-gnu', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/@rollup/rollup-linux-x64-gnu', { cwd: rootDir, stdio: 'inherit' });
    const tgzFiles = execSync('ls rollup-rollup-linux-x64-gnu-*.tgz 2>/dev/null', { cwd: rootDir, encoding: 'utf8' }).trim();
    if (tgzFiles) {
      execSync(`tar -xzf ${tgzFiles} -C node_modules/@rollup/rollup-linux-x64-gnu --strip-components=1`, { cwd: rootDir, stdio: 'inherit' });
      execSync(`rm ${tgzFiles}`, { cwd: rootDir, stdio: 'inherit' });
      console.log('✅ rollup binary manually installed');
    }
  } catch (error) {
    console.error('❌ Failed to install rollup binary:', error.message);
  }
} else {
  console.log('✅ rollup binary is installed');
}

// Check for postcss (vite dependency)
const postcssDir = join(rootDir, 'node_modules', 'postcss');
if (!existsSync(postcssDir)) {
  console.log('⚠️  postcss not found, attempting to install...');
  try {
    execSync('npm pack postcss@8.4.43', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/postcss', { cwd: rootDir, stdio: 'inherit' });
    execSync('tar -xzf postcss-8.4.43.tgz -C node_modules/postcss --strip-components=1', { cwd: rootDir, stdio: 'inherit' });
    execSync('rm postcss-8.4.43.tgz', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ postcss manually installed');
  } catch (error) {
    console.error('❌ Failed to install postcss:', error.message);
  }
} else {
  console.log('✅ postcss is installed');
}

// Check for @vitejs/plugin-react
const vitejsPluginReactDir = join(rootDir, 'node_modules', '@vitejs', 'plugin-react');
if (!existsSync(vitejsPluginReactDir)) {
  console.log('⚠️  @vitejs/plugin-react not found, attempting to install...');
  try {
    execSync('npm pack @vitejs/plugin-react@4.2.1', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/@vitejs/plugin-react', { cwd: rootDir, stdio: 'inherit' });
    const tgzFiles = execSync('ls vitejs-plugin-react-*.tgz 2>/dev/null', { cwd: rootDir, encoding: 'utf8' }).trim();
    if (tgzFiles) {
      execSync(`tar -xzf ${tgzFiles} -C node_modules/@vitejs/plugin-react --strip-components=1`, { cwd: rootDir, stdio: 'inherit' });
      execSync(`rm ${tgzFiles}`, { cwd: rootDir, stdio: 'inherit' });
      console.log('✅ @vitejs/plugin-react manually installed');
    }
  } catch (error) {
    console.error('❌ Failed to install @vitejs/plugin-react:', error.message);
  }
} else {
  console.log('✅ @vitejs/plugin-react is installed');
}

// Check for react-refresh (dependency of @vitejs/plugin-react)
const reactRefreshDir = join(rootDir, 'node_modules', 'react-refresh');
if (!existsSync(reactRefreshDir)) {
  console.log('⚠️  react-refresh not found, attempting to install...');
  try {
    execSync('npm pack react-refresh', { cwd: rootDir, stdio: 'inherit' });
    execSync('mkdir -p node_modules/react-refresh', { cwd: rootDir, stdio: 'inherit' });
    const tgzFiles = execSync('ls react-refresh-*.tgz 2>/dev/null', { cwd: rootDir, encoding: 'utf8' }).trim();
    if (tgzFiles) {
      execSync(`tar -xzf ${tgzFiles} -C node_modules/react-refresh --strip-components=1`, { cwd: rootDir, stdio: 'inherit' });
      execSync(`rm ${tgzFiles}`, { cwd: rootDir, stdio: 'inherit' });
      console.log('✅ react-refresh manually installed');
    }
  } catch (error) {
    console.error('❌ Failed to install react-refresh:', error.message);
  }
} else {
  console.log('✅ react-refresh is installed');
}
