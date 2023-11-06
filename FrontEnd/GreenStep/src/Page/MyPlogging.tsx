import { View } from "react-native"
import MyPloggingHeader from "../Component/Profile/MyPlogging/MyPloggingHeader";
import MyPloggingList from "../Component/Profile/MyPlogging/MyPloggingList";
const MyPlogging = () => {
    return(
        <View>
            <MyPloggingHeader/>
            <MyPloggingList/>
        </View>
    )
}
export default MyPlogging;