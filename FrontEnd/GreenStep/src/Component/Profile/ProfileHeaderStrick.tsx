import { View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {useState, useEffect} from 'react';
import Box from "../../Style/Box";
import plus from '../../Image/Board/plus.png'
import minus from '../../Image/Board/minus.png'
import { ProfileAPI } from "../../Api/profileApi";

const ProfileHeaderStrick = () => {
    const date = new Date();
    const nowYear = date.getFullYear();
    const [year, setYear] = useState(nowYear)
    const [ploggingWeek, setPloggingWeek] = useState([])
    const [selectedBoxIndex, setSelectedBoxIndex] = useState<number|null>(null);  
    const [selected, setSelected] = useState(false)

    const handleBoxPress = (index: number) => {
      if (selectedBoxIndex === index) {
        setSelectedBoxIndex(null);
      } else {
        setSelectedBoxIndex(index);
      }    
    }
    
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
      const getWeekBoxStyle = (weekIndex :any) => {
        const ploggingCount = ploggingWeek[weekIndex] || 0;
        if (ploggingCount >= 7) {
          return {...Box.weekBox, backgroundColor: 'darkGreen'};
        } else if (ploggingCount >= 4) {
          return {...Box.weekBox, backgroundColor: 'green'};
        } else if (ploggingCount >= 1) {
          return {...Box.weekBox, backgroundColor: 'lightGreen'};
        } else {
          return {...Box.weekBox, backgroundColor: 'white'};
        }
      };
    
  // 플로깅 스트릭 불러오기
  const getStreak = async (year:number) => {
    try{
      const res = await ProfileAPI.getStreakAxios(year);
      console.log(res)
      // setPloggingWeek(res.data)
    }catch(err){
      console.log('스트릭 조회 error', err)
    }
    // ProfileAPI.getStreakAxios(year)
    // .then((res) =>{
    //   console.log('스트릭', res)
    // } 
    //   )
    // .catch(err => console.log('스트릭 조회 axios 에러 : ', err, year))
  }

  useEffect(() => {
    getStreak(year);
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
                <TouchableOpacity key={index} onPress={() => handleBoxPress(index)}>
                  <View>
                    <Text style={{fontSize:12, fontWeight:'bold'}}>{getMonthLabel(index)}</Text>
                      {selectedBoxIndex === index && (
                        <View style={{alignItems:'center'}}>
                          <Text style={{fontSize:8}}>{index}</Text>
                        </View>)}
                    <View key={index} style={getWeekBoxStyle(index)}>
                      <Text style={{fontSize:8}}></Text>
                    </View>
                  </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
    )
}
export default ProfileHeaderStrick;