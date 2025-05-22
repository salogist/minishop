import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProduct, setLoading, setError } from '../store/slices/productSlice';
import { Product } from '../types/product';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';
import Image from '../components/Image';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    brand: 'apple',
    price: 45000000,
    description: 'گوشی هوشمند اپل با دوربین حرفه‌ای و پردازنده قدرتمند',
    images: ['/images/products/iphone-16-pro-finish-select-202409-6-3inch_GEO_EMEA_FMT_WHH.jpeg'],
    specifications: {
      screen: '6.1 inch',
      processor: 'A15 Bionic',
      ram: '6GB',
      storage: '128GB',
      camera: '12MP Triple Camera',
      battery: '3095mAh'
    },
    inStock: true,
    rating: 4.8,
    numReviews: 120,
    stock: 10,
    colors: ['graphite', 'gold', 'silver', 'sierra-blue']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S21',
    brand: 'samsung',
    price: 35000000,
    description: 'گوشی هوشمند سامسونگ با طراحی مدرن و دوربین پیشرفته',
    images: ['/images/products/Samsung-Galaxy-S25-Ultra-colors-1024x650.jpg'],
    specifications: {
      screen: '6.2 inch',
      processor: 'Exynos 2100',
      ram: '8GB',
      storage: '128GB',
      camera: '12MP Triple Camera',
      battery: '4000mAh'
    },
    inStock: true,
    rating: 4.6,
    numReviews: 85,
    stock: 15,
    colors: ['graphite', 'gold', 'silver', 'sierra-blue']
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      // شبیه‌سازی API call
      setTimeout(() => {
        const foundProduct = sampleProducts.find(p => p.id === id);
        if (foundProduct) {
          dispatch(setProduct(foundProduct));
        } else {
          dispatch(setError('محصول مورد نظر یافت نشد'));
        }
      }, 500);
    } catch (error) {
      dispatch(setError('خطا در بارگذاری اطلاعات محصول'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری اطلاعات محصول...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center text-red-600">
          <p>{error || 'محصول مورد نظر یافت نشد'}</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-lg p-4">
              <div className="relative h-64 sm:h-80 md:h-96">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="mr-1">{product.rating}</span>
                  <span className="text-gray-500">({product.numReviews} نظر)</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'موجود' : 'ناموجود'}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {product.price.toLocaleString()} تومان
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">مشخصات فنی</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-600 block text-sm">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.colors && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">رنگ‌های موجود</h2>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!product.inStock}
              >
                {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail; 