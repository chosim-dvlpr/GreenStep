import { View, Text,ScrollView } from "react-native";
import React, {useState} from 'react';
import BoardMyPostCard from "./BoardMyPostCard";

const BoardMyPost = ({navigation}:any) => {
    const [myPosts, setMyPosts] = useState([{title :'같이 플로깅 해요~!', member:4, date:'2030/04/30'},
                                            {title :'같이 플로깅 해요~!!', member:4, date:'2031/04/30'}, 
                                            {title :'같이 플로깅 해요~!!', member:3, date:'2032/04/30'} 
                                        ])

    return(
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginBottom: 20}}>내 글</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 30}}>
                {myPosts.map((list, index) =>(
                    <BoardMyPostCard onPress={() => navigation.navigate('boarddetail')} {...list}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default BoardMyPost;