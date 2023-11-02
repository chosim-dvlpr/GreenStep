
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

interface LoginPropsType {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({setIsLogin}: LoginPropsType) => {
  const [result,setResult] = useState<string>('');

  const getLogin = (token: string) => {
    LoginAPI.getLogin(token)
      .then(res => {
        console.log('axios 성공 : ', res)
      })
      .catch(err => {
        console.log("login axios 에러 발생: ", err);
      });
  }
  

  /** 카카오 로그인 */
  const signInWithKakao = async (): Promise<void> => {
    try {
      // const token: KakaoOAuthToken = await login();
      const token: KakaoOAuthToken = await loginWithKakaoAccount();
      console.log(token);
      setResult(JSON.stringify(token));
      getLogin(token.accessToken)

      // 로그인 성공 조건 추가
      setIsLogin(true);

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