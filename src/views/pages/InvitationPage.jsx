/**
 * VIEW/PAGE: InvitationPage.jsx — AOF v3 (Phone-Frame Layout)
 *
 * Lightbox state được quản lý tại đây và truyền xuống các section
 * qua prop `onImageClick`. Component ImageLightbox render ngoài phone-frame
 * để phủ toàn màn hình (fixed position).
 */

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Sections
import HeroSection           from '../sections/HeroSection';
import InfoSection           from '../sections/InfoSection';
import OverlapGallerySection from '../sections/OverlapGallerySection';
import FilmStripSection      from '../sections/FilmStripSection';
import CountdownSection      from '../sections/CountdownSection';
import GallerySection        from '../sections/GallerySection';
import GuestBookSection      from '../sections/GuestBookSection';
import LocationMapSection    from '../sections/LocationMapSection';
import RSVPSection           from '../sections/RSVPSection';
import FooterSection         from '../sections/FooterSection';

// Lightbox chung
import ImageLightbox from '../components/ImageLightbox';
import MusicPlayer from '../components/MusicPlayer';

// Controller
import useGuestName from '../../controllers/useGuestName';

const InvitationPage = () => {
  const { guestName } = useGuestName();

  // ── STATE: Ảnh đang được phóng to ──────────────────────────────────────────
  // Cấu trúc: { src, alt, layoutId, caption? } hoặc null (không mở)
  const [selectedImage, setSelectedImage] = useState(null);

  // ── HANDLER: Mở lightbox ───────────────────────────────────────────────────
  const handleImageClick = useCallback((imgData) => {
    setSelectedImage(imgData);
  }, []);

  // ── HANDLER: Đóng lightbox ─────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a4731',
            color: '#ffffff',
            border: '1px solid rgba(201,168,76,0.4)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            letterSpacing: '0.01em',
            borderRadius: '4px',
            boxShadow: '0 8px 24px rgba(26,71,49,0.3)',
            maxWidth: '380px',
          },
          success: { iconTheme: { primary: '#c9a84c', secondary: '#1a4731' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#1a4731' } },
          duration: 4500,
        }}
      />

      {/*
       * LIGHTBOX render ngoài phone-frame → `fixed inset-0` phủ toàn màn hình.
       * AnimatePresence điều khiển fade-in/out khi mount/unmount.
       */}
      <AnimatePresence>
        {selectedImage && (
          <ImageLightbox
            key="global-lightbox"
            image={selectedImage}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* PHONE-FRAME WRAPPER */}
      <div className="phone-frame">
        <main>
          <HeroSection guestName={guestName} />
          <InfoSection />
          <OverlapGallerySection />
          <FilmStripSection      onImageClick={handleImageClick} />
          <CountdownSection      onImageClick={handleImageClick} />
          <GallerySection        onImageClick={handleImageClick} />
          <GuestBookSection />
          <LocationMapSection />
          <RSVPSection />
          <FooterSection />
        </main>
      </div>

      {/* Trình phát nhạc nền */}
      <MusicPlayer />
    </>
  );
};

export default InvitationPage;
