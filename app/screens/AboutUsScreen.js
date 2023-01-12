import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'

//config
import Colors from '../config/Colors'

export default function AboutUsScreen(props) {
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
        <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
         <HeaderMode title='About Us' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
     </View>

     {/* Information */}
     <View style={{alignItems:'center',justifyContent:'center',height:'75%'}}>
               <Text style={{fontWeight:'800',fontSize:RFPercentage(2.5), color:Colors.secondary}}>
                 Information
               </Text>
               <View style={{width:'80%',marginTop:RFPercentage(3),alignItems:'center',justifyContent:'center',}}>

                     <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    “ Our motto is to connect all local businesses to the Internet ”
                      </Text>
                      <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.8), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center',marginTop:RFPercentage(3) }}>
                                    Not only you can use this app to search for businesses and services nearby or anywhere, 
                                    you can also Not only can you use this app to search for anywhere, you can also 
                                   </Text>
                                   <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    PROMOTE YOUR BUSINESS OR TALENT AS A SERVICE OVER THE INTERNET
                                  </Text>
                                   <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.8), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    without spending a lot of money maintaining and selling your website. Your company is up and
                                     running in minutes and
                                    can be accessed and found by anyone. as a service over the internet without spending a lot of
                                     money maintaining
                                    and selling your website.
                                    Your company is up and running in minutes and can be accessed and found by anyone.
                      </Text>

                </View>
            </View>
    </Screen>
  )
}