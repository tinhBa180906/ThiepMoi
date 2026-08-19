/**
 * VIEW/SECTION: FilmStripSection.jsx — Thước phim hoài niệm (Seamless Fix)
 *
 * FIX "gấp khúc":
 * - Container: overflow-hidden + whitespace-nowrap + flex
 * - Mỗi frame: w-[250px] shrink-0 — kích thước cố định, không co
 * - Nhân đôi mảng → translateX(-50%) = đúng một vòng
 * - gap đồng đều qua margin, không dùng gap (flex gap bị tính sai với max-content)
 * - Viền VÀNG GOLD xung quanh mỗi khung ảnh
 * - Hover dừng animation
 */

import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../../models/eventConfig';

// ─── Dữ liệu từ eventConfig ───────────────────────────────────────────────────
const RAW_IMAGES = EVENT_CONFIG.gallery.filmStrip.map((img, i) => ({
  id: i + 1,
  src: img.src,
  label: `0${i + 1} • 2026`,
}));

// Nhân đôi để vòng lặp mượt mà
const FILM_IMAGES = [...RAW_IMAGES, ...RAW_IMAGES];

// ─── Kích thước cố định của mỗi frame ─────────────────────────────────────────
const FRAME_W = 190; // px — chiều rộng cố định
const FRAME_GAP = 8; // px — khoảng cách giữa các frame (margin-right)
// Tổng 1 vòng = RAW_IMAGES.length × (FRAME_W + FRAME_GAP)
// translateX(-50%) = đúng 1 vòng vì array đã nhân đôi

// ─── Mỗi khung ảnh ─────────────────────────────────────────────────────────────
const FilmFrame = ({ src, label, uniqueKey, onImageClick }) => (
  <div
    key={uniqueKey}
    style={{
      // Kích thước CỐ ĐỊNH — tránh gấp khúc
      width: `${FRAME_W}px`,
      flexShrink: 0,
      marginRight: `${FRAME_GAP}px`,
      // Viền GOLD kiểu kỷ niệm
      border: '2px solid #c9a84c',
      borderRadius: '3px',
      background: '#111',
      padding: '5px 5px 0 5px',
      cursor: 'pointer',
      transition: 'border-color 0.3s, transform 0.3s',
      position: 'relative',
      overflow: 'hidden',
    }}
    className="film-frame-gold"
    onClick={() => onImageClick?.({ src, alt: label, layoutId: `film-${uniqueKey}`, caption: label })}
  >
    {/* Ảnh */}
    <div style={{ width: '100%', height: '130px', overflow: 'hidden', borderRadius: '1px' }}>
      <motion.img
        layoutId={`film-${uniqueKey}`}
        src={src}
        alt={label}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: 'sepia(0.12) contrast(1.05) brightness(0.93)',
        }}
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.3 }}
      />
    </div>

    {/* Label monospace dưới ảnh */}
    <div
      style={{
        background: '#0f0f0f',
        color: 'rgba(201,168,76,0.8)',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: '0.55rem',
        letterSpacing: '0.18em',
        textAlign: 'center',
        padding: '4px 0 6px',
        userSelect: 'none',
      }}
    >
      {label}
    </div>
  </div>
);

// ─── Dải lỗ đục hai cạnh ────────────────────────────────────────────────────
const PerforatedEdge = () => <div className="film-perforations-strip" />;

// ─── Component chính ─────────────────────────────────────────────────────────
const FilmStripSection = ({ onImageClick }) => (
  <section
    id="film-strip-section"
    className="relative py-10"
    style={{
      background: 'var(--aof-paper)',
      overflow: 'hidden', // Chặn scroll ngang khỏi section
    }}
  >
    {/* Eyebrow */}
    <motion.p
      className="text-center text-xs font-semibold tracking-[0.35em] uppercase mb-6"
      style={{ color: 'var(--aof-gold-dark)', fontFamily: 'var(--font-body)' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      ✦ The Album ✦
    </motion.p>

    {/* Vùng film strip — THẲNG hoàn toàn, không nghiêng */}
    <motion.div
      className="relative"
      style={{ marginTop: '4px', marginBottom: '4px', overflow: 'hidden' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Cạnh trên: lỗ đục */}
      <PerforatedEdge />

      {/* Vùng phim đen nhám */}
      <div
        style={{
          backgroundColor: '#1a1a1a',
          overflow: 'hidden',
          padding: '10px 0',
        }}
      >
        <div
          className="film-track-seamless"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {FILM_IMAGES.map((img, i) => (
            <FilmFrame
              key={`${img.id}-${i}`}
              uniqueKey={`${img.id}-${i}`}
              src={img.src}
              label={img.label}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      </div>

      {/* Cạnh dưới: lỗ đục */}
      <PerforatedEdge />
    </motion.div>

    {/* Tagline phía dưới */}
    <motion.div
      className="text-center mt-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p
        style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: 'clamp(1.5rem, 6vw, 2rem)',
          color: 'var(--aof-green)',
          lineHeight: 1.3,
        }}
      >
        The Beginning of a New Journey
      </p>
      <div
        className="mx-auto mt-3"
        style={{
          width: '80px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, var(--aof-gold), transparent)',
        }}
      />
    </motion.div>
  </section>
);

export default FilmStripSection;
