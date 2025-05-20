import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const archivePath = join(__dirname, 'files', 'archive.gz');
    const targetPath = join(__dirname, 'files', 'fileToCompress.txt');
    
    // Создаем потоки для чтения и записи
    const readStream = createReadStream(archivePath);
    const writeStream = createWriteStream(targetPath);
    const gunzip = createGunzip();
    
    // Обработка данных из readStream
    readStream.on('data', (chunk) => {
        // Отправляем chunk в поток распаковки
        gunzip.write(chunk);
    });
    
    // Обработка данных из gunzip
    gunzip.on('data', (chunk) => {
        // Записываем распакованные данные в файл
        writeStream.write(chunk);
    });
    
    // Обработка завершения чтения
    readStream.on('end', () => {
        gunzip.end();
    });
    
    // Обработка завершения распаковки
    gunzip.on('end', () => {
        writeStream.end();
    });
    
    // Обработка ошибок чтения
    readStream.on('error', (error) => {
        console.error('Error reading archive:', error.message);
        process.exit(1);
    });
    
    // Обработка ошибок распаковки
    gunzip.on('error', (error) => {
        console.error('Error during decompression:', error.message);
        process.exit(1);
    });
    
    // Обработка ошибок записи
    writeStream.on('error', (error) => {
        console.error('Error writing file:', error.message);
        process.exit(1);
    });
    
    // Обработка завершения записи
    writeStream.on('finish', () => {
        console.log('File has been decompressed successfully');
    });
};

await decompress();