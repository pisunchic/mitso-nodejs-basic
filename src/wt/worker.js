import { parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    // Получаем данные из основного потока
    parentPort.on('message', (n) => {
        try {
            // Вычисляем n-ое число Фибоначчи
            const result = nthFibonacci(n);
            // Отправляем результат в основной поток
            parentPort.postMessage({ status: 'resolved', data: result });
        } catch (error) {
            // В случае ошибки отправляем статус error
            parentPort.postMessage({ status: 'error', data: null });
        }
    });
};

sendResult();