import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ButtonStyle from '../../Style/ButtonStyle';
import TextStyle from '../../Style/Text';
interface AchievementButtonProps {
    atom: string;
    onPress: () => void; 
  }

  const AchievementButton = ({ atom, onPress }: AchievementButtonProps) => {
    
        return(
            <TouchableOpacity
                    style={[ButtonStyle.smallButton, ButtonStyle.achievementButton]}
                    onPress={onPress}>
                <Text style={[TextStyle, {fontSize: 16, fontWeight:'bold', fontFamily: 'SUITE-Bold'}]}>{atom}</Text>
            </TouchableOpacity>
    )
}

export default AchievementButton;