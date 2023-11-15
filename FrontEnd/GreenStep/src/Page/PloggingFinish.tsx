// React Native
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

// 스타일
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import TextStyle from '../Style/Text';

// 컴포넌트
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import PloggingFinishHeader from '../Component/PloggingFinish/PloggingFinishHeader';
import PloggingFinishNoImage from '../Image/PloggingFinish/PloggingFinishNoImage.png';
import PloggingFinishLevelUpModal from '../Component/PloggingFinish/PloggingFinishLevelUpModal';
import lock from '../Image/PloggingFinish/lock.png';

// axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import fileTokenHttp from '../Api/fileTokenHttp';
import PloggingEndMap from '../Component/Common/PloggingEndMap';
import {plogginghistory} from '../Component/PloggingStart/api/ploggingService';
export interface getAvatarListType {
  avatarName: string | null;
  avatarImage: string | null;
}

interface PloggingFinishType {
  // props로 반드시 넘겨줘야 할 항목 (추후 ? 지우기)
  travelTime?: string; // string인지 확인 필요
  travelRange?: number;
  trashAmount?: number;
  acheiveInfo?: number;
  ploggingId?: number;
  getExp?: number;
  isLevelUp?: boolean;

  // 선택 항목
  getAvatarList?: getAvatarListType[];
  // avartarName?: string[],
  // avatarImage?: string[], // 아바타 이미지 url
}

// const PloggingFinish = ({
//   ploggingId,
//   getExp,
//   isLevelUp,
//   avartarName,
//   avatarImage
// }: PloggingFinishType) => {

// interface PloggingFinishType {
//   // props로 반드시 넘겨줘야 할 항목 (추후 ? 지우기)
//   travelTime?: string; // string인지 확인 필요
//   travelRange?: number;
//   trashAmount?: number;
//   acheiveInfo?: number;
//   ploggingId?: number;
//   getExp?: number;
//   isLevelUp?: boolean;

