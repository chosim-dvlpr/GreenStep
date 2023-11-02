import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import Box from "../../Style/Box";
import { Calendar, DateData } from "react-native-calendars";
import { useState } from "react";
import plus from '../../Image/Board/plus.png'
import minus from '../../Image/Board/minus.png'
const BoardCRUDInfo = () => {
    const [day, setDay] = useState('날짜 선택하기')
    const [showCalendar, setShowCalendar] = useState(false)
    const [join, setJoin] = useState(0)

    const handleDay = (day:DateData) => {
        setDay(day.dateString)
        setShowCalendar(false)
    }
    const handleShow = () =>{
        setShowCalendar(!showCalendar)
    }
    const handleJoinPlus = () => {
        setJoin(join+1)
    }
    const handleJoinMinus = () => {
        if (join > 0) {
            setJoin(join-1)
        }
    }
    return(
        <ScrollView style={{marginBottom: 20}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
        <View style={[Box.cardBox, {display:'flex'}]}>
            <Text style={{marginBottom: 10, fontSize:20}}>Information</Text>
            <View style={{display: 'flex', flexDirection:'row', marginBottom: 10, justifyContent:'space-between' }}>
                <Text style={{fontSize: 20}}>모집인원</Text>
                <TouchableOpacity onPress={handleJoinMinus}>
                    <Image source={minus}></Image>
                </TouchableOpacity>
                <Text style={{fontSize: 25}}>{join}</Text>
                <TouchableOpacity onPress={handleJoinPlus}>
                    <Image source={plus}></Image>
                </TouchableOpacity>
            </View>

            <View style={{display: 'flex', flexDirection:'row', marginBottom: 10, justifyContent:'space-between' }}>
                    <Text style={{fontSize: 20}}>활동날짜</Text>
                <TouchableOpacity onPress={handleShow}>
                    <Text style={{fontSize: 20}}>{day}</Text>
                </TouchableOpacity>
            </View>
            {showCalendar && <Calendar onDayPress={handleDay}></Calendar>}
        </View>
        </View>
        </ScrollView>
    )
}
export default BoardCRUDInfo;