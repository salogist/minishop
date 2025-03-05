import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 29000; // هزینه ارسال ثابت
  const finalPrice = totalPrice + shippingCost;

  const handleQuantityChange = (id: string, color: string | undefined, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, color, quantity }));
    } else {
      dispatch(removeFromCart({ id, color }));
    }
  };

  const handleRemoveItem = (id: string, color: string | undefined) => {
    dispatch(removeFromCart({ id, color }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <AnimatedSection delay={0.1}>
          <div className="text-center px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
            <Link
              to="/products"
              className="inline-block bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-primary-700 text-sm sm:text-base"
            >
              مشاهده محصولات
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <AnimatedSection delay={0.1}>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">سبد خرید</h1>
            </AnimatedSection>

            <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
              <div className="lg:col-span-7">
                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {cartItems.map((item, index) => (
                    <AnimatedSection key={`${item.id}-${item.color}`} delay={0.2 + index * 0.1}>
                      <li className="flex py-4 sm:py-6">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="mr-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="mr-4">{item.price.toLocaleString('fa-IR')} تومان</p>
                            </div>
                            {item.color && (
                              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                رنگ:{' '}
                                <span
                                  className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full align-middle mr-1"
                                  style={{ backgroundColor: item.color }}
                                ></span>
                              </p>
                            )}
                          </div>
                          <div className="flex flex-1 items-end justify-between text-xs sm:text-sm">
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-600"
                                onClick={() =>
                                  handleQuantityChange(item.id, item.color, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    item.color,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="mx-2 w-12 sm:w-16 rounded-md border-gray-300 text-center focus:border-primary-500 focus:ring-primary-500"
                              />
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-600"
                                onClick={() =>
                                  handleQuantityChange(item.id, item.color, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              className="font-medium text-primary-600 hover:text-primary-500"
                              onClick={() => handleRemoveItem(item.id, item.color)}
                            >
                              <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </li>
                    </AnimatedSection>
                  ))}
                </ul>
              </div>

              <AnimatedSection delay={0.4}>
                <div className="mt-8 sm:mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">خلاصه سفارش</h2>

                  <dl className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-xs sm:text-sm text-gray-600">جمع سبد خرید</dt>
                      <dd className="text-xs sm:text-sm font-medium text-gray-900">
                        {totalPrice.toLocaleString('fa-IR')} تومان
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 sm:pt-4">
                      <dt className="text-xs sm:text-sm text-gray-600">هزینه ارسال</dt>
                      <dd className="text-xs sm:text-sm font-medium text-gray-900">
                        {shippingCost.toLocaleString('fa-IR')} تومان
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 sm:pt-4">
                      <dt className="text-sm sm:text-base font-medium text-gray-900">مبلغ قابل پرداخت</dt>
                      <dd className="text-sm sm:text-base font-medium text-gray-900">
                        {finalPrice.toLocaleString('fa-IR')} تومان
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      ادامه فرآیند خرید
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart; 