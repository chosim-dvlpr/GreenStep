import {View} from "react-native"; 
import {useState} from 'react'
import AchievementCategory from "./AchievementCategory";

const AchievementList = () => {
    const [achievementList, setAchievementList] = useState([{title : '당신은 플로깅 고수?!', content : '이동거리 100KM 달성', date: '2023/04/21'},
                                                           {title : '당신은 플로깅 장인??!', content : '이동거리 1000KM 달성', date: '2023/10/21'}
                                                          ])
    return(
        <View style={{alignItems:'center'}}>
        {achievementList.map((achievement, index) =>(
            <AchievementCategory key={index} {...achievement}/>
        ))}
      </View>
    )
}
export default AchievementList;