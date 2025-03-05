export type RequestOptions = Omit<RequestInit, 'credentials' | 'mode'> & {
  headers?: Record<string, string>;
};

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
} 