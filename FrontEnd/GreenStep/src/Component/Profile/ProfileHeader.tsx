import { View, Text } from "react-native";
import React from 'react';

const ProfileHeader = ({name}:any) => {

    return(
        <View>
            <Text style={{fontSize:45, paddingLeft: 20}}>Hello! {name}</Text>
        </View>
    )
}
export default ProfileHeader;