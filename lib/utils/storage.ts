



class MemoryStorage {
    private storage: Record<string, any> = {};

    set(key: string, value: any): void {
        this.storage[key] = value;
    }

    get<T = any>(key: string): T | null {
        return this.storage[key] || null;
    }

    remove(key: string): void {
        delete this.storage[key];
    }

    clear(): void {
        this.storage = {};
    }
}

export const tempStorage = new MemoryStorage();