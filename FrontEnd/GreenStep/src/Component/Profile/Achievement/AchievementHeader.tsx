import { View, Text, TouchableOpacity } from "react-native";
import React from 'react';

const AchievementHeader = ({navigation}:any) => {
    return(
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('achievement')}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 20 }}>업적</Text>
        </TouchableOpacity> 
        </View>
    )
}
export default AchievementHeader;