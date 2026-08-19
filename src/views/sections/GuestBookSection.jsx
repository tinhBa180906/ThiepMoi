/**
 * VIEW/SECTION: GuestBookSection.jsx — Lưu Bút
 *
 * Design:
 * - Background xanh lá đậm AOF với texture nhẹ
 * - Đoạn tâm thư viết theo dạng thư tay
 * - Chữ ký "Tuấn Duy" bằng font viết tay lớn
 * - Stagger animation cho từng đoạn
 */

import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../../models/eventConfig';

// Variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};
const paragraphVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const GuestBookSection = () => {
  const { graduate, invitation } = EVENT_CONFIG;

  // Tách tâm thư thành các đoạn để stagger
  const paragraphs = invitation.guestbookMessage.split('\n\n').filter(Boolean);

  return (
    <section
      id="guestbook-section"
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--aof-dark)' }}
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        <div
          className="absolute"
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '18rem',
            color: '#fff',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-8deg)',
            lineHeight: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          "
        </div>
      </div>

      {/* Vòng trang trí góc trên trái */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-10" style={{ transform: 'translate(-30%, -30%)' }}>
        <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="90" stroke="var(--aof-gold)" strokeWidth="1"/><circle cx="100" cy="100" r="70" stroke="var(--aof-gold)" strokeWidth="0.5"/></svg>
      </div>

      <div className="px-5 relative z-10">

        {/* Tiêu đề */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--aof-gold)', fontFamily: 'var(--font-body)' }}>
            ✦ Lưu Bút ✦
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: '#ffffff',
          }}>
            Tâm Thư Gửi Bạn
          </h2>
          <div className="gold-divider mt-4 max-w-xs mx-auto">
            <span className="gold-divider__icon">✦</span>
          </div>
        </motion.div>

        {/* Khung thư */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Viền trang trí */}
          <div
            className="rounded-sm p-8 md:p-12 relative"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.2)',
              boxShadow: '0 0 60px rgba(26,71,49,0.5) inset',
            }}
          >
            {/* Dấu ngoặc mở */}
            <div
              className="absolute -top-5 -left-2 leading-none select-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '6rem',
                color: 'var(--aof-gold)',
                opacity: 0.3,
              }}
            >
              "
            </div>

            {/* Nội dung tâm thư - stagger theo đoạn */}
            <motion.div
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  variants={paragraphVariants}
                  style={{
                    fontFamily: 'var(--font-classic)',
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    lineHeight: 1.9,
                    color: 'rgba(255,255,255,0.82)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Chữ ký */}
            <motion.div
              className="mt-10 flex flex-col items-end"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Dòng gạch nhỏ */}
              <div className="w-20 h-px mb-3" style={{ background: 'rgba(201,168,76,0.4)' }} />

              {/* Tên viết tay */}
              <p style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '3rem',
                color: 'var(--aof-gold-light)',
                lineHeight: 1,
              }}>
                {graduate.shortName}
              </p>

              {/* Chức danh nhỏ */}
              <p className="text-xs tracking-widest uppercase mt-2"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                {graduate.degree}
              </p>
              <p className="text-xs tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>
                {graduate.university} · {graduate.classOf}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Ký hiệu phong bì trang trí */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
            <rect x="1" y="1" width="38" height="28" rx="2" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
            <path d="M1 1 L20 16 L39 1" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
            <path d="M1 29 L13 17" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
            <path d="M39 29 L27 17" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
          </svg>
        </motion.div>

      </div>
    </section>
  );
};

export default GuestBookSection;
