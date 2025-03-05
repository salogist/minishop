import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts, setLoading, setError } from '../store/slices/productSlice';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import PageTransition from '../components/PageTransition';

const sortOptions = [
  { name: 'جدیدترین', value: 'newest' },
  { name: 'ارزان‌ترین', value: 'cheapest' },
  { name: 'گران‌ترین', value: 'expensive' },
];

const filters = [
  {
    id: 'brand',
    name: 'برند',
    options: [
      { value: 'apple', label: 'اپل' },
      { value: 'samsung', label: 'سامسونگ' },
      { value: 'xiaomi', label: 'شیائومی' },
      { value: 'huawei', label: 'هواوی' },
    ],
  },
  {
    id: 'price',
    name: 'محدوده قیمت',
    options: [
      { value: '0-5000000', label: 'تا ۵ میلیون تومان' },
      { value: '5000000-10000000', label: '۵ تا ۱۰ میلیون تومان' },
      { value: '10000000-20000000', label: '۱۰ تا ۲۰ میلیون تومان' },
      { value: '20000000-', label: 'بالای ۲۰ میلیون تومان' },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    brand: [],
    price: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'خطا در دریافت محصولات');
        }

        dispatch(setProducts(data));
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'خطا در دریافت محصولات'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = [...(prev[filterId] || [])];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return {
        ...prev,
        [filterId]: currentFilters,
      };
    });
  };

  const filteredProducts = products
    .filter((product) => {
      // جستجو بر اساس نام محصول
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // فیلتر بر اساس برند
      if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
        return false;
      }

      // فیلتر بر اساس قیمت
      if (selectedFilters.price.length > 0) {
        const productPrice = product.price;
        return selectedFilters.price.some((range) => {
          const [min, max] = range.split('-').map(Number);
          if (!max) {
            return productPrice >= min;
          }
          return productPrice >= min && productPrice <= max;
        });
      }

      return true;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'cheapest':
          return a.price - b.price;
        case 'expensive':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">محصولات</h1>

            <div className="flex items-center">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="جستجوی محصول..."
                />
              </div>

              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="mr-4 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="mr-4 inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FunnelIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                فیلترها
              </button>
            </div>
          </div>

          <div className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              {showFilters && (
                <form className="lg:block">
                  <h3 className="sr-only">فیلترها</h3>

                  {filters.map((section) => (
                    <div key={section.id} className="border-b border-gray-200 py-6">
                      <h3 className="flow-root -my-3">
                        <span className="font-medium text-gray-900">{section.name}</span>
                      </h3>

                      <div className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                value={option.value}
                                type="checkbox"
                                checked={selectedFilters[section.id].includes(option.value)}
                                onChange={() => handleFilterChange(section.id, option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="mr-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
              )}

              {/* Product grid */}
              <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <Link to={`/products/${product.id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.price.toLocaleString('fa-IR')} تومان
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductList; 