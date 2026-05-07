import BottomActionBar from "@/components/BottomActionBar";
import KakaoMap from "@/components/KakaoMap";
import type { Invitation } from "@/lib/invitations";
import { houseLocation, kakaoMapUrl, kakaoRouteUrl, tmapRouteUrl } from "@/lib/location";
import styles from "./InvitationView.module.css";

type Detail = {
  label: string;
  value: string;
};

type InvitationViewProps = {
  invitation: Invitation;
};

export default function InvitationView({ invitation }: InvitationViewProps) {
  const details: Detail[] = [
    { label: "날짜", value: invitation.dateLabel },
    { label: "시간", value: invitation.timeLabel },
    { label: "장소", value: houseLocation.address },
  ];

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=%EC%A7%91%EB%93%A4%EC%9D%B4%20%EC%B4%88%EB%8C%80&dates=${invitation.calendarStart}/${invitation.calendarEnd}&location=${encodeURIComponent(houseLocation.address)}&details=%EC%83%88%EC%A7%91%EC%97%90%EC%84%9C%20%ED%95%A8%EA%BB%98%ED%95%B4%EC%9A%94.`;

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
          <div className={styles.galleryPhoto} />
          <figcaption>Our warm housewarming day</figcaption>
        </figure>
      </section>

      <section className={styles.dateSection} id="details" aria-label="초대 일시">
        <p className={styles.smallTitle}>Date & Place</p>
        <div className={styles.calendarCard}>
          <span>{invitation.monthName}</span>
          <strong>{invitation.day}</strong>
          <span>{invitation.weekdayEn}</span>
        </div>
        <div className={styles.detailList}>
          {details.map((detail) => (
            <div className={styles.detailRow} key={detail.label}>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.locationSection}>
        <p className={styles.smallTitle}>Location</p>
        <h2>{houseLocation.name}</h2>
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
          <div>
            <span>도착</span>
            <strong>405동 1604호</strong>
          </div>
        </div>
        <div className={styles.mapActionGrid} aria-label="지도와 내비게이션 링크">
          <a href={kakaoMapUrl} target="_blank">
            <span>지도보기</span>
            <em>위치 확인</em>
          </a>
          <a href={kakaoRouteUrl} target="_blank">
            <span>카카오맵</span>
            <em>길찾기</em>
          </a>
          <a href={tmapRouteUrl}>
            <span>티맵</span>
            <em>내비 연결</em>
          </a>
          <a href={calendarUrl} target="_blank">
            <span>일정저장</span>
            <em>캘린더</em>
          </a>
        </div>
      </section>

      <section className={styles.rsvpSection}>
        <p className={styles.smallTitle}>RSVP</p>
        <h2>참석 여부를 알려주세요.</h2>
        <p>인원에 맞춰 음식과 음료를 준비하려고 해요.</p>
        <a
          href="sms:+821012345678?body=%EC%A7%91%EB%93%A4%EC%9D%B4%20%EC%B0%B8%EC%84%9D%ED%95%A0%EA%B2%8C%EC%9A%94!"
          className={`${styles.primaryButton} ${styles.wideButton}`}
        >
          문자로 답장하기
        </a>
      </section>

      <BottomActionBar invitation={invitation} />
    </main>
  );
}
