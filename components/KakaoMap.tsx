import { houseLocation } from "@/lib/location";
import styles from "./KakaoMap.module.css";

const googleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  houseLocation.address,
)}&output=embed`;

export default function KakaoMap() {
  return (
    <iframe
      className={styles.map}
      title="집들이 장소 지도"
      src={googleMapUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
