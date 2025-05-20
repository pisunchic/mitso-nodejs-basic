import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    
    // Создаем Writable Stream для записи в файл
    const writeStream = createWriteStream(filePath);
    
    // Подключаем process.stdin к writeStream
    process.stdin.pipe(writeStream);
    
    // Обработка ошибок записи
    writeStream.on('error', (error) => {
        console.error('Error writing to file:', error.message);
        process.exit(1);
    });
    
    // Обработка завершения записи
    writeStream.on('finish', () => {
        console.log('File has been written successfully');
    });
};

await write();