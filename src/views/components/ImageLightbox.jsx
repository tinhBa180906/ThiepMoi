/**
 * COMPONENT: ImageLightbox.jsx
 *
 * Modal phóng to ảnh dùng chung toàn dự án.
 * Sử dụng Framer Motion `layoutId` để tạo hiệu ứng "bay" từ thumbnail → full-screen.
 *
 * Props:
 *   image  — { src, alt, layoutId, caption? } | null
 *   onClose — callback để đóng modal
 *
 * Cách dùng tại thumbnail:
 *   <motion.img
 *     layoutId="gallery-grid-0"
 *     src={img.src}
 *     onClick={() => onImageClick({ src: img.src, alt: img.alt, layoutId: 'gallery-grid-0' })}
 *   />
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageLightbox = ({ image, onClose }) => {

  // ── Khóa scroll khi modal mở ─────────────────────────────────────────────────
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup khi component unmount
    return () => { document.body.style.overflow = ''; };
  }, [image]);

  // ── Đóng khi nhấn phím ESC ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {image && (
        <>
          {/* ── BACKDROP: Nền tối phủ toàn màn hình ─────────────────────────── */}
          <motion.div
            key="lightbox-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose} // Click vào nền → đóng
          >

            {/* ── NÚT ĐÓNG [✕] góc phải trên ─────────────────────────────── */}
            <motion.button
              key="lightbox-close"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 110,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                lineHeight: 1,
              }}
            >
              ✕
            </motion.button>

            {/* ── ẢNH PHÓNG TO: dùng chung layoutId với thumbnail ─────────── */}
            {/* Click vào ảnh không đóng (stopPropagation) */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                maxWidth: '90vw',
                maxHeight: '90vh',
              }}
            >
              <motion.img
                key={image.layoutId}
                layoutId={image.layoutId}
                src={image.src}
                alt={image.alt || ''}
                style={{
                  maxWidth: '88vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                }}
              />

              {/* Caption (nếu có) */}
              {image.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: 'var(--font-classic)',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                  }}
                >
                  {image.caption}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
