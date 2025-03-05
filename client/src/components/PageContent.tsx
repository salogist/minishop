import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageContentProps {
  children: ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageContent; 