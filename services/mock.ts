import { ApiClient } from './types';
import { clubsData } from '../backend/data/clubs';
import { featuresData } from '../backend/data/features';
import { initialNews } from '../backend/data/news';
import { Club, NewsItem } from '../types';
import { CONFIG } from '../lib/config';

// In-memory store for the session (Simulating a database)
let _clubs = [...clubsData];
let _news = [...initialNews];

const delay = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), CONFIG.MOCK_DELAY);
  });
};

export const mockClient: ApiClient = {
  clubs: {
    getAll: () => delay([..._clubs]),
    getById: (id) => delay(_clubs.find(c => c.id === id) || null),
    update: (id, data) => {
      _clubs = _clubs.map(c => c.id === id ? { ...c, ...data } : c);
      return delay(_clubs.find(c => c.id === id) as Club);
    }
  },
  
  news: {
    getAll: () => delay([..._news]),
    create: (item) => {
      _news = [item, ..._news];
      return delay(item);
    },
    delete: (id) => {
      _news = _news.filter(n => n.id !== id);
      return delay(undefined);
    }
  },

  features: {
    getAll: () => delay([...featuresData])
  },

  auth: {
    login: (password) => {
      // In mock mode, we still check the hardcoded password
      const success = password === 'nexus2024';
      return delay({ success, token: success ? 'mock-token-123' : undefined });
    },
    logout: () => delay(undefined)
  }
};