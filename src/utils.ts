export function require(path: string) {
    const module = new URL(`${path}`, import.meta.url).href;
    return module;
};