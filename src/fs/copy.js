import { readdir, mkdir, copyFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const sourceDir = join(__dirname, 'files');
    const targetDir = join(__dirname, 'files_copy');

    try {
        // Проверяем существование исходной директории и получаем список файлов
        const files = await readdir(sourceDir);
        
        // Пытаемся создать целевую директорию
        // Если директория уже существует, будет выброшена ошибка EEXIST
        await mkdir(targetDir, { recursive: false });
        
        // Копируем каждый файл
        for (const file of files) {
            const sourcePath = join(sourceDir, file);
            const targetPath = join(targetDir, file);
            await copyFile(sourcePath, targetPath);
        }
        
        console.log('Files copied successfully!');
    } catch (error) {
        // Если исходная директория не существует (ENOENT) 
        // или целевая директория уже существует (EEXIST)
        if (error.code === 'ENOENT' || error.code === 'EEXIST') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

copy().catch(error => {
    console.error('Failed to copy files:', error.message);
    process.exit(1);
});
