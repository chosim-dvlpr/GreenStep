import { View, Image, TouchableOpacity} from "react-native";
import avatar from '../../Image/Avatar/panda.png'
import ImageStyle from "../../Style/Image";
import {useState, useEffect} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProfileAvatarModal from "./ProfileAvatarModal";
import { AvatarAPI } from "../../Api/avatarApi";

interface AvatarProps {
    avatarId: number;
    boxId: number;
    avatarImg: string;
    avatarName: string;
    isSelected: boolean;
}

const ProfileHeaderImage = ({percentage}:any) => {
    const [showAvatar, setShowAvatar] = useState(avatar)
    const [toggle, setToggle] = useState(false)
    const [avatarId, setAvatarId] = useState<number>(1);
    const [avatars, setAvatars] = useState<AvatarProps[]>([]);

    // 사용자 캐릭터 불러오기
    const getAvatarInfo = async () => {
        try {
            const res = await AvatarAPI.getAvatarAxios();
            console.log('캐릭터', res);
            setAvatars(res.data);
            const selectedAvatar = avatars.find(ava => ava.isSelected);
            if (selectedAvatar) {
                setShowAvatar(selectedAvatar.avatarImg);
            }
        } catch (err) {
            console.log('사용자 캐릭터 조회 axios 에러 : ', err);
        }
    };

    // 사용자 캐릭터 변경하기
    const changeAvatar = async (newAvatarId: number) => {
        try {
            const res = await AvatarAPI.patchAvatarAxios(newAvatarId);
            console.log(res);
            await getAvatarInfo();
            setAvatarId(newAvatarId); // 아바타 ID 상태 업데이트
            handleToggle(); // 모달 토글
        } catch (err) {
            console.log('사용자 캐릭터 변경 axios 에러 : ', err, newAvatarId);
        }
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        getAvatarInfo();
    }, []);

    useEffect(() => {
        const selectedAvatar = avatars.find(ava => ava.isSelected);
        if (selectedAvatar) {
            setShowAvatar(selectedAvatar.avatarImg);
        }
    }, [avatars]);

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
                            <Image source={showAvatar === avatar ? avatar : { uri: showAvatar }}
                                   style={ImageStyle.mediumImage}/>
                        </TouchableOpacity>
                    </View>
                )}
            </AnimatedCircularProgress>
            {toggle && <ProfileAvatarModal onSelectAvatar={changeAvatar} onClose={handleToggle} visible={toggle} avatars={avatars} />}
        </View>
    )
}
export default ProfileHeaderImage;