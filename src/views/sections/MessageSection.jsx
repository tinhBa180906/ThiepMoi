/**
 * VIEW/SECTION: MessageSection.jsx
 * Phần lời nhắn cá nhân từ nhân vật chính.
 * Tạo cảm giác ấm áp, gần gũi trước khi đến RSVP.
 */

import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import GoldDivider from '../components/GoldDivider';
import { EVENT_CONFIG } from '../../models/eventConfig';

const MessageSection = () => {
  const { invitation, graduate } = EVENT_CONFIG;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#0d0a04' }}
    >
      {/* Decorative background quote mark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-center pointer-events-none select-none"
        style={{ fontSize: '20rem', color: 'rgba(201,168,76,0.03)', lineHeight: 1 }}
      >
        "
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Tiêu đề */}
        <AnimatedSection>
          <p className="font-sans text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: '#c9a84c', opacity: 0.7 }}>
            ✦ Lời Nhắn ✦
          </p>
          <h2 className="font-serif text-4xl md:text-5xl italic mb-2"
            style={{ color: '#faf6f0' }}>
            Từ Tận Đáy Lòng
          </h2>
          <GoldDivider />
        </AnimatedSection>

        {/* Nội dung lời nhắn */}
        <AnimatedSection delay={0.2}>
          {/* Dấu ngoặc mở */}
          <motion.div
            className="font-script mb-2 leading-none"
            style={{ fontSize: '4rem', color: '#c9a84c', opacity: 0.4 }}
          >
            "
          </motion.div>

          {/* Nội dung - xuống dòng theo \n */}
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed mb-6"
            style={{ color: '#faf6f0', opacity: 0.85, whiteSpace: 'pre-line' }}>
            {invitation.message}
          </p>

          {/* Chữ ký */}
          <div className="flex flex-col items-center gap-2 mt-8">
            <div className="w-16 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <p className="font-script text-3xl" style={{ color: '#c9a84c' }}>
              {graduate.fullName}
            </p>
            <p className="font-sans text-xs tracking-widest uppercase"
              style={{ color: '#faf6f0', opacity: 0.4 }}>
              {graduate.degree}
            </p>
            <p className="font-sans text-xs tracking-widest uppercase"
              style={{ color: '#faf6f0', opacity: 0.3 }}>
              {graduate.university}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MessageSection;
