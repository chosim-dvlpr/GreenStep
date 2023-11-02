import { View, Text, ScrollView, Image } from "react-native"
import React, {useState} from 'react';
import BoardListDetail from "./BoardListDetail";

const BoardList = () => {

    const [boardList, setBoardList] = useState([{title :'같이 플로깅 해요~!!!!!', member:4, date:'2030/04/30'},
                                                {title :'같이 플로깅 해요~!!!', member:4, date:'2031/04/30'}, 
                                                {title :'같이 플로깅 해요~!', member:4, date:'2032/04/30'},
                                                {title :'같이 플로깅 해요~!', member:4, date:'2032/04/30'}
                                                ])

    return(
        <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginBottom: 20}}>최신</Text>
                <ScrollView >
                    {boardList.map((list, index) =>(
                        <BoardListDetail {...list}/>
                    ))}
                </ScrollView>

        </View>
    )
}
export default BoardList;