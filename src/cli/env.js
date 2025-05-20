const parseEnv = () => {
    const MITSO_VARS = Object.entries(process.env)
        .filter(([key]) => key.startsWith('MITSO_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    if (MITSO_VARS) {
        console.log(MITSO_VARS);
    }
};

parseEnv();