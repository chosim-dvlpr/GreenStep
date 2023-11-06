import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import avatar from '../../../Image/Avatar/bird.png';
import ImageStyle from '../../../Style/Image';
import MyPloggingDetail from './MyPloggingDetail';
import { ProfileAPI } from '../../../Api/profileApi';

const MyPloggingList = () => {
    const [images, setImages] = useState([avatar, avatar, avatar, avatar, avatar, avatar, avatar, avatar])
    const [dataList, setDataList] = useState({})
    const [idx, setIdx] = useState(0)
    const [dataDetail, setDataDetail] = useState([])
    const [toggle, setToggle] = useState(false)


    // 내 플로깅 이력 불러오기
    const getMyploggingList = () => {
    ProfileAPI.getMyPloggingAxios()
    .then((res) =>{
      console.log(res)
    //   setDataList(res.data)
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

    return(
        <View>
            <ScrollView horizontal={false}>
                <View style={styles.wrapRow}>
                    {images.map((image, index) => (
                        <TouchableOpacity onPress={() => handleAvatarId(index)}>
                            <View>
                                <Image key={index} source={image} style={ImageStyle.mediumImage} />
                                <View style={[styles.overlayText, styles.noWrapRow]}>
                                    <Text style={styles.textStyle}>28:57</Text>
                                    <Text style={styles.textStyle}>5.06 KM</Text>
                                    <Text style={styles.textStyle}>5'43"</Text>
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