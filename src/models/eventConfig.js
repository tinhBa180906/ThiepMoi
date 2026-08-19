/**
 * MODEL: eventConfig.js
 * Chứa toàn bộ thông tin sự kiện - Phong cách Học viện Tài chính (AOF).
 * ⚡ Khách hàng chỉ cần chỉnh sửa file này để cập nhật toàn bộ nội dung thiệp.
 */

export const EVENT_CONFIG = {
  // ===== THÔNG TIN NHÂN VẬT =====
  graduate: {
    fullName: 'Cấn Thị Thu Hương',             // TODO: Thay tên tốt nghiệp
    shortName: 'Thu Hương',                    // Tên ngắn dùng cho chữ ký
    degree: 'Cử nhân Kế Toán',  // TODO: Thay chuyên ngành
    university: 'Học viện Tài chính',
    classOf: '2026',
    avatar: '/assets/img2.jpg',                // Ảnh đại diện chữ ký cuối trang
  },

  // ===== THỜI GIAN & ĐỊA ĐIỂM =====
  event: {
    date: '2026-08-22',
    dayOfWeek: 'Thứ Bảy',
    dayNumber: '22',
    month: 'Tháng 08',
    year: '2026',
    displayDate: 'Thứ Bảy, ngày 22 tháng 08 năm 2026',
    time: '10:45',
    displayTime: '10 giờ 45 phút',
    venue: 'Học viện Tài chính',
    address: 'Số 58, Phố Lê Văn Hiến, Phường Đức Thắng, Quận Bắc Từ Liêm, Hà Nội',
    mapsUrl: 'https://maps.google.com/maps?q=Học+viện+Tài+chính+Hà+Nội', // TODO: Thay link
  },

  // ===== NỘI DUNG THIỆP =====
  invitation: {
    title: 'Tiệc Mừng Tốt Nghiệp',
    heroTitle: 'Lễ Tốt Nghiệp',                // Hiển thị đè lên ảnh hero
    subtitle: 'Học viện Tài chính · Khóa 2022–2026',
    heroTagline: 'The Beginning of a New Journey',

    // Tâm thư - lưu bút
    guestbookMessage: `   Ngày tốt nghiệp không chỉ là dấu mốc khép lại một chặng đường học tập, mà còn là khoảnh khắc để mình nhìn lại và trân trọng tất cả những người đã xuất hiện, đồng hành và góp phần làm nên những năm tháng thanh xuân thật đẹp. Có những ngày vui, những lúc mệt mỏi, những lần tưởng chừng muốn bỏ cuộc, nhưng nhờ có gia đình, thầy cô, bạn bè và những người luôn yêu thương, động viên mà mình đã có thể đi đến ngày hôm nay. Sự hiện diện của mọi người chính là món quà ý nghĩa nhất trong ngày hôm nay. 🤍`,
  },

  // ===== GALLERY - Ảnh sẽ được chia thành 3 bố cục =====
  gallery: {
    title: 'Album & Thanh Xuân',
    tagline: 'The Beginning of a New Journey',

    // Bố cục 1: Film Strip (3–4 ảnh ngang)
    filmStrip: [
      { src: '/assets/img3.jpg', alt: 'Lễ tốt nghiệp' },
      { src: '/assets/img4.jpg', alt: 'Nhận bằng' },
      { src: '/assets/img5.jpg', alt: 'Kỷ niệm' },
      { src: '/assets/img6.jpg', alt: 'Thư viện' },
    ],

    // Bố cục 2: Lưới bất đối xứng (1 lớn trái + 2 nhỏ phải)
    grid: [
      { src: '/assets/img7.jpg', alt: 'Khoảnh khắc 1', large: true },
      { src: '/assets/img8.jpg', alt: 'Khoảnh khắc 2', large: false },
      { src: '/assets/img9.jpg', alt: 'Khoảnh khắc 3', large: false },
    ],

    slider: [
      { src: '/assets/img10.jpg', alt: 'Slide 1', caption: 'Lễ nhận bằng tốt nghiệp' },
      { src: '/assets/img11.jpg', alt: 'Slide 2', caption: 'Khoảnh khắc bên bạn bè' },
      { src: '/assets/img12.jpg', alt: 'Slide 3', caption: 'Ký ức 4 năm đại học' },
      { src: '/assets/img13.jpg', alt: 'Slide 4', caption: 'Cùng nhau lớn lên' },
      { src: '/assets/img14.jpg', alt: 'Slide 5', caption: 'Những ngày cuối khóa' },
      { src: '/assets/img20.jpg', alt: 'Slide 6', caption: 'Kỷ niệm khó quên' },
      { src: '/assets/img21.jpg', alt: 'Slide 7', caption: 'Nụ cười rạng rỡ' },
      { src: '/assets/img22.jpg', alt: 'Slide 8', caption: 'Thanh xuân tươi đẹp' },
      { src: '/assets/img23.jpg', alt: 'Slide 9', caption: 'Bạn bè thân thiết' },
      { src: '/assets/img24.jpg', alt: 'Slide 10', caption: 'Hành trang tuổi trẻ' },
      { src: '/assets/img25.jpg', alt: 'Slide 11', caption: 'Ngày vui trọn vẹn' },
      { src: '/assets/img26.jpg', alt: 'Slide 12', caption: 'Bước ngoặt mới' },
      { src: '/assets/img27.jpg', alt: 'Slide 13', caption: 'Dấu ấn thời sinh viên' },
      { src: '/assets/img28.jpg', alt: 'Slide 14', caption: 'Niềm tự hào' },
      { src: '/assets/img29.jpg', alt: 'Slide 15', caption: 'Hướng về tương lai' },
    ],
  },

  // ===== DEFAULT IMAGES CHO CÁC KHỐI ĐẶC BIỆT =====
  images: {
    // Ảnh nền mờ khối thư viện (Overlap Gallery)
    overlapBg: '/assets/img15.jpg',

    // Khối Countdown (Đếm ngược) - 3 ảnh nhỏ trên + 1 ảnh chủ thể lớn
    countdownPhoto1: '/assets/img17.jpg',
    countdownPhoto2: '/assets/img18.jpg',
    countdownPhoto3: '/assets/img19.jpg',
  },

  // ===== RSVP =====
  rsvp: {
    deadline: '20 tháng 07 năm 2026', // TODO: Thay deadline
    title: 'Xác Nhận Tham Dự',
  },
};

/**
 * MODEL: EMAILJS_CONFIG
 * Cấu hình EmailJS — Điền thông tin từ dashboard: https://dashboard.emailjs.com
 *
 * EmailJS Template Variables cần có:
 *   {{from_name}}     — Tên khách
 *   {{guest_phone}}   — Số điện thoại
 *   {{guest_email}}   — Email khách
 *   {{rsvp_status}}   — Có / Không
 *   {{wish_message}}  — Lời nhắn
 */
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_mtmxg73',   // TODO: Dán Service ID từ EmailJS dashboard
  TEMPLATE_ID: 'template_hg97ogf',  // TODO: Dán Template ID từ EmailJS dashboard
  PUBLIC_KEY: 'kBCrRu9E_tDk-IC6j',   // TODO: Dán Public Key từ EmailJS dashboard
};
