import { useState, useEffect, useRef } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  blur?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  fallback = '/images/placeholder.png', 
  blur = false,
  sizes = '100vw',
  priority = false,
  quality = 75,
  className = '',
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [priority]);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const getImageSrc = () => {
    if (error) return fallback;
    if (!isInView && !priority) return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Empty 1x1 GIF
    return src;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        ref={imageRef}
        src={getImageSrc()}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${blur ? 'blur-sm' : ''}`}
        {...props}
      />
    </div>
  );
};

export default Image; 