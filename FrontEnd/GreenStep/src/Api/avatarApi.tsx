import axios from "axios";
import tokenHttp from "./tokenHttp";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://k9b303.p.ssafy.io/api',
  });

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
        url: `/${boxId}/avatar`,
      });
    }
  }