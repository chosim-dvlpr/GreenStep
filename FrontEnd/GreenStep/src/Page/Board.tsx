import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Box from '../Style/Box';
import ImageStyle from '../Style/Image';
import ButtonStyle from '../Style/ButtonStyle';
import character from '../Image/Character/panda.png';
import pencil from '../Image/Board/pencil.png';
const Board = () => {
  const [myList, setMyList] = useState([{title :'같이 플로깅 해요~!', member:'1/4 명', date:'2030/04/30'},
                                        {title :'같이 플로깅 해요~!!', member:'2/4 명', date:'2031/04/30'}, 
                                        {title :'같이 플로깅 해요~!!', member:'3/4 명', date:'2032/04/30'} 
                                      ]) 
  const [boardList, setBoardList] = useState([{title :'같이 플로깅 해요~!!!!!', member:'1/5 명', date:'2030/04/30'},
                                              {title :'같이 플로깅 해요~!!!', member:'2/5 명', date:'2031/04/30'}, 
                                              {title :'같이 플로깅 해요~!', member:'3/5 명', date:'2032/04/30'},
                                              {title :'같이 플로깅 해요~!', member:'3/5 명', date:'2032/04/30'}
                                              ])

  return (
    <View style={{flex:1}}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
          <Text style={{fontSize: 22, fontWeight:'bold'}}>크루 찾기</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginBottom: 20}}>내 글</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 30}}>
              {myList.map((list, index) =>(
                <View style={[Box.mediumCardBox, {marginLeft: 10}]}>
                    <Text style={{fontSize:16, fontWeight:'bold', marginBottom: 10}} numberOfLines={1} ellipsizeMode="tail">{list.title}</Text>
                    <Text style={{fontSize:12, marginBottom: 10}}>인원 {list.member}</Text>
                    <Text style={{fontSize:12}}>날짜 {list.date}</Text>
                  </View>
              ))}
            </ScrollView>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginBottom: 20}}>최신</Text>
        
          <ScrollView >
                {boardList.map((list, index) =>(
                  <View style={{alignItems:'center', marginBottom: 20}}>
                    <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
                      <View>
                        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 20}}>{list.title}</Text>
                        <Text style={{marginBottom: 20}}>인원 {list.member}</Text>
                        <Text style={{marginBottom: 20}}>날짜 {list.date}</Text> 
                      </View>
                      <View>
                        <Image source={character} style={ImageStyle.mediumImage}></Image>
                      </View>
                    </View>
                  </View>
                ))}
          </ScrollView>
        </ScrollView>

        <TouchableOpacity style={[ButtonStyle.smallButton,ButtonStyle.achievementButton,
                                 {position:'absolute', bottom: 20, alignSelf: 'center',
                                  display:'flex', flexDirection: 'row', 
                                  justifyContent: 'space-evenly', alignItems:'center'
                                 }]}>
            <Image source={pencil} style={{width:15, height: 15}}></Image>
            <Text style={{fontSize:16, color:'white', fontWeight:'bold'}}>글 쓰기</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Board;
