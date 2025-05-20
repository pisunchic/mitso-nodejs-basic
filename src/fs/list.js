import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const dirPath = join(__dirname, 'files');
    
    try {
        const files = await readdir(dirPath);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

list().catch(error => {
    console.error('Failed to list files:', error.message);
    process.exit(1);
});