//   // 선택 항목
//   avartarName?: string;
//   avatarImage?: string; // 아바타 이미지 url
// }
const PloggingFinish = () => {
  const route = useRoute();
  const {ploggingId, getExp, isLevelUp, getAvatarList, trashAmount} =
    route.params as PloggingFinishType;
  const navigation = useNavigation();
  const data = {
    accessToken: AsyncStorage.getItem('accessToken'),
    refreshToken: AsyncStorage.getItem('refreshToken'),
  };
  // 지도 로직
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (ploggingId) {
      plogginghistory(ploggingId)
        .then(data => {
          setLocations(data);
        })
        .catch(error => console.error(error));
    }
  }, [ploggingId]);

  /** 사진 선택 기능 */
  const [photo, setPhoto] = useState<string>('');

  const pickedPhoto = async () => {
    console.log('사진 인증 버튼 클릭 (미리보기)');

    const result = await launchImageLibrary({mediaType: 'photo'});
    const formData = new FormData();

    if (result.didCancel) {
      return null;
    }

    console.log('이미지 업로드 성공 : ', result);

    const localUri = result.assets[0].uri;
    const uriPath = localUri.split('//').pop();
    setPhoto('file://' + uriPath);

    formData.append('file', {
      uri: result.assets[0].uri,
      type: 'multipart/form-data',
      name: result.assets[0].fileName,
    });

    fileTokenHttp
      .post('/plogging/${ploggingId}/upload/img', formData)
      .then(res => console.log('성공', res))
      .catch(err => console.log(err));
    // UploadAPI.uploadFile(formData)
    // .then(res => console.log('파일 서버 업로드 성공 '))
    // .catch(async err => {
    //   console.log('서버 업로드 실패 ', err)
    //   // await AsyncStorage.removeItem('accessToken')
    //   // await AsyncStorage.removeItem('refreshToken')
    //   Refresh.getRefreshToken()
    //   .then(() => {
    //       UploadAPI.uploadFile(formData)
    //       console.log('재업로드')
    //     })
    // .catch(() => console.log('실패'))
    // })
  };

  /** 레벨업 토글 */
  const [levelUpToggle, setLevelUpToggle] = useState(true); // 추후 지우기
  const handleLevelUpToggle = () => {
    setLevelUpToggle(!levelUpToggle);
  };

  useEffect(() => {
    if (isLevelUp) {
      setLevelUpToggle(true);
    }
  }, []);

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
      {levelUpToggle && (
        <PloggingFinishLevelUpModal
          onClose={handleLevelUpToggle}
          visible={levelUpToggle}
          // getAvatarList={getAvatarList}

          // 데이터 props로 받은 뒤 삭제하기
          getAvatarList={[
            {
              avatarName: 'bear',
              avatarImage:
                'https://3mm.s3.ap-northeast-2.amazonaws.com/bear.png',
            },
            {
              avatarName: 'cat',
              avatarImage:
                'https://3mm.s3.ap-northeast-2.amazonaws.com/cat.png',
            },
          ]}
          // avatarName={['bear', 'cat']}
          // avatarImage={['https://3mm.s3.ap-northeast-2.amazonaws.com/bear.png', 'https://3mm.s3.ap-northeast-2.amazonaws.com/cat.png']}
        />
      )}

      <PloggingFinishContainer>
        {/* 헤더 */}
        <PloggingFinishHeader getExp={getExp} />

        {/* 플로깅 데이터 */}
        <PloggingDataContainer>
          <ProfilePloggingDataInfo
            // 데이터 바인딩 후 아래 주석 해제하기
            // timeInfo={travelTime}
            // distanceInfo={travelRange}
            // trashInfo={trashAmount}
            // acheiveInfo={acheiveInfo}
            isProfile={false}
          />
        </PloggingDataContainer>

        {/* 인증하기 버튼 */}
        <UploadPhotoButtonContainer>
          <TouchableOpacity
            onPress={() => pickedPhoto()}
            style={[ButtonStyle.whiteColor, ButtonStyle.fullLargeButton]}>
            <Text
              style={{
                color: ButtonTextColor,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              인증하기
            </Text>
          </TouchableOpacity>
        </UploadPhotoButtonContainer>

        {/* 비공개로 설정 */}
        <IsVisibleContainer>
          <IsVisibleLeft>
            <Image source={lock} />
            <LockText>비공개로 설정</LockText>
          </IsVisibleLeft>
          <Switch
            value={!isVisible}
            onValueChange={toggleSwitch}
            trackColor={{true: '#ACD8A7', false: `${TextStyle.defaultGray}`}}
            // thumbColor={!isVisible ? 'rgba(255, 255, 255, 1)' : '#ACD8A7'}
            thumbColor={'rgba(255, 255, 255, 1)'}
          />
        </IsVisibleContainer>

        {/* 인증 사진/회색 빈 칸 */}
        <ImageContainer>
          <TouchableOpacity onPress={pickedPhoto}>
            <Image
              source={photo ? {uri: photo} : PloggingFinishNoImage}
              style={[
                ButtonStyle.whiteColor,
                {width: '100%', height: '100%', borderRadius: 20},
              ]}
            />
          </TouchableOpacity>
        </ImageContainer>

        <ImageContainer>
          <PloggingEndMap locations={locations} />
        </ImageContainer>

        {/* 지도 */}

        {/* 메인 버튼 */}
        <GoToMainContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate('main')}
            style={[ButtonStyle.whiteColor, ButtonStyle.fullLargeButton]}>
            <Text
              style={{
                color: ButtonTextColor,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              메인으로
            </Text>
          </TouchableOpacity>
        </GoToMainContainer>
      </PloggingFinishContainer>
    </ScrollView>
  );
};

const PloggingFinishContainer = styled.View``;

const PloggingDataContainer = styled.View`
  width: 90%;
  margin: auto;
  margin-top: 30;
`;

const UploadPhotoButtonContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 10;
`;

const ImageContainer = styled.View`
  width: 86%;
  margin: auto;
  aspect-ratio: 1;
`;

const GoToMainContainer = styled.View`
  width: 86%;
  margin: auto;
  margin-top: 30;
  margin-bottom: 110;
`;

const IsVisibleContainer = styled.View`
  width: 86%;
  padding: 3%;
  padding-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
`;

const IsVisibleLeft = styled.View`
  display: flex;
  flex-direction: row;
`;

const LockText = styled.Text`
  margin-left: 10;
`;

const ButtonTextColor = '#8BCA84';

export default PloggingFinish;
