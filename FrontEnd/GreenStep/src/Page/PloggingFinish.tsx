import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const HeaderText = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: black;
`

const HeaderTextContainer = styled.View`
  margin-top: 50;
  margin-left: 30;
`

const PloggingFinish = () => {
  return (
    <View>
      {/* 헤더 */}
      <HeaderTextContainer>
        <HeaderText>오늘도 해냈어요!</HeaderText>
      </HeaderTextContainer>

      {/* 플로깅 데이터 */}

      {/* 인증하기 버튼 */}

      {/* 인증 사진/회색 빈 칸 */}
      
    </View>
  );
};

export default PloggingFinish;
