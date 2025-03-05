import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'خطا در دریافت اطلاعات سفارش');
        }

        setOrder(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'خطا در دریافت اطلاعات سفارش');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrder();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری اطلاعات سفارش...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center text-red-600">
          <p>{error || 'سفارش مورد نظر یافت نشد'}</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'در انتظار پردازش';
      case 'processing':
        return 'در حال پردازش';
      case 'shipped':
        return 'ارسال شده';
      case 'delivered':
        return 'تحویل داده شده';
      case 'cancelled':
        return 'لغو شده';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            جزئیات سفارش #{order.id}
          </h1>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تاریخ ثبت سفارش:</p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                </p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">آدرس تحویل</h3>
              <div className="mt-4 text-sm text-gray-600">
                <p>{order.shippingAddress.fullName}</p>
                <p className="mt-1">{order.shippingAddress.address}</p>
                <p className="mt-1">
                  {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                </p>
                <p className="mt-1">{order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">اقلام سفارش</h3>
              <div className="mt-4">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
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
                              <h4>{item.name}</h4>
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
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>جمع کل</p>
                <p>{order.totalAmount.toLocaleString('fa-IR')} تومان</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 