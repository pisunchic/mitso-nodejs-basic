import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    
    try {
        // Читаем содержимое файла
        const fileContent = await readFile(filePath);
        
        // Создаем объект хэша SHA256
        const hash = createHash('sha256');
        
        // Обновляем хэш содержимым файла
        hash.update(fileContent);
        
        // Получаем хэш в hex формате
        const hexHash = hash.digest('hex');
        
        // Выводим результат
        console.log(hexHash);
    } catch (error) {
        console.error('Error calculating hash:', error.message);
        process.exit(1);
    }
};

await calculateHash();