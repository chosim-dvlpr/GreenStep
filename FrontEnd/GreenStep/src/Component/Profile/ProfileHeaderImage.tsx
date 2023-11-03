import { View, Image, TouchableOpacity} from "react-native";
import avatar from '../../Image/Avatar/panda.png'
import ImageStyle from "../../Style/Image";
import {useState} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProfileAvatarModal from "./ProfileAvatarModal";

const ProfileHeaderImage = () => {
    const percentage = 66;
    const [showAvatar, setShowAvatar] = useState(avatar)
    const [toggle, setToggle] = useState(false)
    const changeAvatar = (avatar:any) =>{
        setShowAvatar(avatar)
        handleToggle();

    }
    const handleToggle = () => {
        setToggle(!toggle)
    }
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
                        <TouchableOpacity onPress={handleToggle}>
                            <Image source={showAvatar} style={ImageStyle.mediumImage}/>
                        </TouchableOpacity>
                    </View>
                )}
            </AnimatedCircularProgress>
            {toggle && <ProfileAvatarModal onClose={handleToggle} onSelectAvatar={changeAvatar} />}
        </View>
    )
}
export default ProfileHeaderImage;