const fs = require('fs').promises;
const path = require('path');

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files_copy');

    try {
        // Проверяем существование исходной директории
        await fs.access(sourceDir);
        
        // Проверяем, что целевая директория не существует
        try {
            await fs.access(targetDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        // Создаем новую директорию
        await fs.mkdir(targetDir);

        // Получаем список файлов
        const files = await fs.readdir(sourceDir);

        // Копируем каждый файл
        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            await fs.copyFile(sourcePath, targetPath);
        }
    } catch (error) {
        if (error.code === 'ENOENT' || error.message === 'FS operation failed') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await copy();
