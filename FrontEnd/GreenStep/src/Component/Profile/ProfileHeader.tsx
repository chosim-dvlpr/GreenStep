import { View, Text } from "react-native";
import React, {useState} from 'react';
const ProfileHeader = () => {
    const [userName, setUserName] = useState('User')
    return(
        <View>
            <Text style={{fontSize:45, paddingLeft: 20}}>Hello! {userName}</Text>
        </View>
    )
}
export default ProfileHeader;