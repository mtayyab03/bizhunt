import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ScrollView, FlatList} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'

//config
import Colors from '../config/Colors'
import Dropdown from '../components/common/Dropdown'

export default function StatementScreen(props) {


  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

             <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
                     <HeaderMode title='Payment Details' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
             </View>

             {/* Download statemet */}
             <View style={{ marginTop: RFPercentage(7)}}>
                   <Text style={{fontSize:RFPercentage(1.8),fontWeight:'500',color:'#838383', marginBottom: RFPercentage(1.5)}}> 
                           Download statemets
                   </Text>

                   <Dropdown title='This year'/>
                   <View style={{marginTop:RFPercentage(2)}}>
                   <Dropdown title='2022'/>
                   </View>
                   <View style={{marginTop:RFPercentage(2)}}>
                   <Dropdown title='2021'/>
                   </View>
                   <View style={{marginTop:RFPercentage(2)}}>
                   <Dropdown title='2020'/>
                   </View>

{/* 2021 */}

          </View>
    </Screen>
  )
}