/**
 * VIEW/COMPONENT: CountdownUnit.jsx
 * Hiển thị một đơn vị thời gian (ngày/giờ/phút/giây) trong countdown.
 */

import { motion, AnimatePresence } from 'framer-motion';

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    {/* Số đếm với hiệu ứng flip khi thay đổi */}
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-sm glass flex items-center justify-center overflow-hidden"
      style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="font-serif text-3xl md:text-4xl text-[#c9a84c] absolute"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    {/* Nhãn */}
    <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#faf6f0] opacity-50">
      {label}
    </span>
  </div>
);

export default CountdownUnit;
