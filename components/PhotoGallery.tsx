"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PhotoGallery.module.css";

const photos = [
  { src: "/picture.png", alt: "집들이 사진 1", width: 1290, height: 2796 },
  { src: "/picture2.jpg", alt: "집들이 사진 2", width: 3088, height: 2320 },
  { src: "/picture3.jpg", alt: "집들이 사진 3", width: 1170, height: 2532 },
  { src: "/picture4.jpg", alt: "집들이 사진 4", width: 480, height: 480 },
];

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];

  const closeViewer = () => setSelectedIndex(null);

  const showPrevious = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + photos.length) % photos.length;
    });
  };

  const showNext = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % photos.length;
    });
  };

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      <div className={styles.grid} aria-label="갤러리 사진 선택">
        {photos.map((photo, index) => (
          <button
            type="button"
            onClick={() => setSelectedIndex(index)}
            key={photo.src}
            aria-label={`${index + 1}번째 사진 크게 보기`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 460px) calc((100vw - 72px) / 3), 122px"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && selectedIndex !== null ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="갤러리 사진 크게 보기"
        >
          <div className={styles.counter}>
            {selectedIndex + 1} / {photos.length}
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeViewer}
            aria-label="갤러리 닫기"
          >
            ×
          </button>
          <button
            type="button"
            className={`${styles.navButton} ${styles.previousButton}`}
            onClick={showPrevious}
            aria-label="이전 사진 보기"
          >
            ‹
          </button>
          <div className={styles.lightboxPhoto}>
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              sizes="100vw"
              priority
            />
          </div>
          <button
            type="button"
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={showNext}
            aria-label="다음 사진 보기"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
