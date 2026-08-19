/**
 * VIEW/SECTION: OverlapGallerySection.jsx — AOF v3 (Ribbon + Overlap)
 *
 * Layout:
 * - Ảnh background tổng quan phía sau
 * - Chủ thể PNG sinh viên (đã xóa phông) trượt từ dưới lên, đè lên nền
 * - Dải ruy-băng dọc (Vertical Ribbon) nền xanh lá đậm góc trên bên phải,
 *   chứa text "CẤN THỊ THU HƯƠNG — HỌC VIỆN TÀI CHÍNH" (font Serif, viết hoa)
 *   Animation: lơ lửng lên xuống nhẹ (Framer Motion)
 * - Vertical text "THANH XUÂN" bên lề trái màu vàng gold
 */

import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../../models/eventConfig';

// ===== MAIN COMPONENT =====
const OverlapGallerySection = ({
  bgSrc        = EVENT_CONFIG.images.overlapBg,
  verticalText = 'THANH XUÂN',
  caption      = 'MY YOUTH · 2022 – 2026',
}) => (
  <section
    id="overlap-gallery"
    className="section-py"
    style={{ background: 'var(--aof-off-white)' }}
  >
    <div className="px-6">

      {/* Eyebrow */}
      <motion.p
        className="text-xs font-semibold tracking-[0.35em] uppercase text-center mb-6"
        style={{ color: 'var(--aof-gold-dark)', fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        ✦ Ký Ức &amp; Hoài Niệm ✦
      </motion.p>

      {/* ===== KHỐI ẢNH ĐÈ ===== */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Vertical text bên lề trái */}
        <div
          className="absolute left-0 top-0 h-full flex items-center justify-center z-20"
          style={{ width: '28px' }}
        >
          <span className="vertical-text">{verticalText}</span>
        </div>

        {/* Khu vực ảnh */}
        <div className="relative pl-8" style={{ minHeight: '300px' }}>

          {/* ── Ảnh nền background ── */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ boxShadow: '0 12px 40px rgba(26,71,49,0.18)' }}
          >
            <img
              src={bgSrc}
              alt="Gallery background"
              className="w-full object-cover"
              style={{ height: '280px', objectPosition: 'center' }}
              loading="lazy"
            />
          </div>

          {/* Badge năm tốt nghiệp — góc trên trái */}
          <motion.div
            className="absolute"
            style={{ top: '12px', left: '40px', zIndex: 15 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <div
              className="rounded-full flex flex-col items-center justify-center"
              style={{
                width: '56px',
                height: '56px',
                background: 'var(--aof-green)',
                border: '2px solid var(--aof-gold)',
                boxShadow: '0 4px 16px rgba(26,71,49,0.4)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--aof-gold-light)', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.1 }}>CLASS</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>2026</span>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.6rem',
              color: 'var(--aof-green-mid)',
            }}
          >
            {caption}
          </p>
          <p
            className="text-xs tracking-widest uppercase mt-1"
            style={{ color: 'var(--aof-gold-dark)', fontFamily: 'var(--font-body)' }}
          >
            — &nbsp; Kỷ niệm một hành trình &nbsp; —
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default OverlapGallerySection;
