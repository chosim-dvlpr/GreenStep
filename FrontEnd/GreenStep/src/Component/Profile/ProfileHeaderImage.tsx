import { View, Image, TouchableOpacity} from "react-native";
import avatar from '../../Image/Avatar/panda.png'
import ImageStyle from "../../Style/Image";
import {useState, useEffect} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProfileAvatarModal from "./ProfileAvatarModal";
import { AvatarAPI } from "../../Api/avatarApi";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../Api/tokenHttp';
interface AvatarProps {
    avatarId: number;
    boxId: number;
    avatarImg: string;
    avatarName: string;
    isSelected: boolean;
}

const ProfileHeaderImage = ({percentage}:any) => {
    const isFocused = useIsFocused();
    const [showAvatar, setShowAvatar] = useState(avatar)
    const [toggle, setToggle] = useState(false)
    const [avatarId, setAvatarId] = useState<number>(1);
    const [avatars, setAvatars] = useState<AvatarProps[]>([]);

    // 사용자 캐릭터 불러오기
    const getAvatarInfo = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
                'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
              },
            };
            const res = await axios.get(
              `${baseURL}/avatar`,
              config,
            );
            console.log('캐릭터', res);
            setAvatars(res.data);
            // const selectedAvatar = avatars.find(ava => ava.isSelected);
            // if (selectedAvatar) {
            //     setShowAvatar(selectedAvatar.avatarImg);
            // }
        } catch (err) {
            console.log('사용자 캐릭터 조회 axios 에러 : ', err);
        }
    };

    // 사용자 캐릭터 변경하기
    const changeAvatar = async (newAvatarId: number) => {
        try {
            console.log(newAvatarId)
            const token = await AsyncStorage.getItem('accessToken');
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
                  'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
                },
              };
              const res = await axios.patch(
                `${baseURL}/avatar/${newAvatarId}`,
                newAvatarId,
                config,
              );
            console.log(res);
            await getAvatarInfo();
            setAvatarId(newAvatarId);
            handleToggle();
        } catch (err) {
            console.log('사용자 캐릭터 변경 axios 에러 : ', err, newAvatarId);
        }
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        if(isFocused){
            getAvatarInfo();
        }
    }, [isFocused]);

    useEffect(() => {
        const selectedAvatar = avatars.find(ava => ava.isSelected);
        if (selectedAvatar) {
            setShowAvatar(selectedAvatar.avatarImg);
        }
    }, [avatars]);

    return(
        <View>
          <AnimatedCircularProgress
                size={150}
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