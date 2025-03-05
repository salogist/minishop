import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProduct, setLoading, setError } from '../store/slices/productSlice';
import { Product } from '../types/product';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';
import Image from '../components/Image';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      // Simulate API call
      setTimeout(() => {
        const foundProduct = sampleProducts.find(p => p.id === id);
        if (foundProduct) {
          dispatch(setProduct(foundProduct));
        } else {
          dispatch(setError('محصول مورد نظر یافت نشد'));
        }
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      dispatch(setError('خطا در بارگذاری اطلاعات محصول'));
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
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product gallery */}
            <AnimatedSection delay={0.1}>
              <div className="lg:max-w-lg lg:self-end">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
                    {product.images.slice(1).map((image, index) => (
                      <div key={index} className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`${product.name} - تصویر ${index + 2}`}
                          className="h-full w-full object-cover object-center"
                          sizes="(max-width: 768px) 25vw, 12vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Product details */}
            <AnimatedSection delay={0.2}>
              <div className="mt-8 lg:mt-0 lg:mr-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
                <div className="mt-3">
                  <h2 className="sr-only">مشخصات محصول</h2>
                  <p className="text-2xl sm:text-3xl tracking-tight text-gray-900">{product.price.toLocaleString()} تومان</p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">توضیحات</h3>
                  <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-700">{product.description}</div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="button"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    افزودن به سبد خرید
                  </button>
                </div>

                <div className="mt-8 sm:mt-10">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">مشخصات فنی</h3>
                  <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm sm:text-base">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <li key={key} className="text-gray-400">
                          <span className="text-gray-600">{key}:</span>{' '}
                          {typeof value === 'object' ? JSON.stringify(value) : value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail; 