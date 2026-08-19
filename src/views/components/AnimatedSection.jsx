/**
 * VIEW/COMPONENT: AnimatedSection.jsx
 * Wrapper component tái sử dụng cho hiệu ứng fade-in + slide-up khi scroll.
 * Dùng Framer Motion + Intersection Observer.
 */

import { motion } from 'framer-motion';

// Variants mặc định cho animation
const defaultVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * @param {{ children: ReactNode, className?: string, delay?: number, variants?: object }} props
 */
const AnimatedSection = ({ children, className = '', delay = 0, variants }) => {
  const animVariants = variants || {
    hidden: defaultVariants.hidden,
    visible: {
      ...defaultVariants.visible,
      transition: {
        ...defaultVariants.visible.transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }} // Trigger khi còn 80px trước khi vào viewport
      variants={animVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
