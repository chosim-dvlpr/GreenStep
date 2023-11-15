import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput, StyleSheet } from "react-native"
import Box from "../../Style/Box";
import { Calendar, DateData } from "react-native-calendars";
import plus from '../../Image/Board/plus.png'
import minus from '../../Image/Board/minus.png'

interface CreateInfoProps {
    day? : string;
    location? : string;
    join? : number;
    showCalendar: boolean;
    handleJoinMinus: () => void;
    handleJoinPlus: () => void;
    onLocateChange: (locate: string) => void;
    handleDay: (date: DateData) => void;
    handleShow: () => void;
}

const BoardCRUDInfo = (props: CreateInfoProps) => {
    
    return(
        <ScrollView style={{marginBottom: 20}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={[Box.cardBox, {display:'flex'}]}>
                <Text style={{marginBottom: 10, fontSize:20}}>Information</Text>

                <View style={[Box.flexRowBox,{marginBottom: 10, justifyContent:'space-between' }]}>
                    <Text style={{fontSize: 20}}>지역</Text>
                    <SafeAreaView>
                        <TextInput style={styles.input} placeholder="지역을 입력하세요"
                                onChangeText={props.onLocateChange} value={props.location} />
                    </SafeAreaView>
                </View>
                
                <View style={[Box.flexRowBox,{marginBottom: 10, justifyContent:'space-between' }]}>
                    <Text style={{fontSize: 20}}>모집인원</Text>
                    <TouchableOpacity onPress={props.handleJoinMinus}>
                        <Image source={minus}></Image>
                    </TouchableOpacity>
                    <Text style={{fontSize: 25}}>{props.join}</Text>
                    <TouchableOpacity onPress={props.handleJoinPlus}>
                        <Image source={plus}></Image>
                    </TouchableOpacity>
                </View>

                <View style={[Box.flexRowBox,{marginBottom: 10, justifyContent:'space-between' }]}>
                    <Text style={{fontSize: 20}}>활동날짜</Text>
                    <TouchableOpacity onPress={props.handleShow}>
                        <Text style={{fontSize: 20}}>{props.day}</Text>
                    </TouchableOpacity>
                </View>

            {props.showCalendar && <Calendar onDayPress={props.handleDay}></Calendar>}
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
      width: 150,
      height: 35,
      marginHorizontal: 20,
      marginBottom: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
    },
  });

export default BoardCRUDInfo;