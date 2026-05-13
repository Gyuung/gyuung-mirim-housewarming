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
  coverLine?: string;
  messageLabel?: string;
  messageTitle: string;
  messageBody: string[];
  countdownPastMessage?: string;
};

export const invitations: Invitation[] = [
  {
    slug: "2026-02-22",
    year: "2026",
    monthName: "February",
    day: "22",
    weekdayKo: "일요일",
    weekdayEn: "Sunday",
    dateLabel: "2026년 2월 22일 일요일",
    timeLabel: "입주일",
    coverDate: "2026. 02. 22. Sun.",
    calendarStart: "20260222",
    calendarEnd: "20260223",
    coverLine: "우리가 함께 살기 시작한 날",
    messageLabel: "Our Home",
    messageTitle: "함께 한지",
    messageBody: [
      "2026년 2월 22일부터 이 집에서 함께 지내고 있어요.",
      "초대받은 손님은 아니지만, 이 공간의 주인공으로 우리의 시작을 오래 기억하고 싶어요.",
    ],
    countdownPastMessage: "우리 둘이 같이 산 지",
  },
  {
    slug: "2026-06-12",
    year: "2026",
    monthName: "June",
    day: "12",
    weekdayKo: "금요일",
    weekdayEn: "Friday",
    dateLabel: "2026년 6월 12일 금요일",
    timeLabel: "오후 8시",
    coverDate: "2026. 06. 12. Fri. 8:00 PM",
    calendarStart: "20260612T110000Z",
    calendarEnd: "20260612T150000Z",
    messageTitle: "소중한 분들을\n우리의 집으로 초대합니다",
    messageBody: [
      "이사 후 정리도 끝나고, 이제 좋아하는 사람들을 초대할 차례가 되었어요. 거창한 자리는 아니지만 따뜻한 음식과 편한 시간을 준비해둘게요.",
      "부담 없이 들러서 함께 웃고 이야기 나눠요.",
    ],
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
    messageTitle: "소중한 분들을\n우리의 집으로 초대합니다",
    messageBody: [
      "이사 후 정리도 끝나고, 이제 좋아하는 사람들을 초대할 차례가 되었어요. 거창한 자리는 아니지만 따뜻한 음식과 편한 시간을 준비해둘게요.",
      "부담 없이 들러서 함께 웃고 이야기 나눠요.",
    ],
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
    messageTitle: "소중한 분들을\n우리의 집으로 초대합니다",
    messageBody: [
      "이사 후 정리도 끝나고, 이제 좋아하는 사람들을 초대할 차례가 되었어요. 거창한 자리는 아니지만 따뜻한 음식과 편한 시간을 준비해둘게요.",
      "부담 없이 들러서 함께 웃고 이야기 나눠요.",
    ],
  },
];

const guestInvitationSlugs = new Map<string, string>(
  [
    ["왕규웅", "2026-02-22"],
    ["박미림", "2026-02-22"],
    ["최성환", "2026-06-12"],
    ["이동혁", "2026-06-12"],
    ["고동혁", "2026-06-12"],
    ["배유정", "2026-05-29"],
    ["강다은", "2026-05-29"],
    ["양정석", "2026-05-30"],
    ["송현호", "2026-05-30"],
    ["김영선", "2026-05-30"],
    ["박정빈", "2026-05-30"],
  ] as const
);

export function normalizeGuestName(name: string) {
  return name.replace(/\s/g, "");
}

export function getInvitationSlugByGuestName(name: string) {
  return guestInvitationSlugs.get(normalizeGuestName(name));
}

export function getInvitation(slug: string) {
  return invitations.find((invitation) => invitation.slug === slug);
}
