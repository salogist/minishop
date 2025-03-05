import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';
import Image from './Image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

const ProductCarousel = ({ products, title }: ProductCarouselProps) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`/products/${product.id}`} className="group block h-full">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg h-full">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="text-sm text-gray-500">{product.brand}</span>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-gray-900">
                        {product.price.toLocaleString()} تومان
                      </p>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors duration-300">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors duration-300">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductCarousel; 