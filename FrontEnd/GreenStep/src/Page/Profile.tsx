import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
//components
import ProfileHeader from '../Component/Profile/ProfileHeader';
import ProfileHeaderImage from '../Component/Profile/ProfileHeaderImage';
import ProfileHeaderMessage from '../Component/Profile/ProfileHeaderMessage';
import ProfileHeaderStrick from '../Component/Profile/ProfileHeaderStrick';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import AchievementHeader from '../Component/Profile/Achievement/AchievementHeader';
import MyPlogging from './MyPlogging';
//API
import { ProfileAPI } from '../Api/profileApi';

const Profile = ({navigation}:any) => {
  const [name, SetName] = useState('User')
  const [percentage, setPerCentage] = useState(66);
  const [level, setLevel] = useState(0);

  // 사용자 정보(이름, 경험치, 레벨) 불러오기
  const getUserInfo = () => {
    ProfileAPI.getHeaderAxios()
    .then((res) =>{
      console.log(res)
      // console.log(res.data),
      // SetName(res.data.nickname)
      // setPerCentage(res.data.exp)
      // setLevel(res.data.level)
    } 
      )
    .catch(err => console.log('사용자 정보 조회 axios 에러 : ', err))
  }

  useEffect(() => {
      getUserInfo();
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

      <ProfilePloggingDataInfo navigation={navigation}/>
      <MyPlogging/>
    </ScrollView>
  );
};

export default Profile;