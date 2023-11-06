import { View, Text, TouchableOpacity } from "react-native";
import React, {useState} from 'react';
const ProfileHeader = ({navigation}:any) => {
    const [userName, setUserName] = useState('User')
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('myplogging')}>
                <Text style={{fontSize:45, paddingLeft: 20}}>Hello! {userName}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ProfileHeader;