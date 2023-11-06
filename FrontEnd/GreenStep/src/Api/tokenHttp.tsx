import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";


// 토큰이 필요한 인증에 사용
const baseURL = "https://k9b303.p.ssafy.io/api";

const tokenHttp = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


// 요청 인터셉터 설정 (요청 보내기 전에 수행되는 함수)
tokenHttp.interceptors.request.use(async (req) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  
  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  const user = jwtDecode<JwtPayload>(accessToken);
  const isExpired = dayjs().diff(dayjs.unix(user.exp as number)) < 1;

  // access token 이 만료되지 않았다면 access-token 을 넣어 요청 실행
  if (isExpired) {
    req.headers['Authorization'] = accessToken;
    
    return req;
  }

  // 만료되었다면 refresh-token으로 token 재발급
  console.log("api/tokenHttp.js : access token 만료");
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
        console.log('토큰 업데이트 완료')
        AsyncStorage.setItem("accessToken", response.data.data["accessToken"]);
        AsyncStorage.setItem("refreshToken", response.data.data["refreshToken"]);
      } else {
        console.log('토큰 업데이트 실패')
        throw new Error("expire token");
      }
    })
    .catch(() => {
      console.log('await axios 오류')
      throw new Error("expire token");
    });

  req.headers["Authorization"] = AsyncStorage.getItem("accessToken");
  return req;
});

export default tokenHttp;