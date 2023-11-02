import { View, Text, Image } from "react-native";
import badge from '../../Image/Achievement/badge.png';
import ImageStyle from "../../Style/Image";
import Box from "../../Style/Box";

interface AchievementListProps{
    atom : string;
}

const AchievementList = ({ atom }: AchievementListProps) => {
    return(
            <View style={[Box.cardBox,
                        {display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'space-between', 
                        alignItems:'center',
                        marginBottom: 30,
                        }]}>
                <View>
                    <Text style={{fontWeight:'bold', fontSize: 20}}>종류</Text>
                <Text></Text>
                    <Text>종류 {atom} 달성</Text>
                <Text></Text>
                <   Text>달성 날짜 2035/04/23</Text>
                </View>
                <View>
                    <Image source={badge} style={ImageStyle.mediumImage}></Image>
                </View>
            </View>
    )
}

export default AchievementList;