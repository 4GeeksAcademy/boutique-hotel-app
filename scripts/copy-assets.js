const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/assets');
const targetDir = path.join(__dirname, '../public/assets');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy assets
fs.copySync(sourceDir, targetDir, {
    overwrite: true,
    errorOnExist: false,
});

console.log('Assets copied successfully!'); 