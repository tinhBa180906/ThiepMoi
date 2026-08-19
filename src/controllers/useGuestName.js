/**
 * CONTROLLER: useGuestName.js
 * Custom hook xử lý logic lấy tên khách mời từ URL parameter.
 * URL pattern: /?guest=Tên+Khách+Mời
 */

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * @returns {{ guestName: string, isPersonalized: boolean }}
 * - guestName: Tên khách mời (fallback = "Bạn")
 * - isPersonalized: true nếu URL có tham số ?guest=...
 */
const useGuestName = () => {
  // Lấy query params từ URL hiện tại
  const [searchParams] = useSearchParams();

  const guestName = useMemo(() => {
    const rawGuest = searchParams.get('guest');
    if (!rawGuest) return 'Bạn'; // Fallback khi không có param

    // Decode URI và trim khoảng trắng thừa
    return decodeURIComponent(rawGuest).trim() || 'Bạn';
  }, [searchParams]);

  return {
    guestName,
    isPersonalized: guestName !== 'Bạn',
  };
};

export default useGuestName;
