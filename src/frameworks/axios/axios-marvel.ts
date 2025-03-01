import axios from 'axios';

export const axiosMarvel = axios.create({
  baseURL: 'https://gateway.marvel.com',
  params: {
    ts: 1,
    apikey: import.meta.env.VITE_MARVEL_API_KEY,
    hash: import.meta.env.VITE_MARVEL_API_HASH,
  },
});
