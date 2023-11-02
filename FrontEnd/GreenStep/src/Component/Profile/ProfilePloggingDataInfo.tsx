import { View, Text, Image } from "react-native";
import React, {useState} from 'react';
import ImageStyle from '../../Style/Image';
import Box from "../../Style/Box";
import time from '../../Image/Data/time.png';
import distance from '../../Image/Data/distance.png';
import trash from '../../Image/Data/trash.png';
const ProfilePloggingDataInfo = () => {
    const [timeInfo, setTimeInfo] = useState('00h 00m 00s')
    const [distanceInfo, setDistanceInfo] = useState(234)
    const [trashInfo, setTrashInfo] = useState(123)
    return(
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center'}]}>
          <Image source={time} style={ImageStyle.tinyImage}></Image>
          <Text style={{fontSize:13, fontWeight:'bold'}}>{timeInfo}</Text>
          <Text style={{fontSize:9}}>지구를 지켜준 시간</Text>
        </View>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center'}]}>
          <Image source={distance} style={ImageStyle.tinyImage}></Image>
          <Text style={{fontWeight:'bold'}}>{distanceInfo} KM</Text>
          <Text style={{fontSize:13}}>깨끗해진 거리</Text>
        </View>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center'}]}>
          <Image source={trash} style={ImageStyle.tinyImage}></Image>
          <Text style={{fontWeight:'bold'}}>{trashInfo} 개</Text>
          <Text style={{fontSize:13}}>모은 쓰레기</Text>
        </View>
      </View>
    )
}
export default ProfilePloggingDataInfo;