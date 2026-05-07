import BackgroundMusic from "@/components/BackgroundMusic";
import BottomActionBar from "@/components/BottomActionBar";
import DayCountdown from "@/components/DayCountdown";
import KakaoMap from "@/components/KakaoMap";
import PhotoGallery from "@/components/PhotoGallery";
import Image from "next/image";
import {
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
      <BackgroundMusic />
      <section className={styles.cover} aria-label="집들이 초대장 표지">
        <div className={styles.coverText}>
          <p className={styles.smallTitle}>Housewarming Invitation</p>
          <h1>미림 그리고 규웅</h1>
          <p className={styles.coverLine}>새로운 집에서 처음 나누는 초대</p>
        </div>
        <div className={styles.coverPhoto} />
        <div className={styles.coverDateBlock}>
          <DayCountdown invitation={invitation} />
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
        <address>
          경기도 오산시 운암로 45
          <br />
          운암주공4단지 405동 1604호
        </address>
        <div className={styles.contactBadges} aria-label="연락처">
          <a href="tel:010-6279-5026" aria-label="규웅에게 전화하기">
            <span>규웅</span>
            <i className={styles.phoneIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8.5 5.5 10.2 9c.3.6.1 1.3-.4 1.7l-1.1.9c.9 1.9 2.4 3.4 4.2 4.2l.9-1.1c.4-.5 1.1-.7 1.7-.4l3.5 1.7c.7.3 1 1.1.8 1.8l-.5 1.8c-.2.8-1 1.3-1.8 1.2C10.1 20 4 13.9 3.2 6.5c-.1-.8.4-1.6 1.2-1.8l1.8-.5c.7-.2 1.5.1 1.8.8Z" />
              </svg>
            </i>
          </a>
          <a href="tel:010-7574-4269" aria-label="미림에게 전화하기">
            <span>미림</span>
            <i className={styles.phoneIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8.5 5.5 10.2 9c.3.6.1 1.3-.4 1.7l-1.1.9c.9 1.9 2.4 3.4 4.2 4.2l.9-1.1c.4-.5 1.1-.7 1.7-.4l3.5 1.7c.7.3 1 1.1.8 1.8l-.5 1.8c-.2.8-1 1.3-1.8 1.2C10.1 20 4 13.9 3.2 6.5c-.1-.8.4-1.6 1.2-1.8l1.8-.5c.7-.2 1.5.1 1.8.8Z" />
              </svg>
            </i>
          </a>
        </div>
        <div className={styles.mapBox}>
          <KakaoMap />
        </div>
        <div className={styles.mapActionGrid} aria-label="지도와 내비게이션 링크">
          <a href={tmapRouteUrl}>
            <i className={styles.actionIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 5h14v4h-5v10h-4V9H5V5Z" />
              </svg>
            </i>
            <span>티맵</span>
          </a>
          <a href={kakaoRouteMobileWebUrl} target="_blank" rel="noreferrer">
            <i className={styles.actionIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 19 12 4l7 15-7-3-7 3Z" />
              </svg>
            </i>
            <span>카카오내비</span>
          </a>
        </div>
      </section>

      <BottomActionBar invitation={invitation} />
    </main>
  );
}
