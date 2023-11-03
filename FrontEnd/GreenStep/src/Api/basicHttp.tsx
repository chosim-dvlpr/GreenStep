import axios from "axios";
import { EmailLoginDataType } from "../Page/Main";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://k9b303.p.ssafy.io/api',
});

/** 로그인 관련 API */
export const LoginAPI = {
  /** 카카오에서 받은 토큰을 백으로 넘겨줌 */
  getLoginAxios: function (token: string) {
    return axiosInstance.request({
      method: "GET",
      url: '/login',
    });
  },
  getEmailLoginAxios: function (data: EmailLoginDataType) {
    return axiosInstance.request({
      method: "POST",
      url: '/login',
    });
  },
}

/** 메인 화면 API */
export const MainAPI = {
  /** 메인화면의 총 거리, 시간 조회 */
  mainDataAxios: function () {
    return axiosInstance.request({
      method: "GET",
      url: '/',
    });
  },
  /** 메인화면의 플로깅 이미지 조회 */
  mainImageAxios: function () {
    return axiosInstance.request({
      method: "GET",
      url: '/picture',
    });
  },
}
