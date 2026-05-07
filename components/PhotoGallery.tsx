"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./PhotoGallery.module.css";

const photos = [
  { src: "/picture.png", alt: "우리 사진 1" },
  { src: "/picture2.jpg", alt: "우리 사진 2" },
  { src: "/picture3.jpg", alt: "우리 사진 3" },
  { src: "/picture4.jpg", alt: "우리 사진 4" },
];

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedPhoto = photos[selectedIndex];

  return (
    <div className={styles.gallery}>
      <div className={styles.viewer}>
        <Image
          src={selectedPhoto.src}
          alt={selectedPhoto.alt}
          width={1200}
          height={1600}
          sizes="(max-width: 460px) calc(100vw - 56px), 404px"
          priority={selectedIndex === 0}
        />
      </div>
      <div className={styles.thumbnails} aria-label="갤러리 사진 선택">
        {photos.map((photo, index) => (
          <button
            type="button"
            className={index === selectedIndex ? styles.activeThumbnail : undefined}
            onClick={() => setSelectedIndex(index)}
            key={photo.src}
            aria-label={`${index + 1}번째 사진 보기`}
          >
            <Image
              src={photo.src}
              alt=""
              width={360}
              height={360}
              sizes="88px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

