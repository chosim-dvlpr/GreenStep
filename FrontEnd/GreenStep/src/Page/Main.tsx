import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Login from '../Component/Main/Login';
import Carousel from '../Component/Main/Carousel';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import { useNavigation } from '@react-navigation/native';

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

const Main = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  
  return (
    <View>
      <MainTextContainer>
        <MainText>자연을 지키는</MainText>
        <MainText>당신과 우리의 발자국</MainText>
        <MainText>그린스텝</MainText>
      </MainTextContainer>

      <CarouselContainer>
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
