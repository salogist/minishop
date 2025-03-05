import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { setProduct, clearProduct, setLoading, setError } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState('');

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'خطا در دریافت اطلاعات محصول');
        }

        dispatch(setProduct(data));
        if (data.colors.length > 0) {
          setSelectedColor(data.colors[0].code);
        }
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'خطا در دریافت اطلاعات محصول'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduct();

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        color: selectedColor,
      })
    );
    toast.success('محصول به سبد خرید اضافه شد');
  };

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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product gallery */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product details */}
        <div className="lg:col-start-2 lg:max-w-lg lg:self-start">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-gray-500">{product.description}</p>
          </div>

          <section aria-labelledby="information-heading" className="mt-8">
            <h2 id="information-heading" className="sr-only">
              اطلاعات محصول
            </h2>

            <div className="mt-4 space-y-6">
              <p className="text-2xl text-gray-900">{product.price.toLocaleString('fa-IR')} تومان</p>

              {/* Specifications */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">مشخصات فنی</h3>

                <div className="mt-4 space-y-6">
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">صفحه نمایش</dt>
                      <dd className="text-sm text-gray-900">
                        {product.specifications.screen.size} - {product.specifications.screen.resolution}
                      </dd>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <dt className="text-sm text-gray-600">دوربین</dt>
                      <dd className="text-sm text-gray-900">
                        اصلی: {product.specifications.camera.main} | سلفی: {product.specifications.camera.selfie}
                      </dd>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <dt className="text-sm text-gray-600">باتری</dt>
                      <dd className="text-sm text-gray-900">
                        {product.specifications.battery.capacity} - {product.specifications.battery.type}
                      </dd>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <dt className="text-sm text-gray-600">حافظه</dt>
                      <dd className="text-sm text-gray-900">
                        رم: {product.specifications.storage.ram} | داخلی: {product.specifications.storage.internal}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">رنگ‌ها</h3>
                  <div className="mt-4 flex items-center space-x-3 space-x-reverse">
                    {product.colors.map((color) => (
                      <button
                        key={color.code}
                        className={`relative h-8 w-8 rounded-full ${
                          selectedColor === color.code
                            ? 'ring-2 ring-primary-500 ring-offset-2'
                            : 'ring-1 ring-gray-200'
                        }`}
                        style={{ backgroundColor: color.code }}
                        onClick={() => setSelectedColor(color.code)}
                      >
                        <span className="sr-only">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:max-w-lg lg:self-start">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'ناموجود' : 'افزودن به سبد خرید'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 