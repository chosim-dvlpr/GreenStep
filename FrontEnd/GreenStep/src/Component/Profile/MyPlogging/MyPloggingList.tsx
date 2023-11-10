import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import ImageStyle from '../../../Style/Image';
import MyPloggingDetail from './MyPloggingDetail';
import { ProfileAPI } from '../../../Api/profileApi';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import noImage from '../../../Image/PloggingFinish/PloggingFinishNoImage.png'
import { msToHM, roundedTravelRange } from '../../../Function/Plogging/funcPlogging';
import { useIsFocused } from '@react-navigation/native';

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
    const isFocused = useIsFocused();
    const [dataList, setDataList] = useState<PloggingData[]>([]);
    const [idx, setIdx] = useState(0)
    const [toggle, setToggle] = useState(false)

    // 내 플로깅 이력 불러오기
    const getMyploggingList = async () => {
      try{
        const res = await ProfileAPI.getPloggingListAxios()
        console.log(res);
        setDataList(res.data)
      } catch(err){
        console.log('사용자 플로깅 List 조회 error', err)
      } 
  }
    const handleAvatarId = (index : number) =>{
      setIdx(index)
      handleToggle()
    }
    const handleToggle = () => {
      setToggle(!toggle)
    }

    useEffect(() => {
      if(isFocused){
        getMyploggingList();
      }
    }, [isFocused]);

  return(
        <View>
            <ScrollView horizontal={false}>
                <View style={styles.wrapRow}>
                    {dataList.map((data, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAvatarId(data.ploggingId)}>
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                              {data?.travelPicture?( 
                              <Image source={{uri: data?.travelPicture}} style={ImageStyle.mediumImage} resizeMode="stretch"></Image>
                              ):(<Image source={noImage} style={ImageStyle.mediumImage} resizeMode="stretch"></Image>)
                              }
                                <View style={[styles.overlayText, styles.noWrapRow]}>
                                    <Text style={styles.textStyle}>{data.trashAmount} 개</Text>
                                    <Text style={styles.textStyle}>{roundedTravelRange(data.travelRange)} KM</Text>
                                    <Text style={styles.textStyle}>{msToHM(data.travelTime)}</Text>
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
        justifyContent: 'center',
        
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
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10
    },
});
export default MyPloggingList;