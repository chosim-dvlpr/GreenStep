import { View, Text, Image } from "react-native";
import badge from '../../Image/Achievement/badge.png';
import notBadge from '../../Image/Achievement/notCompletedBadge.png';
import ImageStyle from "../../Style/Image";
import Box from "../../Style/Box";
import React, { useEffect, useState } from "react";
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';
import { msToHM } from "../../Function/Plogging/funcPlogging";
import TextStyle from "../../Style/Text";
interface AchievementListProps{
    atom : achieveProps;
    achievetype : number;
}
interface achieveProps{
    achieveName : string;
    achievePloggingCount: number | null;
    achieveTrashAmount : number | null;
    achieveTravelRange : number | null;
    achieveTravelTime: number | null;
    createdAt : string | null;
    myPloggingCount : number | null;
    myTrashAmount : number | null;
    myTravelRange: number | null;
    myTravelTime: number | null;
  }
  
const AchievementList = ({ atom, achievetype }: AchievementListProps) => {
    const isFocused = useIsFocused();
    const [reAtom, setReAtom] = useState({achieveName : '', goal: 1.1, my: 1, createdAt:''}) 
    
    const getUnit = (achievetype : number) => {
        switch(achievetype) {
            case 0: return "KM";
            case 1: return "";
            case 2: return "개";
            case 3: return "회";
        }
    };

    const handleTime = (achievetype: number): string | number => {
        let change: string | number = reAtom.goal;
        if (achievetype === 1) {
            change = msToHM(reAtom.goal);
        }
        return change;
    }
    
    useEffect(() => {
        if(isFocused){

            if (atom.achievePloggingCount !== null) {
                setReAtom({
                    achieveName: atom.achieveName,
                    goal: atom.achievePloggingCount,
                    my: atom.myPloggingCount ?? 0,
                    createdAt: atom.createdAt ?? ''
                });
            } else if (atom.achieveTrashAmount !== null) {
                setReAtom({
                    achieveName: atom.achieveName,
                    goal: atom.achieveTrashAmount,
                    my: atom.myTrashAmount ?? 0,
                    createdAt: atom.createdAt ?? ''
                });
            } else if (atom.achieveTravelRange !== null) {
                setReAtom({
                    achieveName: atom.achieveName,
                    goal: atom.achieveTravelRange,
                    my: atom.myTravelRange ?? 0,
                    createdAt: atom.createdAt ?? ''
                });
            } else if (atom.achieveTravelTime !== null) {
                setReAtom({
                    achieveName: atom.achieveName,
                    goal: atom.achieveTravelTime,
                    my: atom.myTravelTime ?? 0,
                    createdAt: atom.createdAt ?? ''
                });
            }
        }
    }, [atom]);

    return(
            <View style={[Box.cardBox,
                        {display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'space-between', 
                        alignItems:'center',
                        marginBottom: 30,
                        }]}>
                <View>
                    <Text style={[TextStyle.defaultBlack, {fontWeight:'bold', fontSize: 20, marginBottom: 20}]}>{reAtom.achieveName}</Text>
                    <Text style={[TextStyle.defaultBlack, {fontWeight:'bold', fontSize: 20, marginBottom: 10}]}>목표 : {handleTime(achievetype)} {getUnit(achievetype)}</Text>
                    <View>
                        <Text style={[TextStyle.defaultBlack, {fontWeight:'bold', marginBottom: 3}]}>진행률 : {reAtom.my/reAtom.goal >=1? 100 : Math.round((reAtom.my/reAtom.goal) * 100)} % </Text>
                        <Progress.Bar
                        progress={reAtom.my / reAtom.goal}
                        width={null}
                        height={15}
                        color={'#FF0044'}
                        style={{marginBottom:5}}
                        />
                    </View>
                    <Text style={[TextStyle.defaultBlack, {fontWeight:'bold'}]}>달성 날짜 : {reAtom.createdAt}</Text>
                </View>
                <View>
                    {reAtom.my / reAtom.goal >= 1 ?
                    <Image source={badge} style={ImageStyle.mediumImage}></Image>
                    :
                    <Image source={notBadge} style={ImageStyle.mediumImage}></Image>
                }
                </View>
            </View>
    )
}

export default AchievementList;