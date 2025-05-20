import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    // Получаем количество логических ядер процессора
    const numCPUs = cpus().length;
    
    // Создаем массив для хранения промисов
    const workers = [];
    
    // Создаем worker thread для каждого ядра
    for (let i = 0; i < numCPUs; i++) {
        const worker = new Worker(join(__dirname, 'worker.js'));
        const n = 10 + i; // Начинаем с 10 и увеличиваем для каждого worker
        
        // Создаем промис для каждого worker
        const workerPromise = new Promise((resolve) => {
            worker.on('message', (result) => {
                resolve(result);
                worker.terminate();
            });
            
            worker.on('error', () => {
                resolve({ status: 'error', data: null });
                worker.terminate();
            });
            
            // Отправляем число в worker
            worker.postMessage(n);
        });
        
        workers.push(workerPromise);
    }
    
    // Ждем завершения всех worker threads
    const results = await Promise.all(workers);
    console.log(results);
};

await performCalculations();