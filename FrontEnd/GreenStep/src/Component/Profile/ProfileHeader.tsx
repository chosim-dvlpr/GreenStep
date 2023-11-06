import { View, Text, TouchableOpacity } from "react-native";
import React from 'react';

const ProfileHeader = ({name}:any) => {

    return(
        <View>
            <TouchableOpacity>
                <Text style={{fontSize:45, paddingLeft: 20}}>Hello! {name}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ProfileHeader;