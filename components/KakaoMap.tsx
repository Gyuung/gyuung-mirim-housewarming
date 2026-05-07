"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { houseLocation, kakaoMapUrl } from "@/lib/location";
import styles from "./KakaoMap.module.css";

declare global {
  interface Window {
    kakao?: {
      maps?: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number }
        ) => unknown;
        Marker: new (options: { position: unknown }) => {
          setMap: (map: unknown) => void;
        };
      };
    };
  }
}

const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  const renderMap = () => {
    if (!mapRef.current || !window.kakao?.maps) {
      return;
    }

    window.kakao.maps.load(() => {
      if (!mapRef.current || !window.kakao?.maps) {
        return;
      }

      const center = new window.kakao.maps.LatLng(houseLocation.lat, houseLocation.lng);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      });
      const marker = new window.kakao.maps.Marker({ position: center });

      marker.setMap(map);
      setMapReady(true);
    });
  };

  if (kakaoMapKey) {
    return (
      <>
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`}
          strategy="afterInteractive"
          onLoad={renderMap}
        />
        <div className={styles.mapCanvas} ref={mapRef} aria-label="집들이 장소 카카오 지도" />
        {!mapReady ? (
          <a
            className={styles.mapFallback}
            href={kakaoMapUrl}
            target="_blank"
            rel="noreferrer"
          >
            카카오 지도 불러오는 중
          </a>
        ) : null}
      </>
    );
  }

  return (
    <a
      className={styles.kakaoMap}
      href={kakaoMapUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="카카오 지도에서 집들이 장소 열기"
    >
      <span>KAKAO MAP</span>
      <strong>{houseLocation.placeName}</strong>
      <em>{houseLocation.address}</em>
    </a>
  );
}
