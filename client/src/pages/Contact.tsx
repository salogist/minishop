import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
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
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                تماس با ما
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                ما همیشه آماده شنیدن نظرات، پیشنهادات و انتقادات شما هستیم.
                تیم پشتیبانی ما در اسرع وقت به پیام شما پاسخ خواهد داد.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20 p-8 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mx-auto h-12 w-12 text-primary-600"
                >
                  <item.icon className="h-12 w-12" aria-hidden="true" />
                </motion.div>
                <h3 className="mt-6 text-base font-semibold text-gray-900">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8"
        >
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                فرم تماس با ما
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      شماره تماس
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      موضوع
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    پیام
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="text-left">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    ارسال پیام
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8"
        >
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9627430847677!2d51.41978847619063!3d35.7007087288866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e011c5541c055%3A0x8120592b5914c0b3!2sValiasr%20St%2C%20Tehran%2C%20Iran!5e0!3m2!1sen!2s!4v1709571547744!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Contact; 