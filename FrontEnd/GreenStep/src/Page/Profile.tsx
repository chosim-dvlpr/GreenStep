import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';
//components
import ProfileHeader from '../Component/Profile/ProfileHeader';
import ProfileHeaderImage from '../Component/Profile/ProfileHeaderImage';
import ProfileHeaderMessage from '../Component/Profile/ProfileHeaderMessage';
import ProfileHeaderStrick from '../Component/Profile/ProfileHeaderStrick';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import MyPlogging from './MyPlogging';
//API

const Profile = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const [name, setName] = useState('User');
  const [percentage, setPerCentage] = useState(0);
  const [level, setLevel] = useState(0);
  const [timeInfo, setTimeInfo] = useState(0);
  const [distanceInfo, setDistanceInfo] = useState(0);
  const [trashInfo, setTrashInfo] = useState(0);
  const [acheiveInfo, setAchieveInfo] = useState(0);
  const [isProfile, setIsProfile] = useState(true);
  // 사용자 정보(이름, 경험치, 레벨) 불러오기
  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
          'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
        },
      };
      const res = await axios.get(`${baseURL}/mypage`, config);
      console.log(res);
      setName(res.data.nickname);
      setPerCentage(res.data.exp);
      setLevel(res.data.level);
    } catch (err) {
      console.log('사용자 정보 조회 error', err);
    }
  };

  // 사용자 정보(플로깅 시간, 거리, 쓰레기양, 업적) 불러오기
  const getUserPloggingInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
          'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
        },
      };
      const res = await axios.get(`${baseURL}/mypage/my-plogging`, config);
      console.log(res);
      setTimeInfo(res.data.travelTime);
      setDistanceInfo(res.data.travelRange);
      setTrashInfo(res.data.trashAmount);
      setAchieveInfo(res.data.completedAchieveCount);
    } catch (err) {
      console.log('사용자 플로깅 이력 조회 error', err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUserInfo();
      getUserPloggingInfo();
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <ProfileHeader name={name} />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 30,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <ProfileHeaderImage percentage={percentage} />
          <ProfileHeaderMessage level={level} />
        </View>
        <ProfileHeaderStrick />
      </View>
      
      <View
      style={{marginLeft: 10, marginRight: 10,}}
      >
        <ProfilePloggingDataInfo
          navigation={navigation}
          timeInfo={timeInfo}
          distanceInfo={distanceInfo}
          trashInfo={trashInfo}
          acheiveInfo={acheiveInfo}
          isProfile={isProfile}
        />
      </View>
      <MyPlogging />
    </ScrollView>
  );
};

export default Profile;
