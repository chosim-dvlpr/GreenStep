import { View, Image, TouchableOpacity} from "react-native";
import avatar from '../../Image/Avatar/panda.png'
import ImageStyle from "../../Style/Image";
import {useState} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProfileAvatarModal from "./ProfileAvatarModal";
import { AvatarAPI } from "../../Api/avatarApi";

const ProfileHeaderImage = ({percentage}:any) => {
    const [showAvatar, setShowAvatar] = useState(avatar)
    const [toggle, setToggle] = useState(false)
    const [boxId, setBoxId] = useState(0)

    // 사용자 캐릭터 변경하기
    const changeAvatar = (avatar:any) =>{
        handelBoxId(boxId)
        AvatarAPI.patchAvatarAxios(boxId)
        .then((res) =>{
        //  console.log(res)
        //  console.log(boxId)
        setShowAvatar(avatar)
        handleToggle();
        } 
      )
    .catch(err => console.log('사용자 캐릭터 변경 axios 에러 : ', err))

    }
    const handleToggle = () => {
        setToggle(!toggle)
    }
    const handelBoxId = (boxId :number) =>{
        setBoxId(boxId+1)
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
            {toggle && <ProfileAvatarModal onSelectAvatar={changeAvatar} onClose={handleToggle} visible={toggle} />}
        </View>
    )
}
export default ProfileHeaderImage;