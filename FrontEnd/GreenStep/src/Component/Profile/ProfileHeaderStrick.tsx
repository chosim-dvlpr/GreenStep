import { View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {useState, useEffect} from 'react';
import Box from "../../Style/Box";
import right from '../../Image/Profile/right.png'
import left from '../../Image/Profile/left.png'
import { ProfileAPI } from "../../Api/profileApi";
import { useIsFocused } from '@react-navigation/native';

const ProfileHeaderStrick = () => {
    const isFocused = useIsFocused();
    const date = new Date();
    const nowYear = date.getFullYear();
    const [year, setYear] = useState(nowYear)
    const [ploggingWeek, setPloggingWeek] = useState([])
    const [selectedBoxIndex, setSelectedBoxIndex] = useState<number|null>(null);  

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
          return {...Box.weekBox, backgroundColor: '#276221'};
        } else if (ploggingCount >= 4) {
          return {...Box.weekBox, backgroundColor: '#52A447'};
        } else if (ploggingCount >= 1) {
          return {...Box.weekBox, backgroundColor: '#ACD8A7'};
        } else {
          return {...Box.weekBox, backgroundColor: 'white'};
        }
      };
    
  // 플로깅 스트릭 불러오기
  const getStreak = async (year:number) => {
    try{
      const res = await ProfileAPI.getStreakAxios(year);
      console.log(res)
      setPloggingWeek(res.data)
    }catch(err){
      console.log('스트릭 조회 error', err)
    }
  }

  useEffect(() => {
    if(isFocused){
      getStreak(year);
    }
    console.log(year)
  }, [year, isFocused])

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
                    <Image source={left} style={{marginTop:10}}></Image>
                </TouchableOpacity>
            <Text style={{fontSize: 20, marginHorizontal: 30}}>{year}</Text>
            <TouchableOpacity onPress={handleYearPlus}>
                    <Image source={right} style={{marginTop:10}}></Image>
                </TouchableOpacity>
          </View>


          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Array.from({length:52}).map((_, index) =>(
                <TouchableOpacity key={index} onPress={() => handleBoxPress(index)}>

                  <View>
                    <Text style={{fontSize:12, fontWeight:'bold'}}>{getMonthLabel(index)}</Text>

                      {selectedBoxIndex === index && (
                        <View style={{alignItems:'center'}}>
                          <Text style={{fontSize:10, fontWeight:'bold'}}>{index+1}주</Text>
                        </View>
                          )}

                    <View key={index} style={getWeekBoxStyle(index)}>
                      <Text style={{fontSize:8}}></Text>
                    </View>
                    {selectedBoxIndex === index && (
                        <View style={{alignItems:'center'}}>
                          <Text style={{fontSize:10, fontWeight:'bold'}}>{ploggingWeek[index]}회</Text>
                        </View>
                          )}

                  </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

            <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around'}}>
              <View style={[Box.weekBox, {backgroundColor: '#ACD8A7', marginLeft: 13}]}></View>
              <Text style={{fontSize: 10, fontWeight:'bold', marginTop: 2}}>1~3</Text>
              <View style={[Box.weekBox, {backgroundColor: '#52A447', marginLeft: 13}]}></View>
              <Text style={{fontSize: 10, fontWeight:'bold', marginTop: 2}}>4~7</Text>
              <View style={[Box.weekBox, {backgroundColor: '#276221', marginLeft: 13}]}></View>
              <Text style={{fontSize: 10, fontWeight:'bold', marginTop: 2}}>7~</Text>
            </View>
        </View>
    )
}
export default ProfileHeaderStrick;