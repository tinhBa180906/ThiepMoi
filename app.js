/* =====================================================
   app.js – Thiệp Mời Tốt Nghiệp
   ===================================================== */

'use strict';

// ── State ──────────────────────────────────────────
let guestName = '';
let rsvpOpen = false;
let submitted = false;

// ── Particles ──────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleItems = ['✦', '✨', '🌟', '💫', '•', '✧'];
  const colors = [
    'rgba(45,212,191,0.5)',
    'rgba(94,234,212,0.4)',
    'rgba(253,230,138,0.6)',
    'rgba(254,243,199,0.7)',
    'rgba(186,230,253,0.5)',
    'rgba(221,214,254,0.4)',
  ];

  for (let i = 0; i < 45; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const isSymbol = Math.random() > 0.4;

    if (isSymbol) {
      p.textContent = particleItems[Math.floor(Math.random() * particleItems.length)];
      p.style.fontSize = `${Math.random() * 14 + 10}px`;
      p.style.color = colors[Math.floor(Math.random() * colors.length)];
      p.style.textShadow = '0 0 8px rgba(253,230,138,0.8)';
    } else {
      const size = Math.random() * 8 + 3;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.boxShadow = '0 0 10px rgba(253,230,138,0.8)';
    }

    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 15 + 10}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;

    container.appendChild(p);
  }

  // Interactive mouse sparkle trail
  initCursorSparkles();
}

function initCursorSparkles() {
  let lastX = 0, lastY = 0;
  const symbols = ['✨', '✦', '🌟', '💫'];

  window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist < 35) return; // limit density
    lastX = e.clientX;
    lastY = e.clientY;

    const s = document.createElement('span');
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: ${Math.random() * 12 + 10}px;
      color: ${Math.random() > 0.5 ? '#fde68a' : '#5eead4'};
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(1);
      transition: transform 0.8s ease-out, opacity 0.8s ease-out;
      text-shadow: 0 0 10px rgba(253,230,138,0.9);
      opacity: 1;
    `;
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translate(-50%, -100%) scale(0.2) rotate(${Math.random() * 180}deg)`;
      s.style.opacity = '0';
    });

    setTimeout(() => s.remove(), 850);
  });
}

// ── Countdown ──────────────────────────────────────
function updateCountdown() {
  // Target: 22/08/2026 07:00 ICT (UTC+7)
  const target = new Date('2026-08-22T07:00:00+07:00').getTime();
  const now    = Date.now();
  const diff   = target - now;

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');

  if (!dEl) return;

  if (diff <= 0) {
    dEl.textContent = '00'; hEl.textContent = '00';
    mEl.textContent = '00'; sEl.textContent = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  const fmt = n => String(n).padStart(2, '0');
  dEl.textContent = fmt(days);
  hEl.textContent = fmt(hours);
  mEl.textContent = fmt(mins);
  sEl.textContent = fmt(secs);
}

// ── Guest Name helpers ──────────────────────────────
const GUEST_IDS = [
  'guestNameDisplay',
  'guestInline1','guestInline2','guestInline3','guestInline4',
  'guestInline5','guestInline6','guestInline7','guestInline8',
  'wishLabel',
];

function applyGuestName(name) {
  // Capitalize first letter of each word
  const formatted = name
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  // Header display
  const headerEl = document.getElementById('guestNameDisplay');
  if (headerEl) headerEl.textContent = formatted;

  // Salute
  const saluteEl = document.getElementById('letterSalute');
  if (saluteEl) saluteEl.textContent = `Kính gửi ${formatted},`;

  // Inline references
  const inlineIds = [
    'guestInline1','guestInline2','guestInline3','guestInline4',
    'guestInline5','guestInline6','guestInline7','guestInline8',
  ];
  inlineIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = formatted;
  });

  // Wish label
  const wishLabelEl = document.getElementById('wishLabel');
  if (wishLabelEl) wishLabelEl.textContent = `${formatted}`;

  // Guest inline in rsvpDesc
  const guestInline8 = document.getElementById('guestInline8');
  if (guestInline8) guestInline8.textContent = formatted;

  return formatted;
}

