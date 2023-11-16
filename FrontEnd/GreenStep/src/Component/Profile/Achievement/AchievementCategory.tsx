import { View, Text, Image } from "react-native"; 
import Box from "../../../Style/Box";
import ImageStyle from "../../../Style/Image";
import badge from '../../../Image/Achievement/badge.png'
import TextStyle from "../../../Style/Text";
interface achievementProps{
    title: string,
    content: string,
    date: string,
}

const AchievementCategory = (props:achievementProps) => {
    return(
        <View style={{alignItems:'center', marginBottom: 20}}>
            <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
            <View>
                <Text style={{fontWeight:'bold', fontSize: 20}}>{props.title}</Text>
                <Text></Text>
                <Text style={TextStyle.defaultBlack}>{props.content}</Text>
                <Text></Text>
                <Text style={TextStyle.defaultBlack}>{props.date}</Text>
            </View>
            <View>
                <Image source={badge} style={ImageStyle.mediumImage}></Image>
            </View>
            </View>
      </View>
    )
}
export default AchievementCategory;