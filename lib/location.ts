export const houseLocation = {
  name: "미림 규웅 House",
  placeName: "운암주공4단지 405동",
  address: "경기도 오산시 운암로 45 운암주공4단지 405동 1604호",
  lat: 37.15125,
  lng: 127.07725,
};

export const encodedPlaceName = encodeURIComponent(houseLocation.name);

export const kakaoMapUrl = `https://map.kakao.com/link/map/${encodedPlaceName},${houseLocation.lat},${houseLocation.lng}`;
export const kakaoRouteUrl = `https://map.kakao.com/link/to/${encodedPlaceName},${houseLocation.lat},${houseLocation.lng}`;
export const kakaoRouteMobileWebUrl = `https://m.map.kakao.com/scheme/route?ep=${houseLocation.lat},${houseLocation.lng}&by=car`;
export const tmapRouteUrl = `tmap://route?goalname=${encodedPlaceName}&goalx=${houseLocation.lng}&goaly=${houseLocation.lat}`;

