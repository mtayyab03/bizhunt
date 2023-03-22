import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../../config/Colors'

export default function InputField({title,placeholder,onChangeText}) {

  const [Name, onChangeName] = useState('');

  return (

    <>
    <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
      {title}
    </Text>

    <View style={{
        width: RFPercentage(45),
        height: RFPercentage(7),
        backgroundColor: '#F2F3F7',
        color: Colors.black,
        paddingLeft: RFPercentage(3),
        borderRadius: RFPercentage(1.5),
        justifyContent: 'center'
    }}>
   <TextInput
      style={{width:RFPercentage(45)}}
      onChangeText={(e)=>{
        onChangeName(e)
        onChangeText(e)
      }}
      value={Name}
      placeholder={placeholder}
      placeholderTextColor={Colors.placeholder}
  />
</View>

</>

  )
}