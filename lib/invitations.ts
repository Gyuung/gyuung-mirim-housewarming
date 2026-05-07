export type Invitation = {
  slug: string;
  year: string;
  monthName: string;
  day: string;
  weekdayKo: string;
  weekdayEn: string;
  dateLabel: string;
  timeLabel: string;
  coverDate: string;
  calendarStart: string;
  calendarEnd: string;
};

export const invitations: Invitation[] = [
  {
    slug: "2026-05-09",
    year: "2026",
    monthName: "May",
    day: "09",
    weekdayKo: "토요일",
    weekdayEn: "Saturday",
    dateLabel: "2026년 5월 9일 토요일",
    timeLabel: "오후 4시",
    coverDate: "2026. 05. 09. Sat. 4:00 PM",
    calendarStart: "20260509T070000Z",
    calendarEnd: "20260509T110000Z",
  },
  {
    slug: "2026-05-29",
    year: "2026",
    monthName: "May",
    day: "29",
    weekdayKo: "금요일",
    weekdayEn: "Friday",
    dateLabel: "2026년 5월 29일 금요일",
    timeLabel: "시간 미정",
    coverDate: "2026. 05. 29. Fri. Time TBD",
    calendarStart: "20260529",
    calendarEnd: "20260530",
  },
  {
    slug: "2026-05-30",
    year: "2026",
    monthName: "May",
    day: "30",
    weekdayKo: "토요일",
    weekdayEn: "Saturday",
    dateLabel: "2026년 5월 30일 토요일",
    timeLabel: "시간 미정",
    coverDate: "2026. 05. 30. Sat. Time TBD",
    calendarStart: "20260530",
    calendarEnd: "20260531",
  },
];

export function getInvitation(slug: string) {
  return invitations.find((invitation) => invitation.slug === slug);
}
