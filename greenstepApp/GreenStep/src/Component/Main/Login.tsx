
import { Dispatch, SetStateAction } from 'react';
import {
  KakaoOAuthToken,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import { LoginAPI } from '../../Api/basicHttp';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginPropsType {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({setIsLogin}: LoginPropsType) => {    
  const getLogin = async () => {
    try {
      const newToken: KakaoOAuthToken = await loginWithKakaoAccount();
      return newToken
    } catch (err) {
      console.log(err);
    }
  }
  

  /** 카카오 로그인 */
  const signInWithKakao = async (): Promise<void> => {
    try {
      // 로그인 버튼 클릭 -> 로그인 성공 시 카카오에서 토큰 보내줌
      // -> 카카오 토큰을 백으로 보냄
      // -> 백에서 반환한 응답이 성공이면 setIsLogin(true)
      // -> 백에서 반환한 응답이 실패면 alert
      await getLogin()
      .then(response => {
        LoginAPI.getLoginAxios(response?.accessToken);
        .then(res => {
          const data = res.data.data;
          setIsLogin(true);
          AsyncStorage.setItem('accessToken', data.accessToken)
          AsyncStorage.setItem('refreshToken', data.refreshToken)
        })
        .catch(err => {
          console.log("login axios 에러 발생: ", err);
        });
      })
    } catch(err) {
      console.log(err);
    }

  return (
    <View style={{width: '90%'}}>      
      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity
        onPress={() => signInWithKakao()}
        style={[ButtonStyle.kakaoButton, {display: 'flex', flexDirection: 'row'}]}
      >
        <Image
        source={kakao}
        style={styles.kakaoImg}
        />
        <Text style={{fontSize: 16, fontFamily: 'SUITE-Bold'}}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  )
}


export default Login;
