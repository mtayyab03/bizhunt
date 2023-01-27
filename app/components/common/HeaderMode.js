import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'


//config
import Colors from '../../config/Colors'

export default function HeaderMode({title,onpress}) {
  return (
  
   <>
     <TouchableOpacity activeOpacity={0.7} onPress={onpress} 
          style={{ position:'absolute',left:RFPercentage(2) }}>
         <Image
          style={{
              width: RFPercentage(2.5),
              height: RFPercentage(2.5),
          }}
          source={require('../../../assets/images/arowblogo.png')} />
      </TouchableOpacity>

      <Text style={{fontWeight:'600',fontSize:RFPercentage(2.5), color:Colors.secondary}}>
         {title}
      </Text>

    </>

  )
}