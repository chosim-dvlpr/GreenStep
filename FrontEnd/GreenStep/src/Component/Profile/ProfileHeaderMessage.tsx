import { View, Text} from "react-native";

const ProfileHeaderMessage = ({level}:any) => {
    return(
        <View>
            <Text style={{fontSize: 22}}>LV.{level}</Text>
        </View>
    )
}
export default ProfileHeaderMessage;