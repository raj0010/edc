
import { Club, FeatureItem, NewsItem } from '../types';

export interface AuthResponse {
  success: boolean;
  token?: string;
}

export interface ClubService {
  getAll: () => Promise<Club[]>;
  getById: (id: string) => Promise<Club | null>;
  update: (id: string, data: Partial<Club>) => Promise<Club>;
}

export interface NewsService {
  getAll: () => Promise<NewsItem[]>;
  create: (item: NewsItem) => Promise<NewsItem>;
  delete: (id: string) => Promise<void>;
}

export interface FeatureService {
  getAll: () => Promise<FeatureItem[]>;
}

export interface AuthService {
  login: (password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// The Main Client Interface
export interface ApiClient {
  clubs: ClubService;
  news: NewsService;
  features: FeatureService;
  auth: AuthService;
}
