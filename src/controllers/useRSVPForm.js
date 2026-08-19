/**
 * CONTROLLER: useRSVPForm.js
 * Custom hook quản lý state và logic form RSVP phong cách AOF.
 * Các trường: Tên, Điện thoại, Email, Lời nhắn, Xác nhận (Có/Không).
 */

import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { EMAILJS_CONFIG } from '../models/eventConfig';

// Trạng thái tham dự
export const RSVP_STATUS = {
  ATTENDING: 'Có, tôi sẽ đến',
  DECLINING: 'Không, tôi vắng mặt',
};

// Trạng thái submit
const SUBMIT_STATE = {
  IDLE:    'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR:   'error',
};

const INITIAL_FORM = {
  from_name: '',               
  phone_number: '',               
  guest_email: '',               
  attendance_status: 'Chắc chắn tham gia', 
  message: '',               
};

const useRSVPForm = () => {
  const [formData,    setFormData]    = useState(INITIAL_FORM);
  const [submitState, setSubmitState] = useState(SUBMIT_STATE.IDLE);

  // Cập nhật bất kỳ field nào
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Validate form
  const validateForm = (data) => {
    if (!data.from_name.trim()) {
      toast.error('Vui lòng nhập họ và tên!', { icon: '✍️' });
      return false;
    }
    // (Tuỳ chọn check email nếu bạn vẫn dùng)
    return true;
  };

  // ===== SUBMIT: GỬI EMAIL QUA EMAILJS =====
  const handleSubmit = useCallback(async (e, formElement) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    setSubmitState(SUBMIT_STATE.LOADING);

    try {
      // Sử dụng sendForm theo yêu cầu, truyền DOM element
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formElement,
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      setSubmitState(SUBMIT_STATE.SUCCESS);

      const isAttending = formData.attendance_status === 'Chắc chắn tham gia';
      toast.success(
        isAttending ? '🎉 Đã xác nhận! Hẹn gặp bạn tại buổi tiệc!' : '💌 Đã ghi nhận! Cảm ơn bạn đã phản hồi.',
        { duration: 5000 }
      );
    } catch (err) {
      console.error('[EmailJS Error]:', err);
      setSubmitState(SUBMIT_STATE.ERROR);
      toast.error('Gửi thất bại! Vui lòng thử lại sau.', { duration: 6000 });
    }
  }, [formData]);

  // Reset về ban đầu
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
    setSubmitState(SUBMIT_STATE.IDLE);
  }, []);

  return {
    formData,
    isLoading: submitState === SUBMIT_STATE.LOADING,
    isSuccess: submitState === SUBMIT_STATE.SUCCESS,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useRSVPForm;
