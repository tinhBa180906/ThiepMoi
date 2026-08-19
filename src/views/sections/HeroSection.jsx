/**
 * VIEW/SECTION: HeroSection.jsx — AOF v3 (Pixel-Perfect)
 *
 * Design nâng cấp:
 * - Ảnh cover FULL WIDTH với CSS mask-image fade mờ vào nền trắng
 * - Typography đè lên ảnh: "Lễ Tốt Nghiệp" + quote
 * - Tên khách mời typewriter font viết tay bên dưới (trên nền trắng)
 * - Mũ tốt nghiệp SVG float nhẹ nhàng
 */

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { EVENT_CONFIG } from '../../models/eventConfig';

// ===== TYPEWRITER HOOK =====
const useTypewriter = (text, speed = 70, startDelay = 800) => {
  const [displayed, setDisplayed] = useState('');
  const [done,      setDone]      = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed('');
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { 
          clearInterval(interval); 
          setDone(true); 
          isFirstRun.current = false;
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text]);

  return { displayed, done };
};

// ===== GRADUATION CAP (nhỏ gọn, dùng cho hero overlay) =====
const CapIcon = ({ size = 36 }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 48 38" fill="none">
    <polygon points="24,4 44,14 24,24 4,14" fill="#ffffff" opacity="0.95"/>
    <polygon points="24,4 44,14 24,24 4,14" fill="none" stroke="rgba(201,168,76,0.8)" strokeWidth="0.8"/>
    <path d="M12 18 L12 28 Q12 32 24 34 Q36 32 36 28 L36 18" fill="rgba(255,255,255,0.15)" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8"/>
    <circle cx="24" cy="4" r="2" fill="#c9a84c"/>
    <line x1="24" y1="4" x2="38" y2="10" stroke="#c9a84c" strokeWidth="0.8"/>
    <line x1="38" y1="10" x2="38" y2="22" stroke="#c9a84c" strokeWidth="0.8"/>
    <circle cx="38" cy="24" r="2.5" fill="#c9a84c" opacity="0.9"/>
  </svg>
);

/**
 * @param {{ guestName: string }} props
 */
const HeroSection = ({ guestName }) => {
  const { graduate, invitation, event } = EVENT_CONFIG;
  const [guestNameInput, setGuestNameInput] = useState(guestName || 'Khách Mời');
  const { displayed, done } = useTypewriter(guestNameInput, 75, 1000);

  const handleCopyLink = () => {
    // Generate unique link with guest parameter
    const url = new URL(window.location.href);
    url.searchParams.set('guest', guestNameInput);
    
    navigator.clipboard.writeText(url.toString()).then(() => {
      toast.success(`Đã sao chép link mời cho: ${guestNameInput}`);
    }).catch(() => {
      toast.error('Không thể sao chép link. Vui lòng thử lại.');
    });
  };

  return (
    <section className="relative bg-white overflow-hidden">

      {/* ===== PHẦN ẢNH COVER VỚI GRADIENT MASK ===== */}
      <div className="relative">
        <img
          src="/assets/img1.jpg"
          alt="Graduation cover"
          className="hero-img-fade w-full object-cover"
          style={{ height: '420px', objectPosition: 'center top' }}
        />

        {/* Overlay gradient tối từ trên xuống để chữ nổi lên */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,37,24,0.5) 0%, rgba(10,37,24,0.2) 50%, transparent 100%)',
          }}
        />

        {/* ===== TYPOGRAPHY ĐÈ LÊN ẢNH ===== */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pb-10">
          {/* Icon mũ nhỏ */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-3"
          >
            <CapIcon size={44} />
          </motion.div>

          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: 'rgba(201,168,76,0.9)' }}
          >
            {graduate.university} · {graduate.classOf}
          </motion.p>

          {/* Tiêu đề chính — Font Serif lớn màu trắng */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 9vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            }}
          >
            {invitation.heroTitle}
          </motion.h1>

          {/* Tên nhân vật chính — Font viết tay màu vàng gold */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
              color: 'var(--aof-gold-light)',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              lineHeight: 1.3,
            }}
          >
            {graduate.fullName}
          </motion.p>

          {/* Quote nhỏ bên dưới */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            style={{
              fontFamily: 'var(--font-classic)',
              fontStyle: 'italic',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.7)',
              marginTop: '10px',
              letterSpacing: '0.03em',
            }}
          >
            "Khép lại một chặng đường, mở ra ngàn mơ ước."
          </motion.p>
        </div>
      </div>

      {/* ===== PHẦN NỀN TRẮNG PHÍA DƯỚI ===== */}
      <div className="px-6 pt-2 pb-8 bg-white text-center">

        {/* Chuyên ngành */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
          style={{ color: 'var(--aof-gold-dark)' }}
        >
          {graduate.degree}
        </motion.p>

        {/* Divider vàng */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          className="gold-divider mb-5"
          style={{ transformOrigin: 'center' }}
        >
          <span className="gold-divider__icon">✦ ✦ ✦</span>
        </motion.div>

        {/* THÂN MỜI + Tên khách (Typewriter) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="relative"
        >
          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-1 drop-shadow-md"
            style={{ color: 'var(--aof-gray)' }}
          >
            THÂN MỜI
          </p>
          
          <div className="flex justify-center items-center relative group">
            <input
              type="text"
              value={displayed}
              onChange={(e) => setGuestNameInput(e.target.value)}
              className="bg-transparent border-b border-transparent focus:border-white/20 outline-none text-center drop-shadow-md transition-colors"
              placeholder="Nhập tên..."
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: 'clamp(2rem, 9vw, 2.8rem)',
                color: 'var(--aof-gold)',
                textShadow: '1px 1px 3px rgba(0,0,0,0.15)',
                lineHeight: 1.25,
                width: '90%',
                maxWidth: '320px'
              }}
            />
            
            {/* Copy Button */}
            <button 
              onClick={handleCopyLink}
              title="Sao chép link gửi khách"
              className="absolute right-0 p-2 text-[var(--aof-gray)] hover:text-[var(--aof-gold)] transition-colors opacity-50 hover:opacity-100"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Ngày giờ ngắn */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-5 flex items-center justify-center gap-2 flex-wrap"
        >
          {[event.dayOfWeek, event.displayDate.replace(event.dayOfWeek + ', ', ''), event.time].map((t, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-classic)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'var(--aof-green-mid)',
              opacity: 0.85,
            }}>
              {i > 0 && <span style={{ color: 'var(--aof-gold)', margin: '0 4px', fontStyle: 'normal' }}>·</span>}
              {t}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-1"
        >
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--aof-gray)', opacity: 0.4 }}>
            scroll
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 5.5l5 5 5-5" stroke="var(--aof-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
