class IndexedDBMock {
  private store: { [key: string]: unknown } = {};

  async getItem(key: string): Promise<unknown> {
    return this.store[key] || null;
  }

  async setItem(key: string, value: unknown): Promise<void> {
    this.store[key] = value;
  }

  async removeItem(key: string): Promise<void> {
    delete this.store[key];
  }

  async clear(): Promise<void> {
    this.store = {};
  }

  cmp(): number {
    // Mock implementation
    return 0;
  }

  databases(): Promise<IDBDatabaseInfo[]> {
    // Mock implementation
    return Promise.resolve([]);
  }

  deleteDatabase(): IDBOpenDBRequest {
    // Mock implementation
    return {} as IDBOpenDBRequest;
  }

  open(): IDBOpenDBRequest {
    // Mock implementation
    return {} as IDBOpenDBRequest;
  }

  searchFavorites(): Promise<unknown> {
    // Mock implementation
    return Promise.resolve([]);
  }

  getFavoritesCount(): Promise<number> {
    // Mock implementation
    return Promise.resolve(5);
  }
}

export default new IndexedDBMock();
