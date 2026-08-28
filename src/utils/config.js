export const config = {
    baseUrl: 'https://sapi.dramaboxdb.com',
    webficUrl: 'https://www.webfic.com',

    defaultLanguage: 'en',

    version: '490',
    userAgent: 'okhttp/4.10.0',
    timeout: 30000,
    maxRetries: 3,
    cacheTTL: 300,
    tokenCacheTTL: 3600,
    requestDelay: 1000
};

export function getConfig() {
    return { ...config };
}

export function updateConfig(newConfig) {
    Object.assign(config, newConfig);
}
