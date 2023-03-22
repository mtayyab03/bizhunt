import { View, Text,ActivityIndicator } from 'react-native'
import * as React from 'react'
import Colors from '../config/Colors'
export default function Loading() {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  )
}