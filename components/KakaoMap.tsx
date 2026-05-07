"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { houseLocation, kakaoMapUrl } from "@/lib/location";
import styles from "./KakaoMap.module.css";

declare global {
  interface Window {
    kakao?: {
      maps?: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: Record<string, unknown>) => unknown;
        Marker: new (options: Record<string, unknown>) => { setMap: (map: unknown) => void };
      };
    };
  }
}

const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

export default function KakaoMap() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !window.kakao?.maps) {
      return;
    }

    window.kakao.maps.load(() => {
      const container = document.getElementById("kakao-map");

      if (!container || !window.kakao?.maps) {
        return;
      }

      const center = new window.kakao.maps.LatLng(houseLocation.lat, houseLocation.lng);
      const map = new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });
      const marker = new window.kakao.maps.Marker({ position: center });
      marker.setMap(map);
    });
  }, [ready]);

  if (!kakaoKey) {
    return (
      <a className={styles.fallback} href={kakaoMapUrl} target="_blank">
        <span>Kakao Map</span>
        <strong>{houseLocation.placeName}</strong>
        <em>{houseLocation.address}</em>
      </a>
    );
  }

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div id="kakao-map" className={styles.map} aria-label="집들이 장소 지도" />
    </>
  );
}

