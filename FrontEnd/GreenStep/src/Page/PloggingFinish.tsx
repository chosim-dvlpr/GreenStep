import {View, Text, TouchableOpacity, ScrollView, Image, PermissionsAndroid } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import ImageStyle from '../Style/Image';
import fileTokenHttp from '../Api/fileTokenHttp';
import { launchImageLibrary } from 'react-native-image-picker';
import PloggingFinishHeader from '../Component/PloggingFinish/PloggingFinishHeader';

const PloggingFinishContainer = styled.View`
`

const PloggingDataContainer = styled.View`
  width: 90%;
  margin: auto;
  margin-top: 30;
`

const UploadPhotoButtonContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 10;
`

const ImageContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 30;
  aspect-ratio: 1;
  `

const GoToMainContainer = styled.View`
  width: 90%;
  margin: auto;
  margin-top: 30;
  margin-bottom: 110;
`

const ButtonTextColor = '#8BCA84';


const PloggingFinish = () => {

  /** 경험치 얻기 */
  const getExp = () => {
    
  }

  /** 사진 선택 기능 */
  const [photo, setPhoto] = useState<string>('');
  const [uploadedPhoto, setUploadedPhoto] = useState();

  const pickedPhoto = async () => {
    console.log('사진 인증 버튼 클릭 (미리보기)')
    const result = await launchImageLibrary();
    setUploadedPhoto(result)
    
    if (result.didCancel){
      return null;
    }
    console.log('이미지 업로드 성공 : ', result)
    const localUri = result.assets[0].uri;
    const uriPath = localUri.split("//").pop();
    const imageName = localUri.split("/").pop();
    setPhoto("file://"+uriPath);    
  };
  
  /** 사진 서버에 업로드 */
  const ploggingId = 1;
  const uploadPhoto = async () => {
    const formData = await new FormData();
    console.log('FormData formData : ', formData)
    console.log('FormData image : ', uploadedPhoto)
    
    const file = {
      name: uploadedPhoto?.assets?.[0]?.fileName,
      type: uploadedPhoto?.assets?.[0]?.type,
      uri: uploadedPhoto?.assets?.[0]?.uri,
    }
    formData.append('file', file);
    // formData.append('service', "profile");
    // formData.append('serviceId', )

    fileTokenHttp.post(`/upload/img/${ploggingId}`, formData)
    .then((res) => console.log('이미지 서버 업로드 성공 : ', res))
    .catch(err => console.log('이미지 서버 업로드 실패 : ', err))
  };

  return (
    <ScrollView>
      <PloggingFinishContainer>
        {/* 헤더 */}
        <PloggingFinishHeader />
  
        {/* 플로깅 데이터 */}
        <PloggingDataContainer>
          <ProfilePloggingDataInfo/>
        </PloggingDataContainer>

        {/* 인증하기 버튼 */}
        <UploadPhotoButtonContainer>
          {/* <input type='file'/> */}
          <TouchableOpacity
          onPress={() => pickedPhoto()}
          style={[
            ButtonStyle.whiteColor, 
            ButtonStyle.fullLargeButton
          ]}>
            <Text 
            style={{color: ButtonTextColor, fontWeight: 'bold', fontSize: 20}}
            >인증하기</Text>
          </TouchableOpacity>
        </UploadPhotoButtonContainer>

        {/* 인증 사진/회색 빈 칸 */}
        <ImageContainer>
          {/* <Image 
          source={{uri: 'https://mediahub.seoul.go.kr/uploads/mediahub/2022/03/nqIdsTmuNLznSsyBFyENToHLigbKWoLx.png'}} 
          style={ImageStyle.largeImage} /> */}
          <Image 
          source={{uri: photo}} 
          style={[ImageStyle.largeImage]} />
        </ImageContainer>

        {/* 지도 */}


        {/* 메인 버튼 */}
        <GoToMainContainer>
          <TouchableOpacity
            onPress={() => uploadPhoto()}
            style={[
              ButtonStyle.whiteColor, 
              ButtonStyle.fullLargeButton
            ]}>
              <Text 
              style={{color: ButtonTextColor, fontWeight: 'bold', fontSize: 20}}
              >메인으로</Text>
          </TouchableOpacity>
        </GoToMainContainer>
      </PloggingFinishContainer>
    </ScrollView>
  );
};

export default PloggingFinish;
