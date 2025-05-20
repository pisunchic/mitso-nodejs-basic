import { rename as fsRename, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const dir = join(__dirname, 'files');
    const oldPath = join(dir, 'wrongFilename.txt');
    const newPath = join(dir, 'properFilename.md');

    try {
        // Проверяем, существует ли исходный файл
        await access(oldPath);
        // Проверяем, не существует ли уже целевой файл
        try {
            await access(newPath);
            // Если целевой файл существует, выбрасываем ошибку
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
            // Если ошибка ENOENT, значит файла нет, и это хорошо
        }
        // Переименовываем файл
        await fsRename(oldPath, newPath);
        console.log('File renamed successfully!');
    } catch (error) {
        // Если исходный файл не существует или целевой уже есть
        if (error.code === 'ENOENT' || error.message === 'FS operation failed') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

rename().catch(error => {
    console.error('Failed to rename file:', error.message);
    process.exit(1);
});