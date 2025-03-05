import { API_ENDPOINTS, RequestOptions } from '../types/api';

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  ENDPOINTS: {
    REGISTER: '/api/users/register',
    LOGIN: '/api/users/login',
  } as const,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  } as const,
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => 
  `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;

export const fetchApi = async <T>(
  endpoint: keyof typeof API_CONFIG.ENDPOINTS,
  options: RequestOptions = {}
): Promise<T> => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      credentials: 'include',
      mode: 'cors',
      ...options,
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'خطای سرور');
    
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('خطای ناشناخته');
  }
};

export default API_CONFIG; 