// ── Modal: Confirm Name ─────────────────────────────
function confirmName() {
  const input = document.getElementById('guestNameInput');
  const raw   = (input?.value || '').trim();

  if (!raw) {
    input.classList.add('shake');
    input.placeholder = '⚠️ Vui lòng nhập tên của bạn!';
    setTimeout(() => {
      input.classList.remove('shake');
      input.placeholder = 'Nhập tên của bạn...';
    }, 1000);
    return;
  }

  guestName = applyGuestName(raw);

  // Animate modal out
  const overlay = document.getElementById('nameModal');
  overlay.style.transition = 'opacity 0.5s, transform 0.5s';
  overlay.style.opacity = '0';
  overlay.style.transform = 'scale(1.05)';

  setTimeout(() => {
    overlay.style.display = 'none';
    const main = document.getElementById('mainContent');
    main.style.display = 'flex';
    // kick off init
    initParticles();
    initPhotoBalloons();
    initShootingStars();
    initConfetti();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    // Launch fireworks burst on entry
    setTimeout(() => launchFireworks(), 800);
    setTimeout(() => launchFireworks(), 1600);
    setTimeout(() => launchFireworks(), 2400);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500);
}

// ── Floating Photo Balloons ─────────────────────────
function initPhotoBalloons() {
  const container = document.getElementById('balloonsContainer');
  if (!container) return;

  const photos = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'avatar.jpg',
  ];

  let index = 0;

  function spawnBalloon() {
    const photoSrc = photos[index % photos.length];
    index++;

    const b = document.createElement('div');
    b.className = 'floating-balloon';

    const left = Math.random() * 75 + 10; // 10% to 85%
    const duration = Math.random() * 10 + 16; // 16s to 26s
    const scale = Math.random() * 0.35 + 0.85; // 0.85 to 1.2

    b.style.cssText = `
      left: ${left}%;
      animation-duration: ${duration}s, ${Math.random() * 3 + 3}s;
      animation-delay: 0s, ${Math.random() * 2}s;
      transform: scale(${scale});
    `;

    b.innerHTML = `
      <div class="balloon-shine"></div>
      <img src="${photoSrc}" class="balloon-photo-img" alt="Nguyễn Văn Hồ" />
      <div class="balloon-knot"></div>
      <div class="balloon-string"></div>
      <span class="balloon-bling b-star1">✨</span>
      <span class="balloon-bling b-star2">✦</span>
    `;

    // Click on balloon to burst sparkles
    b.addEventListener('click', (e) => {
      popSparkles(e.clientX, e.clientY);
      b.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      b.style.transform = 'scale(1.5)';
      b.style.opacity = '0';
      setTimeout(() => b.remove(), 400);
    });

    container.appendChild(b);

    // Auto remove after animation completes
    setTimeout(() => {
      if (b.parentNode) b.remove();
    }, duration * 1000);
  }

  // Spawn initial set
  for (let i = 0; i < 5; i++) {
    setTimeout(spawnBalloon, i * 2200);
  }

  // Keep spawning every 4.5 seconds
  setInterval(spawnBalloon, 4500);
}

function popSparkles(x, y) {
  const stars = ['✨', '🌟', '✦', '💫', '🎉'];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('span');
    s.textContent = stars[Math.floor(Math.random() * stars.length)];
    const angle = (i / 12) * Math.PI * 2;
    const dist = Math.random() * 60 + 40;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    s.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${Math.random() * 16 + 14}px;
      color: #fde68a;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(1);
      transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s;
      text-shadow: 0 0 10px rgba(253,230,138,1);
    `;
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translate(${tx - 50}% , ${ty - 50}%) scale(1.4) rotate(${Math.random() * 360}deg)`;
      s.style.opacity = '0';
    });

    setTimeout(() => s.remove(), 650);
  }
}

// ── RSVP: Open form ─────────────────────────────────
function openRSVP() {
  if (rsvpOpen || submitted) return;
  rsvpOpen = true;

  const trigger = document.getElementById('rsvpTrigger');
  const form    = document.getElementById('rsvpForm');

  // Slide out button
  trigger.style.transition = 'opacity 0.3s, transform 0.3s';
  trigger.style.opacity = '0';
  trigger.style.transform = 'scale(0.9)';

  setTimeout(() => {
    trigger.style.display = 'none';
    form.style.display = 'block';
  }, 300);
}

// ── RSVP: Submit ────────────────────────────────────────
const CLOUD_DB_URL = 'https://jsonblob.com/api/jsonBlob/019fec2a-1625-7848-97ee-fb625eeeb2f6';

async function submitRSVP(attending) {
  if (submitted) return;

  const wishEl   = document.getElementById('wishMessage');
  const wishText = (wishEl?.value || '').trim();

  // Disable both buttons while processing
  document.getElementById('btnYes').disabled = true;
  document.getElementById('btnNo').disabled  = true;

  const record = {
    id:           Date.now(),
    guest_name:   guestName || 'Ẩn danh',
    wish_message: wishText,
    attending,
    submitted_at: new Date().toISOString(),
  };

  // 1. Save to global Cloud Database (syncs across all phones & devices)
  try {
    const getRes = await fetch(CLOUD_DB_URL);
    if (getRes.ok) {
      const data = await getRes.json();
      const records = data?.records || [];
      records.push(record);

      await fetch(CLOUD_DB_URL, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify({ records })
      });
    }
  } catch (err) {
    console.warn('Cloud DB sync error:', err);
  }

  // 2. Save to localStorage as local fallback
  try {
    const existing = JSON.parse(localStorage.getItem('rsvp_records') || '[]');
    existing.push(record);
    localStorage.setItem('rsvp_records', JSON.stringify(existing));
  } catch (e) {
    console.warn('localStorage error:', e);
  }

  // 3. Save to local Node server if running locally
  try {
    await fetch('/api/rsvp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        guestName:   record.guest_name,
        wishMessage: record.wish_message,
        attending,
      }),
    });
  } catch (_) { /* silent */ }

  submitted = true;
  showSuccess(attending, guestName);
}

