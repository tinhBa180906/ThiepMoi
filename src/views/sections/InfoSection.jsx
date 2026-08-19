/**
 * VIEW/SECTION: InfoSection.jsx — Calendar Month Grid AOF v3
 *
 * Design:
 * - Background: ảnh tối màu + overlay xanh lá đậm AOF
 * - Layout lịch tháng dạng Grid 7 cột
 * - Ngày sự kiện (25) được đánh dấu bằng vòng tròn vàng + icon mũ
 * - Thông tin giờ và địa điểm bên dưới
 * - whileInView stagger animation cho mọi phần tử
 */

import { motion } from 'framer-motion';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { EVENT_CONFIG } from '../../models/eventConfig';

// ===== ANIMATION VARIANTS =====
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// ===== THÁNG 7 NĂM 2026 (hardcode, thay nếu đổi ngày) =====
// Thứ 2 = ngày 1/7/2026, nên offset = 1 (đếm từ CN=0)
const CALENDAR_DATA = {
  monthName: 'Tháng 08 · 2026',
  // 1/8/2026 = Thứ Bảy → offset = 6 (CN=0, T2=1, T3=2, T4=3, T5=4, T6=5, T7=6)
  startOffset: 6,
  totalDays: 31,
  eventDay: 22, // Ngày 22 tháng 8
  days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};

// Sinh dữ liệu lưới lịch
const buildCalendar = (data) => {
  const cells = [];
  // Các ô trống trước ngày 1
  for (let i = 0; i < data.startOffset; i++) {
    cells.push({ type: 'empty', day: null });
  }
  // Các ngày trong tháng
  for (let d = 1; d <= data.totalDays; d++) {
    cells.push({
      type: d === data.eventDay ? 'event' : 'day',
      day: d,
    });
  }
  return cells;
};

// ===== CALENDAR COMPONENT =====
const MonthCalendar = ({ data }) => {
  const cells = buildCalendar(data);

  return (
    <div className="w-full">
      {/* Tiêu đề tháng */}
      <p
        className="text-center text-xs font-semibold tracking-[0.25em] uppercase mb-4"
        style={{ color: 'var(--aof-gold)', fontFamily: 'var(--font-body)' }}
      >
        {data.monthName}
      </p>

      {/* Grid lịch */}
      <div className="cal-grid mb-2">
        {/* Hàng header: ngày trong tuần */}
        {data.days.map((d) => (
          <div key={d} className="cal-cell cal-cell--header">{d}</div>
        ))}

        {/* Các ô ngày */}
        {cells.map((cell, i) => {
          if (cell.type === 'empty') {
            return <div key={`e-${i}`} className="cal-cell cal-cell--empty">·</div>;
          }
          if (cell.type === 'event') {
            return (
              <div key={`d-${cell.day}`} className="cal-cell cal-cell--today relative">
                {/* Icon mũ tốt nghiệp nhỏ phía trên ô ngày */}
                <span
                  className="absolute"
                  style={{ top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem' }}
                >
                  🎓
                </span>
                {cell.day}
              </div>
            );
          }
          return (
            <div key={`d-${cell.day}`} className="cal-cell">
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
const InfoSection = () => {
  const { event } = EVENT_CONFIG;

  return (
    <section id="info-section" className="relative overflow-hidden">
      {/* Background: ảnh tối + overlay xanh AOF */}
      <div className="absolute inset-0 z-0">
        {/* TODO: Thay ảnh nền cho section này */}
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=70&auto=format&fit=crop"
          alt="Event background"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Overlay đậm để chữ dễ đọc */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,37,24,0.88) 0%, rgba(26,71,49,0.92) 100%)' }}
        />
      </div>

      <div className="relative z-10 py-12" style={{ paddingLeft: '10px', paddingRight: '10px' }}>

        {/* Tiêu đề section */}
        <motion.div className="text-center mb-8 mt-[5px]" {...fadeUp(0)}>
          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-2"
            style={{ color: 'rgba(201,168,76,0.75)', fontFamily: 'var(--font-body)' }}
          >
            ✦ Thời Gian & Địa Điểm ✦
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            Chi Tiết Buổi Tiệc
          </h2>
        </motion.div>

        {/* ===== LỊCH THÁNG ===== */}
        <motion.div
          className="mb-8"
          {...fadeUp(0.1)}
        >
          {/* Card khung lịch */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <MonthCalendar data={CALENDAR_DATA} />
          </div>
        </motion.div>

        {/* ===== THÔNG TIN THỜI GIAN + ĐỊA ĐIỂM ===== */}

        {/* Giờ */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          {...fadeUp(0.2)}
        >
          <div
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)' }}
          >
            <Clock size={18} color="#c9a84c" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(201,168,76,0.65)' }}>
              Giờ đón khách
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              {event.time}
            </p>
            <p style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>
              {event.dayOfWeek}, {event.displayDate.replace(event.dayOfWeek + ', ', '')}
            </p>
          </div>
        </motion.div>

        {/* Địa điểm */}
        <motion.div
          className="flex items-start gap-4 mb-5"
          {...fadeUp(0.3)}
        >
          <div
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center mt-0.5"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)' }}
          >
            <MapPin size={18} color="#c9a84c" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(201,168,76,0.65)' }}>
              Địa điểm
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', color: '#fff', lineHeight: 1.3 }}>
              {event.venue}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              {event.address}
            </p>
          </div>
        </motion.div>

        {/* Nút Xem chỉ đường */}
        <motion.div {...fadeUp(0.4)}>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aof-outline inline-flex w-full justify-center"
            style={{ color: 'var(--aof-gold-light)', borderColor: 'rgba(201,168,76,0.4)' }}
          >
            <Navigation size={14} strokeWidth={1.5} />
            Xem chỉ đường
          </a>
        </motion.div>

        {/* Quote trang trí */}
        <motion.p
          className="text-center mt-8 text-xs"
          style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}
          {...fadeUp(0.5)}
        >
          "Sự hiện diện của bạn là món quà ý nghĩa nhất."
        </motion.p>
      </div>
    </section>
  );
};

export default InfoSection;
