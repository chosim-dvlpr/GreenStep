import axios from "axios";
import { EmailLoginDataType } from "../Page/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://k9b303.p.ssafy.io/api',
});

/** 로그인 관련 API */
export const LoginAPI = {
  /** 카카오에서 받은 토큰을 백으로 넘겨줌 */
  getLoginAxios: function (token: string) {
    return axiosInstance.request({
      method: "POST",
      url: '/user/login',
      data: token,
    });
  },
  /** 임시 이메일 로그인 API */
  getEmailLoginAxios: function (data: EmailLoginDataType) {
    return axiosInstance.request({
      method: "POST",
      url: '/user/login',
      data: data,
    });
  },
}

/** 메인 화면 API */
export const MainAPI = {
  /** 메인화면의 총 거리, 시간 조회 */
  mainDataAxios: function () {
    return axiosInstance.request({
      method: "GET",
      url: '/main',
    });
  },
  /** 메인화면의 플로깅 이미지 조회 */
  mainImageAxios: function () {
    return axiosInstance.request({
      method: "GET",
      url: '/main/picture',
    });
  },
}

export const TokenAPI = {
  /** 로그아웃 요청 */
  logoutAxios: async function() {
    const tokens = await AsyncStorage.getItem('Tokens')
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      const accessToken = parsedTokens.accessToken;
      const refreshToken = parsedTokens.refreshToken;
      
      return axiosInstance.request({
        method: "POST",
        url: '/user/logout',
        data: {
          'accessToken': accessToken,
          'refreshToken': refreshToken,
        }
      });
    };
  },
  
}