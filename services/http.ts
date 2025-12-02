import { ApiClient } from './types';
import { CONFIG } from '../lib/config';

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}${path}`, {
      ...options,
      headers: { ...headers(), ...options?.headers }
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    
    // For 204 No Content
    if (response.status === 204) return undefined as any;
    
    return response.json();
  } catch (error) {
    console.error("HTTP Request Failed:", error);
    throw error;
  }
};

export const httpClient: ApiClient = {
  clubs: {
    getAll: () => request('/clubs'),
    getById: (id) => request(`/clubs/${id}`),
    update: (id, data) => request(`/clubs/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
  },
  news: {
    getAll: () => request('/news'),
    create: (item) => request('/news', { method: 'POST', body: JSON.stringify(item) }),
    delete: (id) => request(`/news/${id}`, { method: 'DELETE' })
  },
  features: {
    getAll: () => request('/features')
  },
  auth: {
    login: async (password) => {
       const res = await request<{success: boolean, token?: string}>('/auth/login', { 
           method: 'POST', 
           body: JSON.stringify({ password }) 
       });
       if (res.token) localStorage.setItem('token', res.token);
       return res;
    },
    logout: async () => {
        localStorage.removeItem('token');
    }
  }
};