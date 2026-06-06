class StorageWrapper {
  private readonly storage?: Storage;

  constructor(type: 'local' | 'session') {
    if (typeof window !== 'undefined') {
      try {
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage;
      } catch (error) {
        console.error(error);
      }
    }
  }

  get length(): number {
    return this.storage?.length ?? 0;
  }

  get<T>(key: string): T | undefined {
    if (!this.storage) return;

    try {
      const value = this.storage.getItem(key);
      if (value === null) return;

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(error);
    }
  }

  getOrDefault<T>(key: string, defaultValue: T): T {
    const value = this.get<T>(key);
    return value ?? defaultValue;
  }

  set(key: string, value: unknown): void {
    if (!this.storage) return;

    try {
      const stringValue = JSON.stringify(value);
      this.storage.setItem(key, stringValue);
    } catch (error) {
      console.error(error);
    }
  }

  remove(key: string): void {
    this.storage?.removeItem(key);
  }

  clear(): void {
    this.storage?.clear();
  }

  has(key: string): boolean {
    if (!this.storage) return false;
    return this.storage.getItem(key) !== null;
  }
}

export const localStorageWrapper = new StorageWrapper('local');
export const sessionStorageWrapper = new StorageWrapper('session');
