import { unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deleteFile = async () => {
    const filePath = join(__dirname, 'files', 'fileToRemove.txt');
    try {
        await unlink(filePath);
        console.log('File deleted successfully!');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

deleteFile().catch(error => {
    console.error('Failed to delete file:', error.message);
    process.exit(1);
});