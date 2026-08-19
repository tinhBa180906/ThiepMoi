/**
 * VIEW/SECTION: LocationMapSection.jsx — AOF v3 (Refactored UI)
 *
 * Thay đổi so với phiên bản cũ:
 * - Xóa nút "Mở Google Maps" đè lên iframe → giữ bản đồ sạch sẽ
 * - Đồng bộ màu sắc 2 card (Giờ / Ngày): cùng nền trắng, chữ xanh AOF
 * - Tăng khoảng cách (gap, margin) giữa các khối
 * - Chỉ giữ 1 nút CTA duy nhất: "XEM CHỈ ĐƯỜNG" dưới cùng
 */

import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { EVENT_CONFIG } from '../../models/eventConfig';

// ===== ANIMATION SHORTHAND =====
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-50px' },
  transition:  { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

// ===== INFO CARD (dùng chung cho Giờ và Ngày) =====
const InfoCard = ({ label, value, sub }) => (
  <div
    className="rounded-2xl text-center"
    style={{
      background: '#ffffff',
      border: '1px solid rgba(26,71,49,0.1)',
      boxShadow: '0 2px 12px rgba(26,71,49,0.06)',
      padding: '18px 12px',
    }}
  >
    {/* Nhãn nhỏ trên đỉnh */}
    <p
      className="text-[0.6rem] font-semibold tracking-widest uppercase mb-2"
      style={{ color: '#c5a059', fontFamily: 'var(--font-body)' }}
    >
      {label}
    </p>

    {/* Giá trị chính — số lớn */}
    <p
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#154734',
        lineHeight: 1,
      }}
    >
      {value}
    </p>

    {/* Phụ đề nhỏ bên dưới */}
    <p
      className="text-xs mt-2"
      style={{ color: 'var(--aof-gray)', fontFamily: 'var(--font-body)' }}
    >
      {sub}
    </p>
  </div>
);

// ===== MAIN COMPONENT =====
const LocationMapSection = () => {
  const { event } = EVENT_CONFIG;

  // Google Maps embed URL — thay bằng URL thật nếu cần
  const MAPS_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.5843614584854!2d105.77573367594!3d21.0588792800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cb17c0b75%3A0x51a08a17a8d64af3!2sAcademy%20of%20Finance!5e0!3m2!1sen!2s!4v1692000000000!5m2!1sen!2s';

  const MAPS_OPEN_URL = event.mapsUrl;

  return (
    <section
      id="location-section"
      className="section-py"
      style={{ background: 'var(--aof-paper)' }}
    >
      <div className="px-5">

        {/* ── TIÊU ĐỀ ───────────────────────────────────────────────────── */}
        <motion.div className="text-center mb-6" {...fadeUp(0)}>
          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-2"
            style={{ color: 'var(--aof-gold-dark)', fontFamily: 'var(--font-body)' }}
          >
            ✦ Địa Điểm ✦
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--aof-green)',
              lineHeight: 1.2,
            }}
          >
            ADDRESS
          </h2>

          {/* Tên địa điểm */}
          <p
            className="mt-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--aof-green-mid)',
            }}
          >
            {event.venue}
          </p>

          {/* Địa chỉ */}
          <p
            className="text-xs mt-1 leading-relaxed"
            style={{ color: 'var(--aof-gray)', fontFamily: 'var(--font-body)' }}
          >
            {event.address}
          </p>
        </motion.div>

        {/* ── KHUNG BẢN ĐỒ (sạch, không overlay đè lên) ────────────────── */}
        <motion.div {...fadeUp(0.15)} className="mb-6">
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(26,71,49,0.12)',
              border: '1px solid rgba(26,71,49,0.08)',
              lineHeight: 0, // Xóa gap trắng dưới iframe
            }}
          >
            <iframe
              src={MAPS_EMBED_URL}
              title={`Bản đồ ${event.venue}`}
              width="100%"
              height="220"
              style={{ display: 'block', border: 'none' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* ── 2 INFO CARDS: Giờ + Ngày ──────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-4"
          {...fadeUp(0.25)}
        >
          {/* Card Giờ đón khách */}
          <InfoCard
            label="Giờ đón khách"
            value={event.time}
            sub={event.dayOfWeek}
          />

          {/* Card Ngày tổ chức */}
          <InfoCard
            label="Ngày tổ chức"
            value={event.dayNumber}
            sub={`${event.month} · ${event.year}`}
          />
        </motion.div>

        {/* ── NÚT CTA DUY NHẤT ─────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.35)}>
          <a
            href={MAPS_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '14px 20px',
              borderRadius: '12px',
              background: '#154734',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s ease, transform 0.15s ease',
              boxShadow: '0 4px 16px rgba(21,71,52,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0f3325';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#154734';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Navigation size={16} strokeWidth={2.2} />
            📍 Xem Chỉ Đường
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default LocationMapSection;
