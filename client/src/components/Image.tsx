import { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, fallback = '/images/placeholder.png', ...props }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default Image; 