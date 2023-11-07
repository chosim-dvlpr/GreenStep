import tokenHttp from "./tokenHttp";

/** PROFILE API */
export const ProfileAPI = {
    /** 마이페이지 헤더 조회(캐릭터, 닉네임, 레벨) */
    getHeaderAxios: function () {
      return tokenHttp.request({
        method: "GET",
        url: '/mypage',
      });
    },
    /** 마이페이지 플로깅 내역 조회(시간, 거리, 쓰레기, 달성 업적) */
    getMyPloggingAxios: function () {
      return tokenHttp.request({
        method: "GET",
        url: '/mypage/my-plogging',
      });
    },
    /** 마이페이지 스트릭 내역 조회 */
    getStreakAxios: function (year:number) {
      return tokenHttp.request({
        method: "GET",
        url: `/mypage/${year}/streak`,
      });
    },
    /** 마이페이지 플로깅 리스트 조회 */
    getPloggingListAxios: function () {
        return tokenHttp.request({
            method: "GET",
            url: `/plogging`,
        });
    },
    /** 플로깅 상세조회 */
    getPloggingDetailAxios: function (ploggingId :number) {
        return tokenHttp.request({
            method: "GET",
            url: `/plogging/${ploggingId}/detail`,
        });
    },
  }