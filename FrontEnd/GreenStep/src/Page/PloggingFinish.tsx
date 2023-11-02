import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import ImageStyle from '../Style/Image';

const PloggingFinishContainer = styled.View`
`

const HeaderText = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: black;
`

const HeaderTextContainer = styled.View`
  margin-top: 60;
  margin-left: 30;
`

const PloggingDataContainer = styled.View`
  width: 90%;
  margin: auto;
  margin-top: 30;
`

const UploadPhotoButtonContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 30;
`

const ImageContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 30;
`



const PloggingFinish = () => {

  const uploadPhoto = () => {
    console.log('사진 업로드 버튼 클릭')
  };

  return (
    <ScrollView>
      <PloggingFinishContainer>
        {/* 헤더 */}
        <HeaderTextContainer>
          <HeaderText>오늘도 해냈어요!</HeaderText>
        </HeaderTextContainer>
  
        {/* 플로깅 데이터 */}
        <PloggingDataContainer>
          <ProfilePloggingDataInfo/>
        </PloggingDataContainer>

        {/* 인증하기 버튼 */}
        <UploadPhotoButtonContainer>
          <TouchableOpacity
          onPress={() => uploadPhoto()}
          style={[
            ButtonStyle.whiteColor, 
            ButtonStyle.fullLargeButton
          ]}>
            <Text 
            style={{color: '#8BCA84', fontWeight: 'bold', fontSize: 20}}
            >인증하기</Text>
          </TouchableOpacity>
        </UploadPhotoButtonContainer>

        {/* 인증 사진/회색 빈 칸 */}
        <ImageContainer>
          <Image 
          source={{uri: 'https://mediahub.seoul.go.kr/uploads/mediahub/2022/03/nqIdsTmuNLznSsyBFyENToHLigbKWoLx.png'}} 
          style={ImageStyle.largeImage} />
        </ImageContainer>

        {/* 지도 */}

      </PloggingFinishContainer>
    </ScrollView>
  );
};

export default PloggingFinish;
