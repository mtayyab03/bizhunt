import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'

//config
import Colors from '../config/Colors'

export default function ThankYouScreen(props) {
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
        
    <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
        <HeaderMode title='Feedback' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
    </View>

    {/* ThankYou*/}
    <View style={{alignItems:'center',justifyContent:'center',height:'70%'}}>
               
                     <Image  style={{
                                        width: RFPercentage(8),
                                         height: RFPercentage(8),
                                     }}
                     source={require('../../assets/images/thankyouicon.png')} />

                    <Text style={{fontWeight:'600',fontSize:RFPercentage(2), color:Colors.secondary,marginTop:RFPercentage(4)}}>
                         Thank you for your feedback
                    </Text>
              
            </View>

    </Screen>
  )
}