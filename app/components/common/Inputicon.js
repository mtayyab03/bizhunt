import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput,FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../../config/Colors'

export default function Inputicon({title,imageSource}) {
    const [link, onChangeLink] = useState('');
  return (
    <View style={{   backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),
        borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center',marginTop:RFPercentage(2) }}>

<View style={{ flexDirection: 'row', alignItems: 'center',  }}>

 <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }}
  source={imageSource} />

 <TextInput
        style={{width:'100%',paddingLeft:RFPercentage(1.5),
                fontSize:RFPercentage(2),color:Colors.secondary}}
         onChangeText={onChangeLink}
         value={link}
         placeholder={title}
         placeholderTextColor={'#DEDCDC'}
     /> 
 
</View>

</View>
  )
}