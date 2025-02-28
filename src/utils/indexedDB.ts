import { Character } from '../models/character';

const DB_NAME = 'MarvelWikiDB';
const DB_VERSION = 1;
const STORE_NAME = 'favorites';

let db: IDBDatabase;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addFavorite = async (favorite: Pick<Character, 'id' | 'name' | 'avatarUrl'>) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.add(favorite);
  transaction.oncomplete = () => {
    document.dispatchEvent(new Event('favoritesUpdated'));
  };
};

export const removeFavorite = async (id: number) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
  transaction.oncomplete = () => {
    document.dispatchEvent(new Event('favoritesUpdated'));
  };
};

export const getFavoritesCount = async (): Promise<number> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.count();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
