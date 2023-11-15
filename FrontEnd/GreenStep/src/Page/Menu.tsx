import { Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageStyle from "../Style/Image";
import Box from "../Style/Box";
//이미지
import badge from '../Image/Achievement/badge.png'
import map from '../Image/Footer/dataMap.png'
import move from '../Image/Profile/move.png'
import profile from '../Image/Footer/profile.png'
import trash from '../Image/PloggingStart/trash_img.png'
import styled from "styled-components/native";

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const Menu = () => {
    const pictures = [badge, trash, profile, map]
    const names = ['업적', '플로깅 이벤트', '회원 정보 수정', 'GreenStep 발자취']
    const navigation = useNavigation();
    //추후 페이지 만들고 나서 수정
    const moveToCategory = (idx : number) => {
        if (idx === 0) {
            navigation.navigate('achievement')
        }else if(idx === 1){
            navigation.navigate('event')
        }else if(idx === 2){
            navigation.navigate('userinfo')
        }else{
            openURL()
        }
    }

    const openURL = () => {
        Linking.canOpenURL('https://k9b303.p.ssafy.io/').then(supported => {
            if (supported) {
                Linking.openURL('https://k9b303.p.ssafy.io/');
            } else {
                console.log("URL open 실패 ");
            }
        });
    };
    return(
        <View>
            <ContainerBg source={require('../Image/Competition/bg.png')}>
                <Text style={{marginBottom: 50}}></Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    {names.map((name, idx) =>(
                        <TouchableOpacity key={idx} onPress={()=> moveToCategory(idx)}
                                        style={[Box.cardBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}]}>
                            <Image source={pictures[idx]} style={ImageStyle.tinyImage}></Image>
                            <Text style={{justifyContent:'center', alignItems:'center', fontSize: 20, fontWeight:'bold', fontFamily: 'SUITE-Bold'}}>{name}</Text>
                            <Image source={move} style={{width:20, height: 20, marginLeft: 20, marginTop:5}}></Image>
                        </TouchableOpacity>
                    ))}
                </View>
            </ContainerBg>
        </View>
    ) 
}

export default Menu;