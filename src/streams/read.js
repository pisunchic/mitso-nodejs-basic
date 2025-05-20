import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    
    // Создаем Readable Stream для чтения файла
    const readStream = createReadStream(filePath, { encoding: 'utf8' });
    
    // Напрямую подключаем readStream к process.stdout
    readStream.pipe(process.stdout);
    
    // Обработка ошибок
    readStream.on('error', (error) => {
        console.error('Error reading file:', error.message);
        process.exit(1);
    });
};

await read();