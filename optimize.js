/**
 * Tanya Rathore - Portfolio Build & Optimization Script
 * Automates:
 * 1. Safe CSS Minification (whitespace, comments, empty rules removal)
 * 2. Safe JS compression (comments removal, whitespace trimming, empty lines cleanup)
 * 3. HTML refactoring (switching to .min assets and lazy-loading profile images)
 */

const fs = require('fs');
const path = require('path');

// Target directory (current workspace)
const DIR = __dirname;

console.log('🚀 Starting project optimization build...\n');

// ==========================================
// 1. Minify CSS
// ==========================================
function minifyCSS(cssContent) {
    return cssContent
        // Remove block comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove newlines and tabs
        .replace(/\r?\n|\r/g, '')
        .replace(/\t/g, '')
        // Remove redundant spaces
        .replace(/\s*\{\s*/g, '{')
        .replace(/\s*\}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*,\s*/g, ',')
        // Remove double spaces
        .replace(/\s+/g, ' ')
        .trim();
}

// ==========================================
// 2. Minify JS (Safe, preserving ASI)
// ==========================================
function minifyJS(jsContent) {
    const lines = jsContent.split(/\r?\n/);
    const minifiedLines = lines.map(line => {
        // Remove single line comments that are not part of URLs
        let cleanLine = line.replace(/(?<!http:|https:)\/\/.*$/, '');
        // Trim leading and trailing spaces
        return cleanLine.trim();
    })
    // Filter out completely empty lines
    .filter(line => line.length > 0);

    // Join with newlines to safely preserve Automatic Semicolon Insertion (ASI)
    return minifiedLines.join('\n');
}

// ==========================================
// 3. Main Build Execution
// ==========================================
try {
    // ---- A. CSS Minification ----
    const cssPath = path.join(DIR, 'style.css');
    if (fs.existsSync(cssPath)) {
        console.log('📦 Minifying style.css...');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        const minifiedCss = minifyCSS(cssContent);
        fs.writeFileSync(path.join(DIR, 'style.min.css'), minifiedCss, 'utf8');
        console.log(`   └─ Size reduced: ${cssContent.length} bytes -> ${minifiedCss.length} bytes (${Math.round((1 - minifiedCss.length/cssContent.length)*100)}% saved)`);
    }

    // ---- B. JS Minification ----
    const scripts = ['script.js', 'products.js'];
    scripts.forEach(scriptFile => {
        const jsPath = path.join(DIR, scriptFile);
        if (fs.existsSync(jsPath)) {
            console.log(`📦 Minifying ${scriptFile}...`);
            const jsContent = fs.readFileSync(jsPath, 'utf8');
            const minifiedJs = minifyJS(jsContent);
            const minifiedFilename = scriptFile.replace('.js', '.min.js');
            fs.writeFileSync(path.join(DIR, minifiedFilename), minifiedJs, 'utf8');
            console.log(`   └─ Size reduced: ${jsContent.length} bytes -> ${minifiedJs.length} bytes (${Math.round((1 - minifiedJs.length/jsContent.length)*100)}% saved)`);
        }
    });

    // ---- C. HTML Refactoring ----
    const htmlFiles = ['index.html', 'projects.html', 'products.html'];
    htmlFiles.forEach(htmlFile => {
        const htmlPath = path.join(DIR, htmlFile);
        if (fs.existsSync(htmlPath)) {
            console.log(`🔧 Optimizing ${htmlFile} for production...`);
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');

            // Replace unminified CSS reference
            htmlContent = htmlContent.replace('href="style.css"', 'href="style.min.css"');

            // Replace unminified JS references
            htmlContent = htmlContent.replace('src="script.js"', 'src="script.min.js"');
            htmlContent = htmlContent.replace('src="products.js"', 'src="products.min.js"');

            // Inject loading="lazy" for profile-image if not present
            if (htmlFile === 'index.html' && !htmlContent.includes('loading="lazy"')) {
                htmlContent = htmlContent.replace(
                    'class="profile-image"',
                    'class="profile-image" loading="lazy"'
                );
                console.log('   └─ Injected loading="lazy" to profile image');
            }

            fs.writeFileSync(htmlPath, htmlContent, 'utf8');
            console.log(`   └─ Refactored HTML references to minified assets`);
        }
    });

    console.log('\n✨ Optimization build completed successfully! All assets are minified and active.');

} catch (err) {
    console.error('\n❌ Build Error:', err);
    process.exit(1);
}
