//상세페이지 - 참여하기 이미지 컴포넌트
import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity } from "react-native";
import ImageStyle from "../../Style/Image";
import TextStyle from '../../Style/Text';
interface BoardInfoParticipationDetailProps {
  member: attendListProps;
}
interface attendListProps{
    userId : number;
    nickname: string;
    avatarImg: string;
  }

const BoardInfoParticipationDetail = ({ member }: BoardInfoParticipationDetailProps) => {
    const [showNickname, setShowNickname] = useState(false);
    const toggleNickname = () => {
        setShowNickname(!showNickname);
      };
    
    return(
        <TouchableOpacity onPress={toggleNickname}>
            <View style={{borderWidth: 3, borderColor: '#ACD8A7', overflow: 'hidden',  
                        borderRadius: 50, marginLeft: 15}}>
                <Image source={{uri: member.avatarImg}} style={[ImageStyle.smallImage]}></Image>
                {showNickname && (
                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%' }}>
                        <Text style={[TextStyle.defaultBlack, { color: 'white', textAlign: 'center' }]}>{member.nickname}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default BoardInfoParticipationDetail;