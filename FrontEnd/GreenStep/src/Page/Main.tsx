import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Login from '../Component/Main/Login';
import Carousel from '../Component/Main/Carousel';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {MainAPI} from '../Api/basicHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EmailLoginDataType {
  email: string;
  password: string;
}

const MainText = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: black;
  font-family: 'SUITE-Bold';
`;

const MainTextContainer = styled.View`
  margin-top: 15%;
  margin-left: 30;
  margin-bottom: 25;
`;

const CarouselContainer = styled.View`
  margin-bottom: 20;
  height: 57%;
`;

const LoginContainer = styled.View`
  align-items: center;
`;

// 메인 텍스트 컨테이너
const CarouselTextContainer = styled.View`
  position: absolute;
  left: 30%;
  top: 60%;
  z-index: 1;
`;

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;


const Main = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      console.log('토큰을 갖고 있습니다.', token);
      setIsLogin(true);
    } else {
      console.log('토큰이 없습니다.');
    }
  };

  useEffect(() => {
    checkToken();
  }, [isLogin, isFocused, ]);

  // 메인 문구 불러오기
  const [trashAmount, setTrashAmount] = useState<number>(0);
  const [travelRange, setTravelRange] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);

  const getMainData = () => {
    MainAPI.mainDataAxios()
      .then(res => {
        console.log('메인 문구 axios 성공');
        const data = res.data;
        setTrashAmount(data.trashAmount);
        setTravelRange(data.travelRange);
        setTravelTime(data.travelTime);
      })
      .catch(err => console.log('메인 데이터 axios 에러 : ', err));
  };

  useEffect(() => {
    getMainData();
    return () => {
    };
  }, [isFocused,]);

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

  const logout = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('testToken');
      console.log('logout 실행');
      setIsLogin(false);
      //   tokenHttp.post('/user/logout', data)
      //     .then(res => {
      //       AsyncStorage.removeItem('accessToken');
      //       AsyncStorage.removeItem('refreshToken');
      //       setIsLogin(false);
      //     })
      //     .catch(err => console.log('로그아웃 실패 : ', err));
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <View>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
      
        <MainTextContainer>
          <MainText>자연을 지키는</MainText>
          <MainText>당신과 우리의 발자국</MainText>
          <MainText>그린스텝</MainText>
        </MainTextContainer>

      <CarouselContainer>
        <CarouselTextContainer>
          <Text
          style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'SUITE-Bold'}}
          >자연을 지킨{'\n'}
          {travelTime} 시간{'\n'}
          {travelRange.toFixed(3)} km
          </Text>
        </CarouselTextContainer>
        <Carousel />
      </CarouselContainer>

        <LoginContainer>
          {isLogin ? (
            <View style={{width: '100%', alignItems: 'center'}}>
              {/* <TouchableOpacity onPress={logout}>
                <Text>로그아웃</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ploggingstart')}
                style={[ButtonStyle.largeButton, ButtonStyle.lightGreenColor]}>
                <Text style={styles.goToPloggingText}>플로깅 하러가기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Login setIsLogin={setIsLogin} />
          )}
        </LoginContainer>
      </ContainerBg>
    </View>
  );
};

const styles = StyleSheet.create({
  goToPloggingText: {
    fontSize: 16, 
    fontWeight: '500',
    fontFamily: 'SUITE-Bold'
  },
  mainFont: {
    fontSize: 24, 
    fontFamily: 'SUITE-Bold', 
    color: 'lightgray', 
    marginBottom: 4, 
    fontWeight: 'bold'
  }
})

export default Main;
