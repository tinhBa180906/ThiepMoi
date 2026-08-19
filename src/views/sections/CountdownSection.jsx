/**
 * VIEW/SECTION: CountdownSection.jsx — AOF v3
 *
 * Layout:
 * 1. 3 ảnh nhỏ phía trên (1 dọc trái + 2 dọc phải)
 * 2. Ảnh PNG chủ thể lớn đặt trung tâm, đè lên ảnh nhỏ
 *    – Chân ảnh fade dần vào nền trắng (mask-image gradient)
 * 3. Đồng hồ đếm ngược đến ngày 25/07/2026
 *    – Ngày:Giờ:Phút in rất to, Giây đổi màu đỏ
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../../models/eventConfig';

// Hình ảnh từ eventConfig
const PHOTO_1 = EVENT_CONFIG.images.countdownPhoto1;
const PHOTO_2 = EVENT_CONFIG.images.countdownPhoto2;
const PHOTO_3 = EVENT_CONFIG.images.countdownPhoto3;

// ── Mục tiêu đếm ngược — đọc từ eventConfig để dễ cấu hình ─────────────────────────────
// eventConfig.event.date = 'YYYY-MM-DD', eventConfig.event.time = 'HH:MM'
const buildTarget = () => {
  const { date, time } = EVENT_CONFIG.event;
  return new Date(`${date}T${time}:00+07:00`);
};
const TARGET_DATE = buildTarget();


const calcTimeLeft = () => {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
};

// ── Pad số ────────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, '0');

// ── Component đơn vị đếm ngược ───────────────────────────────────────────────
const CountUnit = ({ value, label, isRed = false }) => (
  <div className="flex flex-col items-center">
    <span
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 'clamp(3rem, 14vw, 4rem)',
        fontWeight: 200,
        lineHeight: 1,
        color: isRed ? '#e53e3e' : 'var(--aof-green)',
        letterSpacing: '-0.02em',
        tabularNums: true,
      }}
    >
      {pad(value)}
    </span>
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.55rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: isRed ? '#fc8181' : 'var(--aof-gold-dark)',
        marginTop: '4px',
      }}
    >
      {label}
    </span>
  </div>
);

// ── Dấu phân tách ─────────────────────────────────────────────────────────────
const Colon = () => (
  <span
    style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: 'clamp(2.5rem, 12vw, 3.5rem)',
      fontWeight: 100,
      color: 'var(--aof-gold)',
      lineHeight: 1,
      alignSelf: 'flex-start',
      marginTop: '4px',
      opacity: 0.7,
    }}
  >
    :
  </span>
);

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
const CountdownSection = ({ onImageClick }) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown-section"
      className="relative bg-white overflow-hidden"
      style={{ paddingBottom: '3rem' }}
    >


      {/* ── KHỐI ẢNH ─────────────────────────────────────────── */}
      <div className="relative px-4">

        {/* 3 ảnh nhỏ phía trên */}
        <motion.div
          className="grid gap-2"
          style={{ gridTemplateColumns: '1fr 1fr 1fr', height: '220px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ảnh 1 — dọc bên trái */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ boxShadow: '0 6px 20px rgba(26,71,49,0.15)', cursor: 'pointer' }}
            onClick={() => onImageClick?.({ src: PHOTO_1, alt: 'Kỷ niệm 1', layoutId: 'countdown-photo-1' })}
          >
            <motion.img
              layoutId="countdown-photo-1"
              src={PHOTO_1}
              alt="Kỷ niệm 1"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center top' }}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Ảnh 2 — giữa */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ boxShadow: '0 6px 20px rgba(26,71,49,0.15)', cursor: 'pointer' }}
            onClick={() => onImageClick?.({ src: PHOTO_2, alt: 'Kỷ niệm 2', layoutId: 'countdown-photo-2' })}
          >
            <motion.img
              layoutId="countdown-photo-2"
              src={PHOTO_2}
              alt="Kỷ niệm 2"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Ảnh 3 — phải */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ boxShadow: '0 6px 20px rgba(26,71,49,0.15)', cursor: 'pointer' }}
            onClick={() => onImageClick?.({ src: PHOTO_3, alt: 'Kỷ niệm 3', layoutId: 'countdown-photo-3' })}
          >
            <motion.img
              layoutId="countdown-photo-3"
              src={PHOTO_3}
              alt="Kỷ niệm 3"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

      </div>

      {/* ── ĐỒNG HỒ ĐẾM NGƯỢC ──────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 px-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {/* Số đếm ngược — luôn hiển thị */}
        <div
          className="flex items-start justify-center gap-2"
          style={{ padding: '0 8px' }}
        >
          <CountUnit value={timeLeft.days}    label="Ngày"  />
          <Colon />
          <CountUnit value={timeLeft.hours}   label="Giờ"   />
          <Colon />
          <CountUnit value={timeLeft.minutes} label="Phút"  />
          <Colon />
          <CountUnit value={timeLeft.seconds} label="Giây" isRed />
        </div>

            {/* Divider vàng trang trí */}
            <div
              className="mx-auto mt-5"
              style={{
                width: '80px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--aof-gold), transparent)',
              }}
            />

            {/* Sub-text */}
            <p
              className="text-center mt-3 text-xs"
              style={{
                fontFamily: 'var(--font-classic)',
                fontStyle: 'italic',
                color: 'var(--aof-gray)',
                opacity: 0.7,
              }}
            >
              đến Lễ Tốt Nghiệp · Học Viện Tài Chính · {EVENT_CONFIG.event.displayDate}
            </p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
