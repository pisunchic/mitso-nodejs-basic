import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await writeFile(filePath, content, { flag: 'wx' });
        console.log('File created successfully!');
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

create().catch(error => {
    console.error('Failed to create file:', error.message);
    process.exit(1);
});