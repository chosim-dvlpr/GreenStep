import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Login from '../Component/Main/Login';
import Carousel from '../Component/Main/Carousel';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import { useNavigation } from '@react-navigation/native';
import { LoginAPI, MainAPI } from '../Api/basicHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tokenHttp from '../Api/tokenHttp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';

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
  margin-top: 15%;
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
  // const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  
  // 토큰 확인
  // const { stateAccessToken, stateRefreshToken } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (AsyncStorage.getItem('accessToken')) {
      console.log('토큰을 갖고 있습니다.')
      setIsLogin(true)
    }
  }, [])
  
  // 메인 문구 불러오기
  const [trashAmount, setTrashAmount] = useState<number>(0);
  const [travelRange, setTravelRange] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);

  const getMainData = () => {
    MainAPI.mainDataAxios()
    .then(res => {
      console.log("메인 문구 axios 성공 : ", res)
      const data = res.data;
      setTrashAmount(data.trashAmount);
      setTravelRange(data.travelRange);
      setTravelTime(data.travelTime);
    })
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


  // // 임시 로그인
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  // const onChangeEmail = (e: string) => {
  //   setEmail(e)
  // }
  // const onChangePassword = (e: string) => {
  //   setPassword(e)
  // }

  /** 이메일 버튼 클릭 시 axios 요청 */
  // const emailLogin = async () => {
  //   const data: EmailLoginDataType = await {
  //     email: email,
  //     password: password
  //   }
  //   LoginAPI.getEmailLoginAxios(data)
  //   .then(res => {
  //     console.log('이메일 로그인 axios 성공 : ', res)
  //     const response = res.data;
  //     if (response.state === 200) {
  //       setIsLogin(true);
  //       AsyncStorage.setItem('accessToken', response.data.accessToken)
  //       AsyncStorage.setItem('refreshToken', response.data.refreshToken)
  //       // AsyncStorage.setItem('refreshTokenExpirationTime', response.data.refreshTokenExpirationTime)
  //     } else if (response.status === 400) {
  //       console.log(response.message)
  //     }
  //   })
  //   .catch(err => console.log('이메일 로그인 실패 : ', err))
  // }

  // const logout = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem('accessToken');
  //     const refreshToken = await AsyncStorage.getItem('refreshToken');
  
  //     const data = {
  //       accessToken: accessToken,
  //       refreshToken: refreshToken
  //     };
  
  //     console.log('logout 실행');
  //     tokenHttp.post('/user/logout', data)
  //       .then(res => {
  //         AsyncStorage.removeItem('accessToken');
  //         AsyncStorage.removeItem('refreshToken');
  //       })
  //       .catch(err => console.log('로그아웃 실패 : ', err));
  //   } catch (error) {
  //     console.error('로그아웃 중 오류 발생:', error);
  //   }
  // };
  
  

  return (
    <View>
      {/* 임시 로그인 */}
      {/* <View style={{flexDirection: 'row'}}>
        <TextInput
        onChangeText={e => onChangeEmail(e)}
        style={{backgroundColor: 'skyblue', width: 100}}
        ></TextInput>
        <TextInput
        onChangeText={e => onChangePassword(e)}
        style={{backgroundColor: 'lightgreen', width: 100}}
        ></TextInput>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
        style={[ButtonStyle.smallButton, ButtonStyle.lightGreenColor]}
        onPress={emailLogin}
        ><Text>임시 로그인 버튼</Text></TouchableOpacity>
        <TouchableOpacity
        style={[ButtonStyle.smallButton, ButtonStyle.lightGreenColor]}
        onPress={logout}
        ><Text>임시 로그아웃 버튼</Text></TouchableOpacity>
        <TouchableOpacity
        style={[ButtonStyle.smallButton, ButtonStyle.lightGreenColor]}
        // onPress={}
        ><Text>임시 회원가입 버튼</Text></TouchableOpacity>
      </View> */}
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
          {travelTime} 시간{'\n'}
          {travelRange} km
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
