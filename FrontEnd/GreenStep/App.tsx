import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Achievement from './src/Page/Achievement';
import Board from './src/Page/Board';
import Competition from './src/Page/Competition';
import DataMap from './src/Page/DataMap';
import Main from './src/Page/Main';
import PloggingStart from './src/Page/PloggingStart';
import PloggingFinish from './src/Page/PloggingFinish';
import Profile from './src/Page/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import ImageStyle from './src/Style/Image';
import home from '../GreenStep/src/Image/Footer/home.png'
import profile from '../GreenStep/src/Image/Footer/profile.png'
import competition from '../GreenStep/src/Image/Footer/competition.png'
import dataMap from '../GreenStep/src/Image/Footer/dataMap.png'
import board from '../GreenStep/src/Image/Footer/board.png'

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarIcon(props) {
          if (route.name === '경쟁') {
            return <Image source={competition} style={ImageStyle.tinyImage} />;
          }
          else if(route.name === '크루 찾기'){
            return <Image source={board} style={ImageStyle.tinyImage} />;
          }
          else if(route.name === '메인 페이지'){
            return <Image source={home} style={ImageStyle.tinyImage} />;
          }
          else if(route.name === '데이터 지도'){
            return <Image source={dataMap} style={ImageStyle.tinyImage}/>;
          }
          else if(route.name === '마이 페이지'){
            return <Image source={profile} style={ImageStyle.tinyImage} />;
          }
        },
      })}>
      <Tab.Screen name="경쟁" component={Competition} />
      <Tab.Screen name="크루 찾기" component={Board} />
      <Tab.Screen name="메인 페이지" component={Main}/>
      <Tab.Screen name="데이터 지도" component={DataMap} />
      <Tab.Screen name="마이 페이지" component={Profile} />
    </Tab.Navigator>
  );
};
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="bottom" component={BottomTabScreen} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="achievement" component={Achievement} />
        <Stack.Screen name="board" component={Board} />
        <Stack.Screen name="competition" component={Competition} />
        <Stack.Screen name="datamap" component={DataMap} />
        <Stack.Screen name="ploggingstart" component={PloggingStart} />
        <Stack.Screen name="ploggingfinish" component={PloggingFinish} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
