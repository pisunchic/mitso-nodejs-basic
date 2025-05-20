const parseArgs = () => {
    // Получаем все аргументы командной строки, начиная с индекса 2
    // (0 - путь к node, 1 - путь к скрипту)
    const args = process.argv.slice(2);
    const result = [];

    // Обрабатываем аргументы парами (--propName value)
    for (let i = 0; i < args.length; i += 2) {
        const propName = args[i].replace('--', ''); // Убираем префикс --
        const value = args[i + 1];
        if (propName && value) {
            result.push(`${propName} is ${value}`);
        }
    }

    // Выводим результат
    console.log(result.join(', '));
};

parseArgs();