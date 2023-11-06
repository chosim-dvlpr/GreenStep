import { View, Text, Image } from "react-native";
import React, {useState, useEffect} from 'react';
import ImageStyle from '../../Style/Image';
import Box from "../../Style/Box";
import time from '../../Image/Data/time.png';
import distance from '../../Image/Data/distance.png';
import trash from '../../Image/Data/trash.png';
import badge from '../../Image/Achievement/badge.png'
import styled from 'styled-components/native';
import { ProfileAPI } from "../../Api/ProfileApi";

const ImageContainer = styled.View`
  width: 50%;
  /* aspect-ratio: ; */
  align-items: center;
`

const ProfilePloggingDataInfo = () => {
    const [timeInfo, setTimeInfo] = useState('00h 00m 00s')
    const [distanceInfo, setDistanceInfo] = useState(234)
    const [trashInfo, setTrashInfo] = useState(123)
    const [acheiveInfo, setAchieveInfo] = useState(10)

    // 사용자 정보(이름, 경험치, 레벨) 불러오기
    const getUserInfo = () => {
      ProfileAPI.getMyPloggingAxios()
      .then((res) =>{
        console.log(res)
        // console.log(res.data),
        // setTimeInfo(res.data.travelTime)
        // setDistanceInfo(res.data.travelRange)
        // setTrashInfo(res.data.trashAmount)
        // setAchieveInfo(res.data.completedAchieveCount)
      } 
        )
      .catch(err => console.log('사용자 정보 조회 axios 에러 : ', err))
    }

  useEffect(() => {
      getUserInfo();
    }, [])

    return(
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20,
                      justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', marginRight: 10, justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={time} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{timeInfo}</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>함께한 시간</Text>
        </View>
        
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', marginRight: 10, justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={distance} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{distanceInfo} KM</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>깨끗해진 거리</Text>
        </View>
        
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', marginRight: 10, justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={trash} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{trashInfo} 개</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>모은 쓰레기</Text>
        </View>
        
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={badge} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{acheiveInfo} 개</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>달성 업적</Text>
        </View>
      </View>
    )
}
export default ProfilePloggingDataInfo;