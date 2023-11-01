import React from 'react';
import { View } from 'react-native';
import Login from '../Component/Main/Login';
import Carousel from '../Component/Main/Carousel';
import styled from 'styled-components/native';

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
  justify-content: center;
  margin: auto;
  width: 80%;
`

const Main = () => {

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
        <Login/>
      </LoginContainer>
    </View>
  );
};

export default Main;
