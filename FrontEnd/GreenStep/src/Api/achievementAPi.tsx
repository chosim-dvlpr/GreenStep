import tokenHttp from "./tokenHttp";

/** ACHIEVEMENT API */
export const AchievementAPI = {
    /** 업적 조회*/
    getAchievementAxios: function (achieveType : number) {
      return tokenHttp.request({
        method: "GET",
        url: `/achieve/${achieveType}`,
      });
    },
  }