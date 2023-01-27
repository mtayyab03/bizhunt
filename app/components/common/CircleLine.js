import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'


//config
import Colors from '../../config/Colors'

export default function CircleLine({title}) {
  return (
    <>
    <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),
        borderColor:Colors.secondary,borderWidth:RFPercentage(0.3),alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:Colors.secondary}}>
            {title}
        </Text>
    </View>
   <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>
   
   </>
  )
}