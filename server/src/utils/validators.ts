import { createError } from './errorHandler';

interface UserInput {
  name?: string;
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;

export const validateUserInput = ({ name, email, password }: UserInput): void => {
  if (!name || !email || !password) {
    throw createError('لطفاً تمام فیلدها را پر کنید', 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw createError('لطفاً یک ایمیل معتبر وارد کنید', 400);
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    throw createError(`رمز عبور باید حداقل ${PASSWORD_MIN_LENGTH} کاراکتر باشد`, 400);
  }
}; 