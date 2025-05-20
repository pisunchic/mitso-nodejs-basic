import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    // Создаем дочерний процесс
    const childProcess = spawn('node', [join(__dirname, 'script.js'), ...args], {
        stdio: ['inherit', 'inherit', 'inherit'] // Наследуем stdin, stdout и stderr
    });
    
    // Обработка ошибок дочернего процесса
    childProcess.on('error', (error) => {
        console.error('Child process error:', error);
        process.exit(1);
    });
    
    // Обработка завершения дочернего процесса
    childProcess.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Child process exited with code ${code}`);
            process.exit(code);
        }
    });
};

// Пример использования
spawnChildProcess(['arg1', 'arg2']);
