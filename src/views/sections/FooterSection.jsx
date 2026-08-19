/**
 * VIEW/SECTION: FooterSection.jsx — Phong cách AOF
 * Footer thanh lịch với logo AOF-style và info tóm tắt.
 */

import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../../models/eventConfig';

const FooterSection = () => {
  const { graduate, event, invitation } = EVENT_CONFIG;

  return (
    <footer
      className="py-8 px-6"
      style={{
        background: 'var(--aof-green)',
        borderTop: '3px solid var(--aof-gold)',
      }}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo / Symbol */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ border: '1.5px solid rgba(201,168,76,0.5)', background: 'rgba(201,168,76,0.08)' }}
          >
            <svg viewBox="0 0 60 60" width="32" height="32" fill="none">
              <polygon points="30,6 52,18 52,42 30,54 8,42 8,18" stroke="#c9a84c" strokeWidth="1.5"/>
              <polygon points="30,14 44,22 44,38 30,46 16,38 16,22" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5"/>
              <text x="30" y="35" textAnchor="middle" fill="#c9a84c" fontSize="16" fontFamily="serif" fontWeight="bold">A</text>
            </svg>
          </div>
        </div>

        {/* Tên sự kiện */}
        <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-2"
          style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'var(--font-body)' }}>
          {invitation.subtitle}
        </p>
        <p
          className="mb-1"
          style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2.8rem', color: '#fff', lineHeight: 1.2 }}
        >
          {graduate.fullName}
        </p>
        <p className="text-xs tracking-widest uppercase mb-6"
          style={{ color: 'rgba(201,168,76,0.6)', fontFamily: 'var(--font-body)' }}>
          {graduate.degree}
        </p>

        {/* Divider */}
        <div className="gold-divider max-w-xs mx-auto mb-6">
          <span className="gold-divider__icon">✦</span>
        </div>

        {/* Info ngày giờ */}
        <p style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
          {event.dayOfWeek}, {event.dayNumber} {event.month} {event.year} &nbsp;·&nbsp; {event.time}
        </p>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>
          {event.venue}
        </p>

        {/* Clean footer finish */}
        <div className="mt-8 mb-2 h-1 w-12 mx-auto rounded-full bg-white/10"></div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
