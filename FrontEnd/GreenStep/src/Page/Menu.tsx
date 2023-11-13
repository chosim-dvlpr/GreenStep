import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageStyle from "../Style/Image";
import Box from "../Style/Box";
//이미지
import badge from '../Image/Achievement/badge.png'
import map from '../Image/Footer/dataMap.png'
import move from '../Image/Profile/move.png'
import profile from '../Image/Footer/profile.png'
import trash from '../Image/PloggingStart/trash_img.png'
const Menu = () => {
    const pictures = [badge, trash, profile, map]
    const names = ['업적', '플로깅 이벤트', '회원 정보 수정', 'GreenStep 발자취']
    const navigation = useNavigation();
    //추후 페이지 만들고 나서 수정
    const moveToCategory = (idx : number) => {
        if (idx === 0) {
            navigation.navigate('achievement')
        }else if(idx === 1){
            navigation.navigate('main')
        }else if(idx === 2){
            navigation.navigate('userinfo')
        }else{
            navigation.navigate('board')
        }
    }
    return(
        <View>
            <Text style={{marginBottom: 50}}></Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {names.map((name, idx) =>(
                    <TouchableOpacity key={idx} onPress={()=> moveToCategory(idx)}
                                      style={[Box.cardBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}]}>
                        <Image source={pictures[idx]} style={ImageStyle.tinyImage}></Image>
                        <Text style={{justifyContent:'center', alignItems:'center', fontSize: 25, fontWeight:'bold'}}>{name}</Text>
                        <Image source={move} style={{width:25, height: 25, marginLeft: 20, marginTop:5}}></Image>
                    </TouchableOpacity>
                ))}
           </View>
        </View>
    ) 
}

export default Menu;