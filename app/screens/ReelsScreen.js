import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList,ImageBackground} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'

//config
import Colors from '../config/Colors'


export default function ReelsScreen(props) {
 

  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
                         {/* <Reels  videos={videos} pauseOnOptionsShow={false} /> */}
                         <Text>Reels Screen</Text>
                           
    </Screen>
  )
}