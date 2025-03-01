import '@testing-library/jest-dom';
import IndexedDBMock from './src/frameworks/ui/mocks/indexe-db-mock';
// Polyfill for TextEncoder and TextDecoder
import { TextEncoder } from 'util';
import { cleanup } from '@testing-library/react';

global.TextEncoder = TextEncoder;

// Mock the global indexedDB with IndexedDBMock
global.indexedDB = IndexedDBMock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    location: { pathname: '/' },
  }),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  }),
  useParams: () => ({}),
  useRouteMatch: () => ({ path: '/', url: '/', isExact: true, params: {} }),
}));

jest.mock('./src/frameworks/axios/axios-marvel', () => ({
  axiosMarvel: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  cleanup();
});
