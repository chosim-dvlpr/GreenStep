import tokenHttp from "./tokenHttp";

/** AVATAR API */
export const AvatarAPI = {
    /** 마이페이지 캐릭터 조회*/
    getAvatarAxios: function () {
      return tokenHttp.request({
        method: "GET",
        url: '/avatar',
      });
    },
    /** 캐릭터 선택 */
    patchAvatarAxios: function (boxId: number) {
      return tokenHttp.request({
        method: "PATCH",
        url: `/avatar/${boxId}`,
      });
    }
  }