function showSuccess(attending, name) {
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');

  form.style.transition = 'opacity 0.3s';
  form.style.opacity = '0';

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';

    const titleEl = document.getElementById('successTitle');
    const msgEl   = document.getElementById('successMsg');

    if (attending === 'yes') {
      titleEl.textContent = `Tuyệt vời, ${name}! 🎉`;
      msgEl.innerHTML = `Mình rất vui khi được đón <strong>${name}</strong> đến tham dự!<br/>
        Hẹn gặp bạn tại <strong>Khu D – Đại học Nam Cần Thơ</strong><br/>
        ngày <strong>22/08/2026</strong> lúc <strong>7:00 sáng</strong> nhé! 💚`;
    } else {
      titleEl.textContent = `Tiếc quá, ${name} ơi! 😢`;
      msgEl.innerHTML = `Dù không tham dự được, mình vẫn rất trân trọng<br/>
        lời chúc và tình cảm của <strong>${name}</strong> dành cho mình! 💙<br/>
        Cảm ơn bạn rất nhiều!`;
    }

    showToast(attending === 'yes'
      ? '🎉 Đã xác nhận tham dự! Hẹn gặp bạn nhé!'
      : '💙 Đã nhận được lời chúc của bạn!'
    );
  }, 300);
}

// ── Toast ────────────────────────────────────────────
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Char Counter ─────────────────────────────────────
function initCharCounter() {
  const textarea  = document.getElementById('wishMessage');
  const charCount = document.getElementById('charCount');
  if (!textarea || !charCount) return;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / 500`;
    charCount.style.color = len > 450 ? '#ef4444' : '#94a3b8';
  });
}

// ── Enter key on modal input ──────────────────────────
function initModalEnterKey() {
  const input = document.getElementById('guestNameInput');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmName();
  });
}

// ── Scroll reveal ─────────────────────────────────────
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
    s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(s);
  });
}

// ── CSS: Shake animation ──────────────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{ transform: translateX(0); }
    20%    { transform: translateX(-8px); }
    40%    { transform: translateX(8px); }
    60%    { transform: translateX(-6px); }
    80%    { transform: translateX(6px); }
  }
  .shake { animation: shake 0.5s ease; border-color: #ef4444 !important; }
`;
document.head.appendChild(shakeStyle);

// ── Init on DOM ready ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initModalEnterKey();
  initCharCounter();

  // Show main content if name already set (page refresh)
  // (modal shows by default; user must confirm each time)
});

// ── Shooting Stars ─────────────────────────────────────
function initShootingStars() {
  const container = document.getElementById('shootingStarsContainer');
  if (!container) return;

  function spawnStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    const top = Math.random() * 60;
    const left = Math.random() * 80 + 10;
    const duration = Math.random() * 2 + 1.5;
    star.style.cssText = `top:${top}%;left:${left}%;animation-duration:${duration}s;animation-delay:0s`;
    container.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000 + 200);
  }

  // Initial burst
  for (let i = 0; i < 3; i++) setTimeout(spawnStar, i * 600);
  // Keep spawning
  setInterval(spawnStar, 2200);
}

// ── Confetti ───────────────────────────────────────────
function initConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  const colors = ['#fde68a','#5eead4','#fecdd3','#ddd6fe','#a5f3fc','#f0abfc','#34d399'];
  const shapes = ['●','■','▲','♦','★'];

  function spawnConfetti() {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.textContent = shape;
    piece.style.cssText = `
      left:${left}%;
      color:${color};
      font-size:${Math.random()*12+8}px;
      animation-duration:${duration}s;
      animation-delay:${Math.random()*2}s;
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), (duration + 2) * 1000);
  }

  for (let i = 0; i < 20; i++) setTimeout(spawnConfetti, i * 200);
  setInterval(spawnConfetti, 500);
}

// ── Fireworks ──────────────────────────────────────────
function launchFireworks() {
  const colors = ['#fde68a','#5eead4','#fecdd3','#ddd6fe','#f0abfc','#34d399','#fb923c'];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.5;

  for (let i = 0; i < 20; i++) {
    const spark = document.createElement('div');
    spark.className = 'firework-spark';
    const angle = (i / 20) * Math.PI * 2;
    const dist = Math.random() * 120 + 60;
    spark.style.cssText = `
      left:${x}px;top:${y}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --tx:${Math.cos(angle)*dist}px;
      --ty:${Math.sin(angle)*dist}px;
      box-shadow:0 0 6px 2px currentColor;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 950);
  }
}

// Auto fireworks every 8 seconds
setInterval(launchFireworks, 8000);
