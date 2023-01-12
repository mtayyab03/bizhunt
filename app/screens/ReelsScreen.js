import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList,ImageBackground} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
// import Reels from 'expo-instagram-reels';

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'


export default function ReelsScreen(props) {
  const videos = [
    {
        id: '1',
        uri : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" ,

    },
    {
      id: '2',
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"

  },
{
    id: '3',
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"

},
]
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
   {/* <FlatList
                   contentContainerStyle={{justifyContent:'center'}}
                   style={{width:'100%',flexGrow:0}}
                   data={videos}
                   keyExtractor={videos=> videos.id.toString()}
                   showsVerticalScrollIndicator={false}
                   vertical
                   renderItem={({ item }) =>
                         <Reels  videos={item.uri} />
                           }/> */}
    </Screen>
  )
}