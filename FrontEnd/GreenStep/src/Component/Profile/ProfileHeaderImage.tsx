import { View, Image, Text} from "react-native";
import character from '../../Image/Character/panda.png'
import ImageStyle from "../../Style/Image";
import {useState} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const ProfileHeaderImage = () => {
    const percentage = 66;

    return(
        <View>
          <AnimatedCircularProgress
                size={130}
                width={5}
                fill={percentage}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {(fill) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={character} style={ImageStyle.mediumImage} />
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    )
}
export default ProfileHeaderImage;