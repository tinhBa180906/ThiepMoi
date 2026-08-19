/**
 * CONTROLLER: useCountdown.js
 * Custom hook tính toán countdown đến ngày sự kiện.
 * Cập nhật mỗi giây một lần.
 */

import { useState, useEffect } from 'react';

/**
 * @param {string} targetDate - Ngày sự kiện (YYYY-MM-DD)
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isExpired: boolean }}
 */
const useCountdown = (targetDate) => {
  const calculateTimeLeft = () => {
    // Đặt thời gian sự kiện vào lúc 18:00 theo múi giờ Việt Nam
    const target = new Date(`${targetDate}T18:00:00+07:00`).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup khi unmount
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
