import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const URL = 'https://k9b303.p.ssafy.io/api'

interface getTokensType {
  kakaoToken: string,
  setIsLogin: Dispatch<SetStateAction<boolean>>,
  navigation: any
}

export const getTokens = ({ kakaoToken, setIsLogin, navigation}: getTokensType) => {
    axios.post(`${URL}/login`,
    {
      "kakaoToken": kakaoToken,
    })
    .then(res =>{{
      //accessToken, refreshToken 로컬에 저장
      if (res.status === 200){
        AsyncStorage.setItem('Tokens', JSON.stringify({
          'accessToken': res.data.accessToken,
          'refreshToken': res.data.refreshToken,
          'userId': res.data.userId
        }))
        setIsLogin(true);
        navigation.navigate('main');
      }
    }})
    .catch(error =>{
      if(error.response.status === 401){
        console.log(error.response.data)
      }
      else{
        console.log("알수없는 오류")
      } 
    })
};

// async storage에 저장된 토큰을 가져오기
const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem("Tokens");
    if (value !== null) {
      return JSON.parse(value)
    }
    else{
      return null;
    }
  } catch (err: any) {
    console.log(err.message);
  }
};


export const verifyTokens = async ({setIsLogin, navigation}: getTokensType) => {
  const Token = await getTokenFromLocal();

  // 최초 접속
  if (Token === null){
    navigation.reset({routes: [{name: 'main'}]});
    console.log('최초 접속 : 토큰이 없음')
  }
  // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증 
  else{
    const headers_config = {
      'refresh': Token.refreshToken,
      Authorization: `Bearer ${Token.accessToken}`   
    };

    try {
      const res = await axios.get(`${URL}/refresh`, {headers: headers_config})

      // accessToken 만료, refreshToken 정상 -> 재발급된 accessToken 저장 후 자동 로그인
      AsyncStorage.setItem('Tokens', JSON.stringify({
        ...Token,
        'accessToken': res.data.data.accessToken,
      }))
      navigation.reset({routes: [{name: 'main'}]});
      setIsLogin(true);

    } catch(error: any){
      const code = error.response.data.code; 

      navigation.reset({routes: [{name: 'main'}]});

      // accessToken 만료, refreshToken 만료 -> 로그인 페이지
      // if(code === 401){
        // navigation.reset({routes: [{name: 'main'}]});
      // }
      // // accessToken 정상, refreshToken 정상 -> 자동 로그인
      // else{
      //   navigation.reset({routes: [{name: 'main'}]});
      // }
    }
  }
};