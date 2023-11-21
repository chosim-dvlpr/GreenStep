import { View, Text} from "react-native";
import TextStyle from "../../Style/Text";

const ProfileHeaderMessage = ({level}:any) => {
    return(
        <View>
            <Text style={[TextStyle.defaultBlack, {fontSize: 22}]}>LV.{level}</Text>
        </View>
    )
}
export default ProfileHeaderMessage;