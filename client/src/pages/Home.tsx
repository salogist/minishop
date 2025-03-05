import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts, setLoading, setError } from '../store/slices/productSlice';
import { Product } from '../types/product';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  TruckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Image from '../components/Image';
const categories = [
  {
    id: 1,
    name: 'گوشی‌های اپل',
    image: '/images/categories/apple.webp',
    href: '/products?brand=apple',
  },
  {
    id: 2,
    name: 'گوشی‌های سامسونگ',
    image: '/images/categories/samsung.webp',
    href: '/products?brand=samsung',
  },
  {
    id: 3,
    name: 'گوشی‌های شیائومی',
    image: '/images/categories/xiaomi.webp',
    href: '/products?brand=xiaomi',
  },
  {
    id: 4,
    name: 'سایر برندها',
    image: '/images/categories/other.webp',
    href: '/products',
  },
];

const features = [
  {
    name: 'ضمانت اصالت کالا',
    description: 'تمامی محصولات دارای ضمانت اصالت و گارانتی معتبر هستند',
    icon: ShieldCheckIcon,
  },
  {
    name: 'ارسال سریع',
    description: 'ارسال سریع به تمام نقاط کشور با بسته‌بندی استاندارد',
    icon: TruckIcon,
  },
  {
    name: 'قیمت رقابتی',
    description: 'بهترین قیمت‌ها با تضمین برگشت وجه در صورت یافتن قیمت پایین‌تر',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'پشتیبانی ۲۴/۷',
    description: 'پشتیبانی شبانه‌روزی و مشاوره تخصصی قبل و بعد از خرید',
    icon: PhoneIcon,
  },
];

