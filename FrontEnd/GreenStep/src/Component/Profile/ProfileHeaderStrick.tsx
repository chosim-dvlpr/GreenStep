import { View, Text, ScrollView} from "react-native";
import {useState} from 'react';
import Box from "../../Style/Box";
const ProfileHeaderStrick = () => {
    
    const [ploggingWeek, setPloggingWeek] = useState('')    
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
      
    return(
        <View style={[Box.calendarBox, {alignItems:'center'}]}>
          <Text style={{fontSize: 20}}>2023</Text>
          <Text></Text>
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