import { View, Text, TouchableOpacity } from "react-native";
import React from 'react';

const AchievementHeader = ({navigation}:any) => {
    return(
        <View style={{marginBottom:20}}>
        <TouchableOpacity onPress={() => navigation.navigate('achievement')}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 20 }}>업적</Text>
        </TouchableOpacity> 
        </View>
    )
}
export default AchievementHeader;