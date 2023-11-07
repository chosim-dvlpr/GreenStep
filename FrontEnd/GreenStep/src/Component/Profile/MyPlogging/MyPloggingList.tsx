import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import avatar from '../../../Image/Avatar/bird.png';
import ImageStyle from '../../../Style/Image';
import MyPloggingDetail from './MyPloggingDetail';
import { ProfileAPI } from '../../../Api/profileApi';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

interface PloggingData {
    createdAt: string | null;
    getExp: number;
    ploggingId: number;
    trashAmount: number;
    travelRange: Double;
    travelTime: Double;
    travelPicture : string | null;
  }

const MyPloggingList = () => {
    const [dataList, setDataList] = useState<PloggingData[]>([]);
    const [idx, setIdx] = useState(0)
    const [toggle, setToggle] = useState(false)


    // 내 플로깅 이력 불러오기
    const getMyploggingList = () => {
    ProfileAPI.getPloggingListAxios()
    .then((res) =>{
      console.log('내 플로깅 리스트 조회/plogging')
      console.log(res)
      setDataList(res.data)
    } 
      )
    .catch(err => console.log('내 플로깅 이력 axios 에러 : ', err))
  }
  const handleAvatarId = (index : number) =>{
    setIdx(index)
    handleToggle()
  }
  const handleToggle = () => {
    setToggle(!toggle)
}

  useEffect(() => {
    getMyploggingList();
  }, [])
  console.log(dataList)
    return(
        <View>
            <ScrollView horizontal={false}>
                <View style={styles.wrapRow}>
                    {dataList.map((data, index) => (
                        <TouchableOpacity onPress={() => handleAvatarId(data.ploggingId)}>
                            <View>
                                <Image key={index} source={avatar} style={ImageStyle.mediumImage} />
                                <View style={[styles.overlayText, styles.noWrapRow]}>
                                    <Text style={styles.textStyle}>{data.trashAmount} 개</Text>
                                    <Text style={styles.textStyle}>{data.travelRange} KM</Text>
                                    <Text style={styles.textStyle}>{data.travelTime}</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        {toggle && <MyPloggingDetail onClose={handleToggle} index={idx} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        
    },
    noWrapRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
    },
    overlayText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    textStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 10
    },
});
export default MyPloggingList;