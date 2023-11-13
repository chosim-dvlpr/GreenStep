import axios from "axios";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from 'buffer';

// 토큰이 필요한 인증에 사용
export const baseURL = "https://k9b303.p.ssafy.io/api";

const tokenHttp = axios.create({
  baseURL,
  headers: {
    "content-Type": "application/json",
  },
});


// 요청 인터셉터 설정 (요청 보내기 전에 수행되는 함수)
tokenHttp.interceptors.request.use(async (req) => {
  const accessToken = await AsyncStorage.getItem('accessToken')

  console.log(accessToken)

  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  const tokenData = Buffer.from(accessToken, 'base64');
  const binaryData = tokenData.toJSON().data; // 바이너리 데이터 추출
  const tokenDataString = String.fromCharCode.apply(null, binaryData); // 바이너리 데이터를 문자열로 변환

  // tokenDataString에서 JSON 데이터 부분 추출
  const jsonStart = tokenDataString.lastIndexOf('{');
  const jsonEnd = tokenDataString.lastIndexOf('}');
  const jsonData = tokenDataString.slice(jsonStart, jsonEnd+1);

  // JSON 데이터 파싱
  const tokenDataObject = JSON.parse(jsonData);

  // 만료 시간 계산
  const expirationTime = tokenDataObject.exp;
  const isExpired = dayjs().isAfter(dayjs.unix(expirationTime));
  // console.log('isExpired: ', isExpired);

  // access token 이 만료되지 않았다면 access-token 을 넣어 요청 실행
  if (!isExpired) {
    req.headers['Authorization'] = `Bearer ${accessToken}`;
    
    return req;
  }

  // 만료되었다면 refresh-token으로 token 재발급
  console.log("api/fileTokenHttp.js : access token 만료");
  const refreshToken = await AsyncStorage.getItem("refreshToken")

  await axios
    .post(
      `${baseURL}/user/reissue`,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      {
        headers: {
          // Authorization: AsyncStorage.getItem("accessToken"),
        },
      },
    )
    .then((response) => {
      console.log(response)
      if (response.data.status === 200) {
        console.log('토큰 업데이트 완료', response.data.data)
        AsyncStorage.setItem("accessToken", response.data.data.accessToken);
        AsyncStorage.setItem("refreshToken", response.data.data.refreshToken);
      } else {
        console.log('토큰 업데이트 실패')
        throw new Error("expire token");
      }
    })
    .catch(() => {
      console.log('await axios 오류')
      throw new Error("expire token");
    });
  
  const newToken = await AsyncStorage.getItem("accessToken");
  req.headers["Authorization"] =  `Bearer ${newToken}`;
  return req;
});

export default tokenHttp;