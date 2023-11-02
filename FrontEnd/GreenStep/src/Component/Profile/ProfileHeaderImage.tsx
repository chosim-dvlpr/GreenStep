import { View, Image} from "react-native";
import character from '../../Image/Character/panda.png'
import ImageStyle from "../../Style/Image";
import {useState} from 'react';
const ProfileHeaderImage = () => {
    
    return(
        <View>
          <Image source={character} style={ImageStyle.mediumImage}></Image>
        </View>
    )
}
export default ProfileHeaderImage;