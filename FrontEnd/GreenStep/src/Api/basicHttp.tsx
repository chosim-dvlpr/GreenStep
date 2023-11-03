import axios from "axios";

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
  }
}
