import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
//components
import ProfileHeader from '../Component/Profile/ProfileHeader';
import ProfileHeaderImage from '../Component/Profile/ProfileHeaderImage';
import ProfileHeaderMessage from '../Component/Profile/ProfileHeaderMessage';
import ProfileHeaderStrick from '../Component/Profile/ProfileHeaderStrick';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import MyPlogging from './MyPlogging';
//API
import { ProfileAPI } from '../Api/profileApi';

const Profile = ({navigation}:any) => {
  const [name, SetName] = useState('User')
  const [percentage, setPerCentage] = useState(0);
  const [level, setLevel] = useState(0);
  const [timeInfo, setTimeInfo] = useState(0)
  const [distanceInfo, setDistanceInfo] = useState(234)
  const [trashInfo, setTrashInfo] = useState(123)
  const [acheiveInfo, setAchieveInfo] = useState(10)
  // 사용자 정보(이름, 경험치, 레벨) 불러오기
  const getUserInfo = () => {
    ProfileAPI.getHeaderAxios()
    .then((res) =>{
      console.log('사용자 정보 : ',res)
      SetName(res.data.nickname)
      setPerCentage(res.data.exp)
      setLevel(res.data.level)
    } 
      )
    .catch(err => console.log('사용자 정보 조회 axios 에러 : ', err))
  }

  // 사용자 정보(플로깅 시간, 거리, 쓰레기양, 업적) 불러오기
  const getUserPloggingInfo = () => {
    ProfileAPI.getMyPloggingAxios()
    .then((res) =>{
      console.log('사용자 플로깅 정보 : ',res)
      // console.log(res.data),
      setTimeInfo(res.data.travelTime)
      setDistanceInfo(res.data.travelRange)
      setTrashInfo(res.data.trashAmount)
      setAchieveInfo(res.data.completedAchieveCount)
    } 
      )
    .catch(err => console.log('사용자 정보 조회 axios 에러 : ', err))
  }

  useEffect(() => {
      getUserInfo();
      getUserPloggingInfo();
    }, [])
    
  return (
    <ScrollView>
      
      <ProfileHeader name={name}/>      
      
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20,
                    justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
          <ProfileHeaderImage percentage={percentage}/>
          <ProfileHeaderMessage level={level}/>
        </View>
        <ProfileHeaderStrick/>
      </View>

      <ProfilePloggingDataInfo navigation={navigation} timeInfo={timeInfo} distanceInfo={distanceInfo} trashInfo={trashInfo} acheiveInfo={acheiveInfo} />
      <MyPlogging/>
    </ScrollView>
  );
};

export default Profile;