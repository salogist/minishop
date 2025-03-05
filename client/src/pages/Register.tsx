import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { PasswordStrength, isPasswordValid } from '../components/auth/PasswordStrength';
import PageTransition from '../components/PageTransition';
import { setCredentials } from '../store/slices/authSlice';
import api from '../services/api';
import { UserResponse } from '../types/api';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!isPasswordValid(formData.password)) {
      toast.error('لطفاً یک رمز عبور قوی‌تر انتخاب کنید');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('رمز عبور و تکرار آن مطابقت ندارند');
      return false;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      toast.error('لطفاً یک ایمیل معتبر وارد کنید');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await api.post<UserResponse>('/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      dispatch(setCredentials(data));
      toast.success('ثبت نام با موفقیت انجام شد');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              ثبت نام در فروشگاه
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              قبلاً ثبت نام کرده‌اید؟{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                وارد شوید
              </Link>
            </p>
          </motion.div>

          <motion.form 
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="نام و نام خانوادگی"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="ایمیل"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="رمز عبور"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="تکرار رمز عبور"
              />
            </div>

            <PasswordStrength password={formData.password} />

            <motion.button
              type="submit"
              disabled={loading || !isPasswordValid(formData.password)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'در حال ثبت نام...' : 'ثبت نام'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register; 