// محصولات نمونه
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'آیفون 16 پرو مکس',
    brand: 'apple',
    price: 89900000,
    images: ['/images/products/iphone-16-pro-finish-select-202409-6-3inch_GEO_EMEA_FMT_WHH.jpeg'],
    description: 'جدیدترین گوشی اپل با دوربین 48 مگاپیکسلی و پردازنده A16',
    specifications: {
      screen: {
        size: '6.7 اینچ',
        resolution: '2796 × 1290',
        technology: 'Super Retina XDR OLED',
      },
      camera: {
        main: '48 مگاپیکسل',
        selfie: '12 مگاپیکسل',
        features: ['حالت سینمایی', 'عکاسی شب', 'پرتره پیشرفته'],
      },
      battery: {
        capacity: '4323 میلی‌آمپر ساعت',
        type: 'لیتیوم-یون',
        features: ['شارژ سریع', 'شارژ بی‌سیم MagSafe'],
      },
      storage: {
        ram: '6 گیگابایت',
        internal: '256 گیگابایت',
        card: 'ندارد',
      },
      processor: {
        chipset: 'Apple A16 Bionic',
        cpu: '6 هسته‌ای',
        gpu: '5 هسته‌ای',
      },
    },
    stock: 10,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'طلایی', code: '#FFD700' },
      { name: 'نقره‌ای', code: '#C0C0C0' },
      { name: 'بنفش', code: '#800080' },
    ],
    inStock: true,
    isFeatured: true,
    category: 'apple',
    rating: 4.9,
    numReviews: 128,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: ' گلکسی اولترا',
    brand: 'samsung',
    price: 75900000,
    images: ['/images/products/Samsung-Galaxy-S25-Ultra-colors-1024x650.jpg'],
    description: 'پرچمدار سامسونگ با قلم S Pen و دوربین 200 مگاپیکسلی',
    specifications: {
      screen: {
        size: '6.8 اینچ',
        resolution: '3088 × 1440',
        technology: 'Dynamic AMOLED 2X',
      },
      camera: {
        main: '200 مگاپیکسل',
        selfie: '12 مگاپیکسل',
        features: ['زوم اپتیکال 10x', 'لرزشگیر اپتیکال', 'فیلمبرداری 8K'],
      },
      battery: {
        capacity: '5000 میلی‌آمپر ساعت',
        type: 'لیتیوم-یون',
        features: ['شارژ سریع 45 وات', 'شارژ بی‌سیم'],
      },
      storage: {
        ram: '12 گیگابایت',
        internal: '256 گیگابایت',
        card: 'پشتیبانی از کارت حافظه تا 1 ترابایت',
      },
      processor: {
        chipset: 'Snapdragon 8 Gen 2',
        cpu: '8 هسته‌ای',
        gpu: 'Adreno 740',
      },
    },
    stock: 15,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'کرم', code: '#F5DEB3' },
      { name: 'سبز', code: '#008000' },
      { name: 'بنفش', code: '#800080' },
    ],
    inStock: true,
    isFeatured: true,
    category: 'samsung',
    rating: 4.8,
    numReviews: 95,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'شیائومی 13 پرو',
    brand: 'xiaomi',
    price: 45900000,
    images: ['/images/products/Xiaomi-15-Ultra.jpg'],
    description: 'همکاری شیائومی با لایکا برای دوربین‌های حرفه‌ای',
    specifications: {
      screen: {
        size: '6.73 اینچ',
        resolution: '3200 × 1440',
        technology: 'AMOLED LTPO',
      },
      camera: {
        main: '50 مگاپیکسل',
        selfie: '32 مگاپیکسل',
        features: ['لنز لایکا', 'حالت شب', 'پرتره حرفه‌ای'],
      },
      battery: {
        capacity: '4820 میلی‌آمپر ساعت',
        type: 'لیتیوم-پلیمر',
        features: ['شارژ سریع 120 وات', 'شارژ بی‌سیم 50 وات'],
      },
      storage: {
        ram: '12 گیگابایت',
        internal: '256 گیگابایت',
        card: 'ندارد',
      },
      processor: {
        chipset: 'Snapdragon 8 Gen 2',
        cpu: '8 هسته‌ای',
        gpu: 'Adreno 740',
      },
    },
    stock: 8,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'سفید', code: '#FFFFFF' },
      { name: 'سبز', code: '#008000' },
    ],
    inStock: true,
    isFeatured: true,
    category: 'xiaomi',
    rating: 4.7,
    numReviews: 64,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'هواوی P60 پرو',
    brand: 'huawei',
    price: 52900000,
    images: ['/images/products/Huawei-P70-teaser-image.jpg'],
    description: 'جدیدترین پرچمدار هواوی با دوربین‌های قدرتمند',
    specifications: {
      screen: {
        size: '6.67 اینچ',
        resolution: '2700 × 1220',
        technology: 'OLED',
      },
      camera: {
        main: '48 مگاپیکسل',
        selfie: '13 مگاپیکسل',
        features: ['دیافراگم متغیر', 'ثبات تصویر اپتیکال', 'عکاسی شب'],
      },
      battery: {
        capacity: '4815 میلی‌آمپر ساعت',
        type: 'لیتیوم-پلیمر',
        features: ['شارژ سریع 88 وات', 'شارژ بی‌سیم 50 وات'],
      },
      storage: {
        ram: '8 گیگابایت',
        internal: '256 گیگابایت',
        card: 'پشتیبانی از کارت حافظه NM تا 256 گیگابایت',
      },
      processor: {
        chipset: 'Snapdragon 8+ Gen 1',
        cpu: '8 هسته‌ای',
        gpu: 'Adreno 730',
      },
    },
    stock: 0,
    colors: [
      { name: 'مشکی', code: '#000000' },
      { name: 'سفید', code: '#FFFFFF' },
      { name: 'طلایی', code: '#FFD700' },
    ],
    inStock: false,
    isFeatured: true,
    category: 'huawei',
    rating: 4.6,
    numReviews: 42,
    createdAt: new Date().toISOString(),
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      dispatch(setProducts({
        products: sampleProducts,
        page: 1,
        pages: 1,
        totalProducts: sampleProducts.length,
      }));
    } catch (error) {
      dispatch(setError('خطا در بارگذاری محصولات'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <PageTransition>
      <SEO
        title="صفحه اصلی"
        description="فروشگاه آنلاین موبایل - خرید انواع گوشی موبایل با بهترین قیمت و ضمانت اصالت"
        keywords="موبایل, گوشی موبایل, فروشگاه موبایل, اپل, سامسونگ, شیائومی, هواوی"
      />

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/main/iPhone-16-E-Feature-1.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">فروشگاه موبایل</h1>
                <p className="text-lg sm:text-xl mb-8">بهترین محصولات با بهترین قیمت</p>
                <Link
                  to="/products"
                  className="inline-block bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  مشاهده محصولات
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <AnimatedSection
                key={feature.name}
                delay={index * 0.1}
                direction="up"
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 sm:p-6">
                  <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary-500 text-white mb-3 sm:mb-4">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.name}</h2>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">دسته‌بندی محصولات</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <AnimatedSection
                key={category.id}
                delay={index * 0.1}
                direction="up"
                className="group relative h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg"
              >
                <Link to={`/products?category=${category.id}`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <h3 className="text-lg sm:text-xl font-bold p-3 sm:p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">محصولات ویژه</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {sampleProducts.map((product, index) => (
              <AnimatedSection
                key={product.id}
                delay={index * 0.1}
                direction="up"
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={85}
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold text-blue-600">
                        {product.price.toLocaleString()} تومان
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {product.stock > 0 ? 'موجود' : 'ناموجود'}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <AnimatedSection direction="up" delay={0.2}>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-8">
                آماده خرید هستید؟
              </h2>
              <p className="text-base sm:text-lg text-primary-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                با ثبت نام در فروشگاه ما، از مزایای ویژه‌ای مانند تخفیف‌های ویژه، ارسال رایگان و پشتیبانی ۲۴/۷ بهره‌مند شوید.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-xl text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-300"
              >
                ثبت نام کنید
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home; 