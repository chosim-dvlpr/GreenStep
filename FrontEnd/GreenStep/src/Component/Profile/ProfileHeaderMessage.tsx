import { View, Text} from "react-native";
import {useState} from 'react';
const ProfileHeaderMessage = () => {
    const [level, setLevel] = useState(3)
    return(
        <View>
            <Text style={{fontSize: 22}}>LV.{level}</Text>
        </View>
    )
}
export default ProfileHeaderMessage;