/**
 * VIEW/SECTION: RSVPSection.jsx — Phong cách AOF
 *
 * Form đầy đủ 5 trường:
 * - Tên của bạn (Input)
 * - Lời nhắn gửi (Textarea)
 * - Xác nhận tham dự? (Select: Có / Không)
 * - Số điện thoại (Input)
 * - Email (Input, bắt buộc)
 *
 * Nút "XÁC NHẬN" màu xanh lá AOF, hover sáng lên.
 * Màn hình Thank You sau khi gửi thành công.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, RefreshCw, User, MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import useRSVPForm, { RSVP_STATUS } from '../../controllers/useRSVPForm';
import { EVENT_CONFIG } from '../../models/eventConfig';

// ===== THANK YOU SCREEN =====
const ThankYouScreen = ({ isAttending, name, onReset }) => (
  <motion.div
    key="thankyou"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="text-center py-10"
  >
    {/* Icon */}
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 20 }}
      className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: 'rgba(26,71,49,0.08)', border: '2px solid var(--aof-green)' }}
    >
      <CheckCircle size={36} color="var(--aof-green)" strokeWidth={1.5} />
    </motion.div>

    {/* Chữ ký cảm ơn */}
    <p
      className="mb-2"
      style={{ fontFamily: 'var(--font-handwriting)', fontSize: '3.5rem', color: 'var(--aof-green)', lineHeight: 1 }}
    >
      Cảm ơn bạn!
    </p>
    <p style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--aof-green-mid)', opacity: 0.85 }}>
      {isAttending
        ? `Hẹn gặp bạn tại buổi tiệc, ${name}!`
        : `Cảm ơn ${name} đã phản hồi. Sẽ rất nhớ bạn!`
      }
    </p>
    <p className="text-xs tracking-widest uppercase mt-3" style={{ color: 'var(--aof-gold-dark)', opacity: 0.7 }}>
      Phản hồi đã được ghi nhận thành công
    </p>

    {/* Nút gửi lại */}
    <button
      onClick={onReset}
      className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--aof-gray)', fontFamily: 'var(--font-body)',
        borderBottom: '1px solid var(--aof-gray-light)',
        paddingBottom: '2px',
        transition: 'color 0.2s',
      }}
    >
      <RefreshCw size={12} />
      Gửi lại phản hồi
    </button>
  </motion.div>
);

// ===== FORM FIELD WRAPPER =====
const FormField = ({ label, icon: Icon, required, children }) => (
  <div>
    <label className="aof-label">
      {Icon && <Icon size={12} className="inline mr-1.5 mb-0.5" strokeWidth={2} />}
      {label} {required && <span style={{ color: 'var(--aof-green)' }}>*</span>}
    </label>
    {children}
  </div>
);

// ===== MAIN COMPONENT =====
const RSVPSection = () => {
  const { rsvp, event } = EVENT_CONFIG;

  const {
    formData,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
  } = useRSVPForm();

  const isAttending = formData.rsvpStatus === RSVP_STATUS.ATTENDING;

  return (
    <section
      id="rsvp-section"
      className="section-py"
      style={{ background: 'var(--aof-paper)' }}
    >
      <div className="px-5">

        {/* ===== TIÊU ĐỀ ===== */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--aof-gold-dark)', fontFamily: 'var(--font-body)' }}>
            ✦ Tham Dự ✦
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: 'var(--aof-green)',
          }}>
            {rsvp.title}
          </h2>
          <p className="text-sm mt-2" style={{ color: 'var(--aof-gray)', fontFamily: 'var(--font-body)' }}>
            Vui lòng phản hồi trước ngày
            <span style={{ color: 'var(--aof-green)', fontWeight: 600 }}> {rsvp.deadline}</span>
          </p>
          <div className="gold-divider mt-4 max-w-xs mx-auto">
            <span className="gold-divider__icon">✦</span>
          </div>
        </motion.div>

        {/* ===== CARD FORM ===== */}
        <motion.div
          className="rounded-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            background: '#fff',
            boxShadow: '0 8px 40px rgba(26,71,49,0.1)',
            border: '1px solid rgba(26,71,49,0.08)',
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between px-8 py-4"
            style={{ background: 'var(--aof-green)', borderBottom: '3px solid var(--aof-gold)' }}
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'var(--font-body)' }}>
                Thiệp Mời
              </p>
              <p style={{ fontFamily: 'var(--font-classic)', fontStyle: 'italic', color: '#fff', fontSize: '1.05rem' }}>
                {event.venue}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                {event.dayOfWeek}
              </p>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--aof-gold-light)',
                lineHeight: 1,
              }}>
                {event.dayNumber}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                {event.month}
              </p>
            </div>
          </div>

          {/* Form body */}
          <div className="px-8 py-8">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <ThankYouScreen
                  key="success"
                  isAttending={isAttending}
                  name={formData.guestDisplayName}
                  onReset={resetForm}
                />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Tên */}
                  <FormField label="Họ và tên" icon={User} required>
                    <input
                      id="guestDisplayName"
                      type="text"
                      name="guestDisplayName"
                      value={formData.guestDisplayName}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên đầy đủ..."
                      className="aof-input"
                      required
                      autoComplete="name"
                    />
                  </FormField>

                  {/* Xác nhận tham dự (Select) */}
                  <FormField label="Xác nhận tham dự" icon={Calendar} required>
                    <select
                      id="rsvpStatus"
                      name="rsvpStatus"
                      value={formData.rsvpStatus}
                      onChange={handleChange}
                      className="aof-input"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value={RSVP_STATUS.ATTENDING}>{RSVP_STATUS.ATTENDING}</option>
                      <option value={RSVP_STATUS.DECLINING}>{RSVP_STATUS.DECLINING}</option>
                    </select>
                  </FormField>

                  {/* Lời nhắn */}
                  <FormField label="Lời nhắn gửi" icon={MessageSquare}>
                    <textarea
                      id="wishMessage"
                      name="wishMessage"
                      value={formData.wishMessage}
                      onChange={handleChange}
                      placeholder="Gửi lời chúc mừng hoặc nhắn nhủ điều gì đó..."
                      rows={3}
                      className="aof-input"
                      style={{ resize: 'vertical', minHeight: '90px' }}
                    />
                  </FormField>

                  {/* Số điện thoại + Email - 2 cột */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Số điện thoại" icon={Phone}>
                      <input
                        id="guestPhone"
                        type="tel"
                        name="guestPhone"
                        value={formData.guestPhone}
                        onChange={handleChange}
                        placeholder="0912 345 678"
                        className="aof-input"
                        autoComplete="tel"
                      />
                    </FormField>

                    <FormField label="Email" icon={Mail} required>
                      <input
                        id="guestEmail"
                        type="email"
                        name="guestEmail"
                        value={formData.guestEmail}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="aof-input"
                        required
                        autoComplete="email"
                      />
                    </FormField>
                  </div>

                  {/* Nút XÁC NHẬN */}
                  <button
                    type="submit"
                    id="submit-rsvp"
                    disabled={isLoading}
                    className="btn-aof w-full mt-2"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border-2"
                          style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                        />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send size={14} strokeWidth={2} />
                        Xác Nhận
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs" style={{ color: 'var(--aof-gray)', opacity: 0.6 }}>
                    Thông tin của bạn chỉ dùng để xác nhận tham dự.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;
