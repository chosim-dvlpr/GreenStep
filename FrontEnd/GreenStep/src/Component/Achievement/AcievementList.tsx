import { View, Text, Image } from "react-native";
import badge from '../../Image/Achievement/badge.png';
import notBadge from '../../Image/Achievement/notCompletedBadge.png';
import ImageStyle from "../../Style/Image";
import Box from "../../Style/Box";
import React, { useEffect, useState } from "react";
import * as Progress from 'react-native-progress';


interface AchievementListProps{
    atom : achieveProps;
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
  
const AchievementList = ({ atom }: AchievementListProps) => {

    const [reAtom, setReAtom] = useState({achieveName : '', goal: 1.1, my: 1, createdAt:''}) 
    useEffect(() => {

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
                    <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 20}}>{reAtom.achieveName}</Text>
                    <View>
                        <Text style={{fontWeight:'bold', marginBottom: 3}}>진행률 : {reAtom.my/reAtom.goal} % </Text>
                        <Progress.Bar
                        progress={reAtom.my / reAtom.goal}
                        width={null}
                        height={15}
                        color={'#FF0044'}
                        style={{marginBottom:5}}
                        />
                    </View>
                    <Text style={{fontWeight:'bold'}}>달성 날짜 : {atom.createdAt}</Text>
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