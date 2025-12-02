import { mockClient } from './mock';
import { httpClient } from './http';
import { CONFIG } from '../lib/config';
import { ApiClient } from './types';

// Factory pattern to switch between Mock and Real API based on config
export const client: ApiClient = CONFIG.SOURCE === 'api' ? httpClient : mockClient;