import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts, setLoading, setError } from '../store/slices/productSlice';
import { Product } from '../types/product';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';
import Image from '../components/Image';
import { Link } from 'react-router-dom';

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

  const filteredProducts = selectedBrand
    ? products.filter(product => product.brand === selectedBrand)
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
                      {product.stock > 0 ? 'موجود' : 'ناموجود'}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <AnimatedSection delay={0.4}>
            <div className="text-center py-12">
              <p className="text-gray-600">محصولی یافت نشد</p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </PageTransition>
  );
};

export default Products; 