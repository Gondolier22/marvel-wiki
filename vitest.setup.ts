import '@testing-library/jest-dom';
import IndexedDBMock from './src/frameworks/ui/mocks/indexe-db-mock';

// Mock the global indexedDB with IndexedDBMock
global.indexedDB = IndexedDBMock;
