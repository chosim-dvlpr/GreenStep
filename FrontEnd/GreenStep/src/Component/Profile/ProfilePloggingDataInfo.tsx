import { View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react';
import ImageStyle from '../../Style/Image';
import Box from "../../Style/Box";
import time from '../../Image/Data/time.png';
import distance from '../../Image/Data/distance.png';
import trash from '../../Image/Data/trash.png';
import badge from '../../Image/Achievement/badge.png'
import styled from 'styled-components/native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useNavigation } from "@react-navigation/native";

const ImageContainer = styled.View`
  width: 50%;
  /* aspect-ratio: ; */
  align-items: center;
`

const ProfilePloggingDataInfo = ({timeInfo, distanceInfo, trashInfo, acheiveInfo}:any) => {
    const navigation = useNavigation();
    
    const msToTime = (duration: Double): string => {
      let seconds: string | number = Math.floor((duration / 1000) % 60),
          minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
          hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      return `${hours}H ${minutes}M`;
    };

    return(
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20,
                      justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', marginRight: 5, justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={time} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{timeInfo ? msToTime(timeInfo) : "00:00:00"}</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>함께한 시간</Text>
        </View>
        
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', marginRight: 5, justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={distance} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{distanceInfo ? distanceInfo : 0} KM</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>깨끗해진 거리</Text>
        </View>
        
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', marginRight: 5, justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={trash} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{trashInfo ? trashInfo : 0} 개</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>모은 쓰레기</Text>
        </View>
        
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', justifyContent: 'center'}]}>
          <TouchableOpacity onPress={() => navigation.navigate('achievement')}>
            <ImageContainer>
              <Image source={badge} style={ImageStyle.tinyImage}></Image>
            </ImageContainer>
            <Text style={{fontSize: 13, fontWeight:'bold', alignSelf: 'center', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{acheiveInfo ? acheiveInfo : 0} 개</Text>
            <Text style={{fontSize: 13}} numberOfLines={1}>달성 업적</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}
export default ProfilePloggingDataInfo;