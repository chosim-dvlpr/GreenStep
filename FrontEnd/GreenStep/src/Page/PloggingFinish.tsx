import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';

const HeaderText = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: black;
`

const HeaderTextContainer = styled.View`
  margin-top: 50;
  margin-left: 30;
`

const UploadPhotoButtonContainer = styled.View`
  margin-left: 20;
  margin-right: 20;
`

const PloggingFinish = () => {
  const uploadPhoto = () => {
    console.log('사진 업로드 버튼 클릭')
  };

  return (
    <View>
      {/* 헤더 */}
      <HeaderTextContainer>
        <HeaderText>오늘도 해냈어요!</HeaderText>
      </HeaderTextContainer>
 
      {/* 플로깅 데이터 */}

      {/* 인증하기 버튼 */}
      <UploadPhotoButtonContainer>
        <TouchableOpacity
        onPress={() => uploadPhoto()}
        style={[
          ButtonStyle.whiteColor, 
          ButtonStyle.fullLargeButton
        ]}
        >
          <Text 
          style={{color: '#8BCA84', fontWeight: 'bold', fontSize: 20}}
          >인증하기</Text>
        </TouchableOpacity>
      </UploadPhotoButtonContainer>

      {/* 인증 사진/회색 빈 칸 */}

    </View>
  );
};

export default PloggingFinish;
