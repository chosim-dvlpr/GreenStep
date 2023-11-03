import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
//components
import ProfileHeader from '../Component/Profile/ProfileHeader';
import ProfileHeaderImage from '../Component/Profile/ProfileHeaderImage';
import ProfileHeaderMessage from '../Component/Profile/ProfileHeaderMessage';
import ProfileHeaderStrick from '../Component/Profile/ProfileHeaderStrick';
import ProfilePloggingDataInfo from '../Component/Profile/ProfilePloggingDataInfo';
import AchievementHeader from '../Component/Profile/Achievement/AchievementHeader';
import AchievementList from '../Component/Profile/Achievement/AchievementList';

const Profile = ({navigation}:any) => {

  return (
    <ScrollView>
      
      <ProfileHeader/>      
      
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20,
                    justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
          <ProfileHeaderImage/>
          <ProfileHeaderMessage/>
        </View>
        <ProfileHeaderStrick/>
      </View>

      <ProfilePloggingDataInfo/>
      <AchievementHeader navigation={navigation}/>     
      <AchievementList/>
    </ScrollView>
  );
};

export default Profile;