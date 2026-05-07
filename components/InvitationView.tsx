import BottomActionBar from "@/components/BottomActionBar";
import KakaoMap from "@/components/KakaoMap";
import PhotoGallery from "@/components/PhotoGallery";
import Image from "next/image";
import {
  houseLocation,
  kakaoRouteMobileWebUrl,
  tmapRouteUrl,
} from "@/lib/location";
import type { Invitation } from "@/lib/invitations";
import styles from "./InvitationView.module.css";

type InvitationViewProps = {
  invitation: Invitation;
};

export default function InvitationView({ invitation }: InvitationViewProps) {
  return (
    <main className={styles.shell}>
      <section className={styles.cover} aria-label="집들이 초대장 표지">
        <div className={styles.coverText}>
          <p className={styles.smallTitle}>Housewarming Invitation</p>
          <h1>미림 그리고 규웅</h1>
          <p className={styles.coverLine}>새로운 집에서 처음 나누는 초대</p>
        </div>
        <div className={styles.coverPhoto} />
        <div className={styles.coverDateBlock}>
          <span>{invitation.year}</span>
          <strong>{invitation.coverDate}</strong>
        </div>
      </section>

      <section className={styles.messageSection}>
        <p className={styles.smallTitle}>Invite You</p>
        <h2>
          소중한 분들을
          <br />
          우리의 집으로 초대합니다
        </h2>
        <p>
          이사 후 정리도 끝나고, 이제 좋아하는 사람들을 초대할 차례가 되었어요.
          거창한 자리는 아니지만 따뜻한 음식과 편한 시간을 준비해둘게요.
        </p>
        <p>부담 없이 들러서 함께 웃고 이야기 나눠요.</p>
      </section>

      <section className={styles.photoSection} aria-label="초대 사진">
        <figure>
          <Image
            className={styles.galleryPhoto}
            src="/dog.jpg"
            alt="달롱이를 보러 오는 초대 사진"
            width={994}
            height={1372}
            sizes="(max-width: 460px) calc(100vw - 56px), 404px"
          />
          <figcaption>Our warm housewarming day</figcaption>
        </figure>
      </section>

      <section className={styles.gallerySection} aria-label="우리 사진 갤러리">
        <p className={styles.smallTitle}>Gallery</p>
        <h2>우리의 순간들</h2>
        <p className={styles.gallerySubTitle}>우리집엔 액자가 없어서, 사진 먼저 살짝 공유드려요.</p>
        <PhotoGallery />
      </section>

      <section className={styles.locationSection}>
        <p className={styles.smallTitle}>Location</p>
        <p className={styles.locationSubTitle}>{houseLocation.placeName}</p>
        <address>{houseLocation.address}</address>
        <div className={styles.mapBox}>
          <KakaoMap />
        </div>
        <div className={styles.locationInfo}>
          <div>
            <span>주소</span>
            <strong>{houseLocation.address}</strong>
          </div>
        </div>
        <div className={styles.mapActionGrid} aria-label="지도와 내비게이션 링크">
          <a href={kakaoRouteMobileWebUrl} target="_blank">
            <i className={styles.actionIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 19 12 4l7 15-7-3-7 3Z" />
              </svg>
            </i>
            <span>카카오내비</span>
            <em>자동차 안내</em>
          </a>
          <a href={tmapRouteUrl}>
            <i className={styles.actionIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 5h14v4h-5v10h-4V9H5V5Z" />
              </svg>
            </i>
            <span>티맵</span>
            <em>내비 연결</em>
          </a>
        </div>
      </section>

      <BottomActionBar invitation={invitation} />
    </main>
  );
}
