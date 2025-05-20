import { Transform } from 'stream';

const transform = async () => {
    // Создаем Transform Stream для переворота текста
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            // Преобразуем chunk в строку, переворачиваем и отправляем дальше
            const reversedText = chunk.toString().split('').reverse().join('');
            callback(null, reversedText);
        }
    });
    
    // Подключаем цепочку потоков: stdin -> transform -> stdout
    process.stdin
        .pipe(reverseTransform)
        .pipe(process.stdout);
    
    // Обработка ошибок
    reverseTransform.on('error', (error) => {
        console.error('Error during transformation:', error.message);
        process.exit(1);
    });
};

await transform();