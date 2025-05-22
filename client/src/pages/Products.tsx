import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts, setLoading, setError } from '../store/slices/productSlice';
import { Product } from '../types/product';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';
import Image from '../components/Image';
import { Link } from 'react-router-dom';

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
    rating: 4.8,
    numReviews: 120,
    stock: 10,
    colors: ['graphite', 'gold', 'silver', 'sierra-blue'],
    createdAt: '',
    updatedAt: '',
    inStock: true
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
    rating: 4.6,
    numReviews: 85,
    stock: 15,
    colors: ['phantom-gray', 'phantom-white', 'phantom-violet'],
    createdAt: '',
    updatedAt: '',
    inStock: true
  },
  {
    id: '3',
    name: 'Xiaomi Mi 11',
    brand: 'xiaomi',
    price: 25000000,
    description: 'گوشی شیائومی با دوربین قوی و باتری پرقدرت',
    images: ['/images/products/mi-11.jpg'],
    specifications: {
      screen: '6.81 inch',
      processor: 'Snapdragon 888',
      ram: '8GB',
      storage: '128GB',
      camera: '108MP Triple Camera',
      battery: '4600mAh'
    },
    rating: 4.5,
    numReviews: 60,
    stock: 20,
    colors: ['black', 'white', 'blue'],
    createdAt: '',
    updatedAt: '',
    inStock: true,
  }

];

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

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

  const filteredProducts: Product[] = selectedBrand
    ? products.filter((product: Product) => product.brand === selectedBrand)
    : products;

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <AnimatedSection delay={0.1}>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">محصولات</h1>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            <button
              onClick={() => setSelectedBrand(null)}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                selectedBrand === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              همه
            </button>
            {['apple', 'samsung', 'xiaomi', 'huawei'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                  selectedBrand === brand
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand === 'apple' ? 'اپل' : brand === 'samsung' ? 'سامسونگ' : brand === 'xiaomi' ? 'شیائومی' : 'هواوی'}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection
              key={product.id}
              delay={0.3 + index * 0.1}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-48 sm:h-56 lg:h-64">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Products;