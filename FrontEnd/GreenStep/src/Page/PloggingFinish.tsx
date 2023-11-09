// React Native
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Text, TouchableOpacity, ScrollView, Image, Switch, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

// 스타일
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import TextStyle from '../Style/Text';

// 컴포넌트
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import PloggingFinishHeader from '../Component/PloggingFinish/PloggingFinishHeader';
import PloggingFinishNoImage from '../Image/PloggingFinish/PloggingFinishNoImage.png';
import PloggingFinishLevelUpModal from '../Component/PloggingFinish/PloggingFinishLevelUpModal';
import lock from '../Image/PloggingFinish/lock.png'

// axios
import fileTokenHttp from '../Api/fileTokenHttp';


interface PloggingFinishType {
  // props로 반드시 넘겨줘야 할 항목 (추후 ? 지우기)
  ploggingId?: number,
  getExp?: number,
  isLevelUp?: boolean, 
  
  // 선택 항목
  avartarName?: string, 
  avatarImage?: string, // 아바타 이미지 url
}

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
    // const imageName = localUri.split("/").pop();
    setPhoto("file://"+uriPath)    

    await formData.append('file', new Blob({
      uri: localUri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    }, fileBlobOptions));

    const isVisibleObject = {
      isVisible: isVisible,
      ploggingId: ploggingId,
    };
    
    const jsonBlobOptions = {
      type: 'application/json',
      lastModified: Date.now(),
    };
    const fileBlobOptions = {
      type: "multipart/form-data",
      lastModified: Date.now(),
    };
    
    formData.append(
      'dto',
      new Blob([JSON.stringify(isVisibleObject)], jsonBlobOptions)
    );

    fileTokenHttp.post(`/plogging/upload/img`, formData)
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

  /** 비공개로 설정 토글 
   * isVisible = false : 비공개
   * isVisible = true : 공개
  */
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleSwitch = () => {
    setIsVisible(!isVisible);
  };
  
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
      avatarImage={''} 
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


        {/* 비공개로 설정 */}
        <IsVisibleContainer>
          <IsVisibleLeft>
            <Image
            source={lock}
            />
            <LockText>비공개로 설정</LockText>
          </IsVisibleLeft>
          <Switch
          value={!isVisible}
          onValueChange={toggleSwitch}
          trackColor={{ true: '#ACD8A7', false: `${TextStyle.defaultGray}` }}
          // thumbColor={!isVisible ? 'rgba(255, 255, 255, 1)' : '#ACD8A7'}
          thumbColor={'rgba(255, 255, 255, 1)'}
          />
        </IsVisibleContainer>


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
  aspect-ratio: 1;
`

const GoToMainContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 30;
  margin-bottom: 110;
`

const IsVisibleContainer = styled.View`
  width: 86%;
  padding: 3%;
  padding-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
`

const IsVisibleLeft = styled.View`
  display: flex;
  flex-direction: row;
`

const LockText = styled.Text`
  margin-left: 10;
`

const ButtonTextColor = '#8BCA84';


export default PloggingFinish;
