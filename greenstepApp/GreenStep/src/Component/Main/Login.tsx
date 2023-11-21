
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import kakao from '../../Image/Login/kakao.png'

interface LoginPropsType {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({setIsLogin}: LoginPropsType) => {    
  const getLogin = async () => {
    try {
      const newToken: KakaoOAuthToken = await loginWithKakaoAccount();
      // await setToken(newToken);
      return newToken
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
      .then(response => {
        console.log('카카오 로그인 : ', response)

        LoginAPI.getLoginAxios(response?.accessToken)
        .then(res => {
          const data = res.data.data
          console.log('storage에 토큰 저장 성공 : ', JSON.stringify(data))
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
  };
  
  // const signOutWithKakao = async (): Promise<void> => {
  //   try {
  //     const message = await logout();
  //     console.log(message);
  //     setResult(message);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };
  
  // const getKakaoProfile = async (): Promise<void> => {
  //   try {
  //     const profile: KakaoProfile|KakaoProfileNoneAgreement = await getProfile();
  //     console.log(profile);
  //     setResult(JSON.stringify(profile));
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };
  
  // const unlinkKakao = async (): Promise<void> => {
  //   try {
  //     const message = await unlink();
  //     console.log(message);
  //     setResult(message);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };



  return (
    <View style={{width: '90%'}}>      
      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity
        onPress={() => signInWithKakao()}
        // style={[ButtonStyle.kakaoButton]}
        // style={{width: '100%', paddingBottom: 5, paddingTop: 5,}}
        style={[ButtonStyle.kakaoButton, {display: 'flex', flexDirection: 'row'}]}
      >
        <Image
        source={kakao}
        style={styles.kakaoImg}
        />
        <Text style={{fontSize: 16, fontFamily: 'SUITE-Bold'}}>카카오 로그인</Text>
        {/* <Image
        style={styles.kakaoImg}
        // source={{uri: "https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"}}
        /> */}
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

const styles = StyleSheet.create({
  kakaoImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  }
})


export default Login