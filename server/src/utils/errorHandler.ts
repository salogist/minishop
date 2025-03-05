import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const createError = (message: string, status: number = 500, data?: any): ApiError => 
  new ApiError(message, status, data);

export const handleAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('Error:', error);
    
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        message: error.message,
        data: error.data,
      });
    }

    res.status(500).json({
      message: error.message || 'خطای سرور',
    });
  });
}; 