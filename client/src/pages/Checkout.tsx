import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 29000; // هزینه ارسال ثابت
  const finalPrice = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('لطفاً ابتدا وارد حساب کاربری خود شوید');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('سبد خرید شما خالی است');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          totalPrice: finalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در ثبت سفارش');
      }

      dispatch(clearCart());
      toast.success('سفارش شما با موفقیت ثبت شد');
      navigate(`/orders/${data.orderId}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطا در ثبت سفارش');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
          <button
            onClick={() => navigate('/products')}
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            مشاهده محصولات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <h2 className="text-lg font-medium text-gray-900">اطلاعات ارسال</h2>

            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  آدرس
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  شهر
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  کد پستی
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  شماره تماس
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'در حال ثبت سفارش...' : 'ثبت سفارش'}
              </button>
            </form>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">خلاصه سفارش</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6 px-4 sm:px-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="mr-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="mr-4">{item.price.toLocaleString('fa-IR')} تومان</p>
                        </div>
                        {item.color && (
                          <p className="mt-1 text-sm text-gray-500">
                            رنگ:{' '}
                            <span
                              className="inline-block w-4 h-4 rounded-full align-middle mr-1"
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </p>
                        )}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">تعداد: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">جمع سبد خرید</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {totalPrice.toLocaleString('fa-IR')} تومان
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">هزینه ارسال</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {shippingCost.toLocaleString('fa-IR')} تومان
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">مبلغ قابل پرداخت</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {finalPrice.toLocaleString('fa-IR')} تومان
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 