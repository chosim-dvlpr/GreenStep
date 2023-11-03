import { View, Text, Image } from "react-native";
import React, {useState} from 'react';
import ImageStyle from '../../Style/Image';
import Box from "../../Style/Box";
import time from '../../Image/Data/time.png';
import distance from '../../Image/Data/distance.png';
import trash from '../../Image/Data/trash.png';
import styled from 'styled-components/native';

const ImageContainer = styled.View`
  width: 50%;
  /* aspect-ratio: 0.7; */
  /* background-color: black; */
  align-items: center;
`

const ProfilePloggingDataInfo = () => {
    const [timeInfo, setTimeInfo] = useState('00h 00m 00s')
    const [distanceInfo, setDistanceInfo] = useState(234)
    const [trashInfo, setTrashInfo] = useState(123)
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
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center', justifyContent: 'center'}]}>
          <ImageContainer>
            <Image source={trash} style={ImageStyle.tinyImage}></Image>
          </ImageContainer>
          <Text style={{fontSize: 13, fontWeight:'bold', marginTop: 5, marginBottom: 2}} numberOfLines={1}>{trashInfo} 개</Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>모은 쓰레기</Text>
        </View>
      </View>
    )
}
export default ProfilePloggingDataInfo;