/**
 * VIEW/SECTION: GallerySection.jsx — Phong cách AOF
 *
 * Ba bố cục gallery:
 * 1. FILM STRIP  — Dải ảnh ngang giống cuộn phim, chạy nghiêng nhẹ
 * 2. GRID        — Bố cục bất đối xứng (1 lớn + 2 nhỏ)
 * 3. CAROUSEL    — Swiper.js slider với navigation và pagination
 */

import { useRef } from 'react';
import { motion } from 'framer-motion';
// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EVENT_CONFIG } from '../../models/eventConfig';

// ===== ANIMATION VARIANTS =====
const fadeUpVariants = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ===== SECTION TITLE COMPONENT (tái sử dụng) =====
const SectionTitle = ({ eyebrow, title, light = false }) => (
  <motion.div
    className="text-center mb-12"
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
    {eyebrow && (
      <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
        style={{ color: light ? 'rgba(201,168,76,0.85)' : 'var(--aof-gold-dark)', fontFamily: 'var(--font-body)' }}>
        ✦ {eyebrow} ✦
      </p>
    )}
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
      fontWeight: 700,
      color: light ? '#fff' : 'var(--aof-green)',
    }}>
      {title}
    </h2>
    <div className="gold-divider mt-4 max-w-xs mx-auto">
      <span className="gold-divider__icon">✦</span>
    </div>
  </motion.div>
);

// ===== 1. FILM STRIP COMPONENT =====
const FilmStrip = ({ images, tagline }) => (
  <div className="relative overflow-hidden">
    {/* Background nghiêng */}
    <div
      className="film-strip py-6"
      style={{ transform: 'rotate(-2deg) scaleX(1.05)' }}
    >
      <div className="flex gap-0 overflow-hidden" style={{ transform: 'rotate(0deg)' }}>
        {images.map((img, i) => (
          <div key={i} className="relative shrink-0 group" style={{ width: '260px' }}>
            {/* Lỗ cuộn phim (trái) */}
            {i === 0 && (
              <div className="film-perforations" style={{ left: '-8px' }}>
                {[...Array(5)].map((_, j) => <span key={j} />)}
              </div>
            )}
            {/* Ảnh */}
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              {/* TODO: Thay ảnh của bạn tại đây */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            {/* Số frame */}
            <div className="text-center py-1" style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em' }}>
              {'0' + (i + 1)}  •  {new Date().getFullYear()}
            </div>
            {/* Lỗ cuộn phim (phải của frame cuối) */}
            {i === images.length - 1 && (
              <div className="film-perforations" style={{ right: '-8px' }}>
                {[...Array(5)].map((_, j) => <span key={j} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Tagline phủ lên */}
    <div className="text-center mt-6">
      <p style={{
        fontFamily: 'var(--font-handwriting)',
        fontSize: '1.8rem',
        color: 'var(--aof-green-mid)',
        opacity: 0.85,
      }}>
        {tagline}
      </p>
    </div>
  </div>
);

// ===== 2. ASYMMETRIC GRID =====
const AsymmetricGrid = ({ images, onImageClick }) => {
  const [large, ...smalls] = images;
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 p-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Ảnh lớn bên trái */}
      <motion.div
        variants={fadeUpVariants}
        className="group relative overflow-hidden rounded-2xl col-span-1 row-span-2 shadow-sm w-full h-full"
        style={{ cursor: 'pointer' }}
        onClick={() => onImageClick?.({ src: large.src, alt: large.alt, layoutId: 'gallery-grid-0' })}
      >
        <motion.img
          layoutId="gallery-grid-0"
          src={large.src}
          alt={large.alt}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
          <p style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', color: '#fff', fontSize: '0.9rem' }}>
            {large.alt}
          </p>
        </div>
      </motion.div>

      {/* 2 ảnh nhỏ bên phải */}
      {smalls.map((img, i) => (
        <motion.div
          key={i}
          variants={fadeUpVariants}
          className="group relative overflow-hidden rounded-2xl col-span-1 row-span-1 shadow-sm w-full h-full"
          style={{ cursor: 'pointer', aspectRatio: '4/3' }}
          onClick={() => onImageClick?.({ src: img.src, alt: img.alt, layoutId: `gallery-grid-${i + 1}` })}
        >
          <motion.img
            layoutId={`gallery-grid-${i + 1}`}
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// ===== 3. SWIPER CAROUSEL =====
const GalleryCarousel = ({ images, onImageClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={16}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      breakpoints={{
        640:  { slidesPerView: 1.5, spaceBetween: 16 },
        1024: { slidesPerView: 2.2, spaceBetween: 20 },
      }}
      style={{ paddingBottom: '48px', paddingLeft: '4px', paddingRight: '4px' }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div
            className="group relative overflow-hidden rounded-sm"
            style={{ boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}
            onClick={() => onImageClick?.({ src: img.src, alt: img.alt, layoutId: `gallery-slide-${i}`, caption: img.caption })}
          >
            <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
              <motion.img
                layoutId={`gallery-slide-${i}`}
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background: 'linear-gradient(to top, rgba(26,71,49,0.9), transparent)' }}
            >
              <p style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', color: '#fff', fontSize: '0.95rem' }}>
                {img.caption}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </motion.div>
);

// ===== MAIN COMPONENT =====
const GallerySection = ({ onImageClick }) => {
  const { gallery } = EVENT_CONFIG;

  return (
    <section id="gallery-section">
      {/* 2. ASYMMETRIC GRID */}
      <div className="section-py" style={{ background: 'var(--aof-off-white)' }}>
        <div className="px-5">
          <SectionTitle eyebrow="Những Khoảnh Khắc" title="Lưới Ký Ức" />
          <AsymmetricGrid images={gallery.grid} onImageClick={onImageClick} />
        </div>
      </div>

      {/* 3. SWIPER CAROUSEL */}
      <div className="section-py" style={{ background: 'var(--aof-green)' }}>
        <div className="px-5">
          <SectionTitle eyebrow="Slideshow" title="Hành Trình Thanh Xuân" light />
          <GalleryCarousel images={gallery.slider} onImageClick={onImageClick} />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

