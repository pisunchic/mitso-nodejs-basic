import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const sourcePath = join(__dirname, 'files', 'fileToCompress.txt');
    const archivePath = join(__dirname, 'files', 'archive.gz');
    
    // Создаем потоки для чтения и записи
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(archivePath);
    const gzip = createGzip();
    
    // Обработка данных из readStream
    readStream.on('data', (chunk) => {
        // Отправляем chunk в поток сжатия
        gzip.write(chunk);
    });
    
    // Обработка данных из gzip
    gzip.on('data', (chunk) => {
        // Записываем сжатые данные в файл
        writeStream.write(chunk);
    });
    
    // Обработка завершения чтения
    readStream.on('end', () => {
        gzip.end();
    });
    
    // Обработка завершения сжатия
    gzip.on('end', () => {
        writeStream.end();
    });
    
    // Обработка ошибок чтения
    readStream.on('error', (error) => {
        console.error('Error reading file:', error.message);
        process.exit(1);
    });
    
    // Обработка ошибок сжатия
    gzip.on('error', (error) => {
        console.error('Error during compression:', error.message);
        process.exit(1);
    });
    
    // Обработка ошибок записи
    writeStream.on('error', (error) => {
        console.error('Error writing archive:', error.message);
        process.exit(1);
    });
    
    // Обработка завершения записи
    writeStream.on('finish', () => {
        console.log('File has been compressed successfully');
    });
};

await compress();