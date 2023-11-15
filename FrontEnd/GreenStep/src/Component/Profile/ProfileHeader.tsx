import { View, Text, StyleSheet } from "react-native";
import React from 'react';

const ProfileHeader = ({name}:any) => {

  return(
    <View>
      <Text style={styles.profileHeaderText}>Hello! {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileHeaderText: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
  }
})

export default ProfileHeader;