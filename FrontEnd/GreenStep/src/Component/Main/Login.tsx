
import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  KakaoProfileNoneAgreement,
  login,
  loginWithKakaoAccount,
  logout,
  unlink,
  getProfile,
} from '@react-native-seoul/kakao-login';
import ButtonStyle from '../../Style/ButtonStyle';
import { LoginAPI } from '../../Api/basicHttp';
// import { getTokens } from '../../Api/tokenHttp';
import { useNavigation } from '@react-navigation/native';

interface LoginPropsType {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({setIsLogin}: LoginPropsType) => {
  const [result,setResult] = useState<string>('');
  const navigation = useNavigation();
  
  const getLogin = async () => {
    console.log('getLogin 함수 실행')
    try {
      const token: KakaoOAuthToken = await loginWithKakaoAccount();
      console.log("token : ", token.accessToken);
      await setResult(JSON.stringify(token))
    } catch (err) {
      console.log("getLogin 함수 에러 발생 : ", err);
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
      .then(res => {
        // console.log(result)
        LoginAPI.getLoginAxios(result.accessToken)
        .then(res => {
          console.log('axios 성공 : ', res)
          // 로그인 성공 조건 추가
          setIsLogin(true);
        })
        .catch(err => {
          console.log("login axios 에러 발생: ", err);
        });
      })
    } catch(err) {
      console.log(err);
    }
  };
  
  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();
      console.log(message);
      setResult(message);
    } catch(err) {
      console.log(err);
    }
  };
  
  const getKakaoProfile = async (): Promise<void> => {
    try {
      const profile: KakaoProfile|KakaoProfileNoneAgreement = await getProfile();
      console.log(profile);
      setResult(JSON.stringify(profile));
    } catch(err) {
      console.log(err);
    }
  };
  
  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();
      console.log(message);
      setResult(message);
    } catch(err) {
      console.log(err);
    }
  };



  return (
    <View style={{width: '80%'}}>      
      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity
        onPress={() => signInWithKakao()}
        style={[ButtonStyle.kakaoButton]}
      >
        <Text>카카오로그인</Text>
      </TouchableOpacity>
    
      {/* <Button
        testID="btn-login"
        onPress={() => signInWithKakao()}
        title={'카카오 로그인'}
      /> */}
      {/* <View style={{marginTop: 12}} />
      <Button
        testID="btn-login"
        onPress={() => getKakaoProfile()}
        title={'프로필 조회'}
      />
      <View style={{marginTop: 12}} />
      <Button
        testID="btn-login"
        onPress={() => unlinkKakao()}
        title={'링크 해제'}
      />
      <View style={{marginTop: 12}} />
      <Button
        onPress={() => signOutWithKakao()}
        title={'카카오 로그아웃'}
      />
      <View style={{marginTop: 40}} /> */}
    </View>
  )
}

export default Login