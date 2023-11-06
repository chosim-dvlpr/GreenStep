import { View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {useState, useEffect} from 'react';
import Box from "../../Style/Box";
import plus from '../../Image/Board/plus.png'
import minus from '../../Image/Board/minus.png'
import { ProfileAPI } from "../../Api/profileApi";

const ProfileHeaderStrick = () => {
    const [year, setYear] = useState(2023)
    const [ploggingWeek, setPloggingWeek] = useState([])    
    const getMonthLabel = (index :number) => {
        const monthMappings = {
          0: 'Jan',
          4: 'Feb',
          8: 'Mar',
          13: 'Apr',
          17: 'May',
          21: 'Jun',
          26: 'Jul',
          30: 'Aug',
          35: 'Sep',
          39: 'Oct',
          43: 'Nov',
          48: 'Dec'
        };
        return monthMappings[index] || '';
      };
    
  // 플로깅 스트릭 불러오기
  const getStreak = () => {
    ProfileAPI.getStreakAxios(year)
    .then((res) =>{
      console.log(res)
      // setPloggingWeek(res.data)
    } 
      )
    .catch(err => console.log('스트릭 조회 axios 에러 : ', err, year))
  }

  useEffect(() => {
    getStreak();
    console.log(year)
  }, [year])

  const handleYearPlus = () => {
    setYear(year+1)
}
const handleYearMinus = () => {
    if (year > 0) {
        setYear(year-1)
    }
}
    
    return(
        <View style={[Box.calendarBox, {alignItems:'center'}]}>
            <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={handleYearMinus}>
                    <Image source={minus}></Image>
                </TouchableOpacity>
            <Text style={{fontSize: 22, marginHorizontal: 20}}>{year}</Text>
            <TouchableOpacity onPress={handleYearPlus}>
                    <Image source={plus}></Image>
                </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Array.from({length:52}).map((_, index) =>(
              <View>
                <Text style={{fontSize:12, fontWeight:'bold'}}>{getMonthLabel(index)}</Text>
                <View key={index} style={Box.weekBox}>
                  <Text style={{fontSize:8}}></Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
    )
}
export default ProfileHeaderStrick;