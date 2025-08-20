export default class DictionaryCache<T> {
    private cache: Map<string, T>;

    constructor() {
        this.cache = new Map<string, T>();
    }

    public add(key : string, value : T) : void {
        this.cache.set(key, value);
    }

    public get(key : string) : T | undefined {
        return this.cache.get(key);
    }

    public has(key : string) : boolean {
        return this.cache.has(key);
    }

    public remove(key : string) : void {
        this.cache.delete(key);
    }

    public clear() {
        this.cache.clear();
    }

    public entries(): [string, T][] {
        return Array.from(this.cache.entries());
    }
}
