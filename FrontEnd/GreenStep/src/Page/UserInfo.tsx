import { View, Text, TouchableOpacity, Image ,Alert} from "react-native";
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';
import UserInfoNameModal from "../Component/Profile/UserInfo/UserInfoNameModal";
import Box from "../Style/Box";
import move from '../Image/Profile/move.png'
import { useNavigation } from "@react-navigation/native";

const UserInfo = () => {
    
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [name, setName] = useState('User');
    const [percentage, setPerCentage] = useState(0);
    const [level, setLevel] = useState(0);
    const [toggle, setToggle] = useState(false)
    const [changeAble, setChangeAble] = useState(false)

    const handleToggle = () =>{
        setToggle(!toggle)
    }
    const onNameChange = (text:string) => {
        name;
        setName(text);
    };

    const getUserInfo = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          console.log(token);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          };
          const res = await axios.get(`${baseURL}/mypage`, config);
          console.log(res);
          setName(res.data.nickname);
          setPerCentage(res.data.exp);
          setLevel(res.data.level);
        } catch (err) {
          console.log('사용자 정보 조회 error', err);
        }
      };
    // 닉네임 변경 중복확인 
    const GetUserName =async (newname : string) => {
        try{
            const token = await AsyncStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization : `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${baseURL}/user/${newname}/exists`, config);
            console.log(res)
            if (res.data === true) {
                setChangeAble(res.data)
                Alert.alert("아이디 사용이 가능합니다.");
            }else{
                Alert.alert("중복된 아이디입니다.");

            }
        } catch(err){
            console.log('nickname 중복확인 오류', err, newname)
        }
    }
    //닉네임 변경
    const PatchUserName =async (name:string) => {
        try{
            const token = await AsyncStorage.getItem('accessToken');
            const requestBody = { nickname: name };
            const config = {
                headers: {
                    Authorization : `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.patch(`${baseURL}/user/update`, requestBody, config);
            console.log(res)
            setName(res.data.nickname)
            handleToggle()
            setChangeAble(false)
        } catch(err){
            console.log('nickname 변경 오류', err, name)
        }
    }
    //로그아웃
    const logout = async () => {
        try {
          AsyncStorage.removeItem('accessToken');
          AsyncStorage.removeItem('refreshToken');
          console.log('logout 실행');
          navigation.navigate('bottom', { screen: '메인 페이지' })
        //   navigation.navigate('main')
        } catch (error) {
          console.error('로그아웃 중 오류 발생:', error);
        }
      };

    useEffect(() => {
    if (isFocused) {
        getUserInfo();
    }
    }, [isFocused, name]);

    return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={[Box.cardBox, {display:'flex', flexDirection:'row', justifyContent:'space-between', marginVertical: 20}]}>
                <Text style={{fontSize:20}}>닉네임 : {name}</Text>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={handleToggle}>
                    <Text style={{fontSize:16, color: '#52A447'}}>변경하기</Text>
                </TouchableOpacity>
            </View>
            
            <View style={[Box.cardBox,{marginBottom: 20}]}>
            <Text style={{fontSize:20}}>LV : {level}</Text>
            </View>

            <View style={[Box.cardBox,{marginBottom: 20}]}>
            <Text style={{fontSize:20}}>경험치 : {percentage}</Text>
            </View>
            
            
            <TouchableOpacity style={[Box.cardBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}]}
                              onPress={logout}>
                <Text style={{fontSize:20}}>로그아웃</Text>
                <Image source={move} style={{width:25, height: 25, marginLeft: 20, marginTop:5}}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={[Box.cardBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}]}>
                <Text style={{fontSize:20}}>회원 탈퇴</Text>
                <Image source={move} style={{width:20, height: 20, marginLeft: 20, marginTop:5}}></Image>
            </TouchableOpacity>
            
            {toggle && 
                <UserInfoNameModal name={name} changeAble={changeAble} 
                checkAble={GetUserName} onNameChange={onNameChange}
                onClose={handleToggle} PatchUserName={PatchUserName}></UserInfoNameModal>
            }
        </View>
    )
}

export default UserInfo;