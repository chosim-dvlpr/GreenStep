import {View, Text, TouchableOpacity, ScrollView, Image, PermissionsAndroid } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import fileTokenHttp from '../Api/fileTokenHttp';
import { launchImageLibrary } from 'react-native-image-picker';
import PloggingFinishHeader from '../Component/PloggingFinish/PloggingFinishHeader';
import { useNavigation } from '@react-navigation/native';
import PloggingFinishNoImage from '../Image/PloggingFinish/PloggingFinishNoImage.png';
import PloggingFinishLevelUpModal from '../Component/PloggingFinish/PloggingFinishLevelUpModal';

interface PloggingFinishType {
  // props로 반드시 넘겨줘야 할 항목 (추후 ? 지우기)
  ploggingId?: number,
  getExp?: number,
  isLevelUp?: boolean, 
  
  // 선택 항목
  avartarName?: string, 
  avatarImage?: string,
}

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
  width: 86%;
  margin: auto;
  margin-top: 30;
  margin-bottom: 110;
`

const ButtonTextColor = '#8BCA84';


const PloggingFinish = ({ ploggingId, getExp, isLevelUp, avartarName, avatarImage }: PloggingFinishType) => {
  const navigation = useNavigation();

  /** 사진 선택 기능 */
  const [photo, setPhoto] = useState<string>('');

  const pickedPhoto = async () => {
    console.log('사진 인증 버튼 클릭 (미리보기)')
    const result = await launchImageLibrary();
    const formData = await new FormData()
    
    if (result.didCancel){
      return null;
    }
    console.log('이미지 업로드 성공 : ', result)
    const localUri = result.assets[0].uri;
    const uriPath = localUri.split("//").pop();
    const imageName = localUri.split("/").pop();
    setPhoto("file://"+uriPath)    

    await formData.append('file', {
      name: result.assets[0].fileName,
      type: result.assets[0].type,
      uri: localUri,
    });

    fileTokenHttp.post(`/plogging/${ploggingId}/upload/img`, formData)
    .then((res) => console.log('file 전송 성공 : ', res))
    .catch(err => console.log('file 전송 실패 : ', err))
  };

  /** 레벨업 토글 */
  const [levelUpToggle, setLevelUpToggle] = useState(false);
  const handleLevelUpToggle = () => {
    setLevelUpToggle(!levelUpToggle);
  };

  useEffect(() => {
    if (isLevelUp) {
      setLevelUpToggle(true);
    }
  }, [])

  return (
    <ScrollView>
      {levelUpToggle && 
      <PloggingFinishLevelUpModal 
      onClose={handleLevelUpToggle} 
      visible={levelUpToggle} 
      // avatarName={avatarName} 
      // avatarImage={avatarImage} 
      
      // 데이터 props로 받은 뒤 삭제하기
      avatarName={'cow'}
      avatarImage={'cow'} 
      />}

      <PloggingFinishContainer>

        {/* 헤더 */}
        <PloggingFinishHeader getExp={getExp} />
  
        {/* 플로깅 데이터 */}
        <PloggingDataContainer>
          <ProfilePloggingDataInfo/>
        </PloggingDataContainer>

        {/* 인증하기 버튼 */}
        <UploadPhotoButtonContainer>
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
          <TouchableOpacity onPress={pickedPhoto}>
            <Image 
            source={photo ? {uri: photo} : PloggingFinishNoImage} 
            style={[ButtonStyle.whiteColor, {width: '100%', height: '100%', borderRadius: 20}]} />
          </TouchableOpacity>
        </ImageContainer>
        

        {/* 지도 */}


        {/* 메인 버튼 */}
        <GoToMainContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate('main')}
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
