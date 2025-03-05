import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const contactInfo = [
  {
    name: 'شماره تماس',
    description: '۰۲۱-۱۲۳۴۵۶۷۸',
    icon: PhoneIcon,
  },
  {
    name: 'ایمیل',
    description: 'info@mobilestore.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'آدرس',
    description: 'تهران، خیابان ولیعصر، مرکز خرید موبایل',
    icon: MapPinIcon,
  },
  {
    name: 'ساعات کاری',
    description: 'شنبه تا پنجشنبه - ۹ صبح تا ۹ شب',
    icon: ClockIcon,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // اینجا می‌توانید لاجیک ارسال فرم را پیاده‌سازی کنید
    console.log('Form submitted:', formData);
    // پاک کردن فرم
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    // نمایش پیام موفقیت
    alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <AnimatedSection delay={0.1}>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">تماس با ما</h1>
            </AnimatedSection>

            <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
              {/* Contact Information */}
              <AnimatedSection delay={0.2} className="lg:col-span-5">
                <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">اطلاعات تماس</h2>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="mr-3">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">تلفن تماس</h3>
                        <p className="mt-1 text-sm sm:text-base text-gray-500">021-12345678</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="mr-3">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">ایمیل</h3>
                        <p className="mt-1 text-sm sm:text-base text-gray-500">info@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="mr-3">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">آدرس</h3>
                        <p className="mt-1 text-sm sm:text-base text-gray-500">
                          تهران، خیابان ولیعصر، خیابان فرشته، پلاک 123
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection delay={0.3} className="mt-8 lg:mt-0 lg:col-span-7">
                <div className="bg-white rounded-lg p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">فرم تماس</h2>
                  <form className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700">
                        شماره تماس
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700">
                        پیام
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        ارسال پیام
                      </button>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            </div>

            {/* Map */}
            <AnimatedSection delay={0.4} className="mt-8 sm:mt-12">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317.1234567890123!2d51.12345678901234!3d35.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDA3JzM0LjQiTiA1McKwMDcnMzQuNCJF!5e0!3m2!1sfa!2sir!4v1234567890123!5m2!1sfa!2sir"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact; 