import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Login from '../Component/Main/Login';
import Carousel from '../Component/Main/Carousel';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import { useNavigation } from '@react-navigation/native';
import { LoginAPI, MainAPI } from '../Api/basicHttp';

export interface EmailLoginDataType {
  'email': string,
  'password': string,
}

const MainText = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: black;
`

const MainTextContainer = styled.View`
  margin-top: 75;
  margin-left: 30;
  margin-bottom: 25;
`

const CarouselContainer = styled.View`
  margin-bottom: 20;
  height: 57%;
  `

const LoginContainer = styled.View`
  align-items: center;
`

// 메인 텍스트 컨테이너
const CarouselTextContainer = styled.View`
  position: absolute;
  left: 30%;
  top: 60%;
  z-index: 1;
`

const Main = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  
  // 메인 문구 불러오기
  const getMainData = () => {
    MainAPI.mainDataAxios()
    .then(res => console.log(res))
    .catch(err => console.log('메인 데이터 axios 에러 : ', err))
  }

  // 플로깅 이미지 불러오기
  const getMainImage = () => {
    MainAPI.mainImageAxios()
    .then(res => console.log(res))
    .catch(err => console.log('메인 이미지 axios 에러 : ', err))
  }

  useEffect(() => {
    getMainData();
    getMainImage();
  }, [])

  // 임시 로그인
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onChangeEmail = (e: string) => {
    setEmail(e)
  }
  const onChangePassword = (e: string) => {
    setPassword(e)
  }
  const emailLogin = async () => {
    const data: EmailLoginDataType = await {
      'email': email,
      'password': password
    }

    LoginAPI.getEmailLoginAxios(data)
    .then(res => console.log('이메일 로그인 성공 : ', res))
    .catch(err => console.log('이메일 로그인 실패 : ', err))
  }

  return (
    <View>
      {/* 임시 로그인 */}
      {/* <TextInput
      onChangeText={e => onChangeEmail(e)}
      style={{backgroundColor: 'skyblue'}}
      ></TextInput>
      <TextInput
      onChangeText={e => onChangePassword(e)}
      style={{backgroundColor: 'lightgreen'}}
      ></TextInput>
      <TouchableOpacity
      style={[ButtonStyle.largeButton, ButtonStyle.lightGreenColor]}
      onPress={emailLogin}
      ><Text>임시 로그인 버튼</Text></TouchableOpacity> */}

      <MainTextContainer>
        <MainText>자연을 지키는</MainText>
        <MainText>당신과 우리의 발자국</MainText>
        <MainText>그린스텝</MainText>
      </MainTextContainer>

      <CarouselContainer>
        <CarouselTextContainer>
          <Text
          style={{fontSize: 24, fontWeight: 'bold'}}
          >자연을 지킨{'\n'}
          18734 시간{'\n'}
          3254988 km
          </Text>
        </CarouselTextContainer>
        <Carousel/>
      </CarouselContainer>

      <LoginContainer>
      {
        isLogin ?
        <TouchableOpacity
          onPress={() => navigation.navigate('ploggingstart')}
          style={[ButtonStyle.largeButton, ButtonStyle.lightGreenColor]}
        >
          <Text>플로깅 하러가기</Text>
        </TouchableOpacity>
        : <Login setIsLogin={setIsLogin}/>
      }
      </LoginContainer>
    </View>
  );
};

export default Main;
