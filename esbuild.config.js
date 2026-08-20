import esbuild from 'esbuild';
import fs from 'fs';

async function build() {
    const args = process.argv.slice(2);
    const format = args.find(arg => arg.startsWith('--format='))?.split('=')[1];

    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
    }

    const nodeExternal = [
        'node-cache',
        'crypto', 'events', 'stream', 'util', 'assert', 'net', 'http',
        'zlib', 'url', 'dns', 'buffer', 'fs', 'path', 'tls', 'async_hooks',
        'diagnostics_channel', 'worker_threads', 'perf_hooks', 'querystring',
        'timers', 'console', 'sqlite', 'child_process', 'os', 'readline',
        'string_decoder', 'punycode', 'https', 'tty', 'domain', 'vm', 'v8'
    ];

    const browserExternal = [
        'node-cache',
        'crypto', 'events', 'stream', 'util', 'assert', 'net', 'http',
        'https', 'zlib', 'url', 'dns', 'buffer', 'fs', 'path', 'tls', 'async_hooks',
        'diagnostics_channel', 'worker_threads', 'perf_hooks', 'querystring',
        'timers', 'console', 'sqlite'
    ];

    if (format === 'esm' || !format) {
        console.log('Building ESM...');
        await esbuild.build({
            entryPoints: ['src/index.js'],
            bundle: true,
            platform: 'node',
            target: 'es2020',
            outfile: 'dist/index.mjs',
            format: 'esm',
            external: nodeExternal,
            minify: false,
            sourcemap: false,
            banner: {
                js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);'
            }
        });
    }

    if (format === 'cjs' || !format) {
        console.log('Building CJS...');
        await esbuild.build({
            entryPoints: ['src/index.js'],
            bundle: true,
            platform: 'node',
            target: 'es2020',
            outfile: 'dist/index.cjs',
            format: 'cjs',
            external: nodeExternal,
            minify: false,
            sourcemap: false
        });
    }

    if (format === 'iife' || !format) {
        console.log('Building Browser (IIFE)...');
        await esbuild.build({
            entryPoints: ['src/browser.js'],
            bundle: true,
            platform: 'browser',
            target: 'es2020',
            outfile: 'dist/browser.js',
            format: 'iife',
            globalName: 'Dramabox',
            external: browserExternal,
            minify: false,
            sourcemap: false
        });

        console.log('Building Browser (Minified)...');
        await esbuild.build({
            entryPoints: ['src/browser.js'],
            bundle: true,
            platform: 'browser',
            target: 'es2020',
            outfile: 'dist/browser.min.js',
            format: 'iife',
            globalName: 'Dramabox',
            external: browserExternal,
            minify: true,
            sourcemap: false
        });
    }

    if (format === 'esm' || !format) {
        const dtsContent = `export * from '../src/types/index.d.ts';`;
        fs.writeFileSync('dist/index.d.ts', dtsContent);
    }
    
    console.log('Build complete!');
}

build().catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
});