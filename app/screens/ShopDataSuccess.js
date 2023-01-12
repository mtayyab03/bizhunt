import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'

//config
import Colors from '../config/Colors'

export default function ShopDataSuccess(props) {
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
        
     <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
         <HeaderMode title='List your business' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
     </View>

     {/* CircleLine */}

      <View style={{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:RFPercentage(5)}}>
      <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 1
               </Text>
            </View>
   <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>

            <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 2
               </Text>
            </View>
   <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>

            <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 3
               </Text>
            </View>
   <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>

            <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 4
               </Text>
            </View>
   <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>
          
          <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 5
               </Text>
            </View>

            </View>

            {/* Sccesss */}
            <View style={{alignItems:'center',justifyContent:'center',height:'70%'}}>
               <Text style={{fontWeight:'800',fontSize:RFPercentage(2.5), color:Colors.secondary}}>
                  Success
               </Text>
               <View style={{width:'80%',marginTop:RFPercentage(3),alignItems:'center',justifyContent:'center',}}>

                     <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.6), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    Congratulations, your business is now online and searchable by customers.
                                    Yous business is on internet now.
                      </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}>
                    <Text style={{fontWeight:'700',fontSize:RFPercentage(2.5), color:Colors.secondary,marginTop:RFPercentage(4)}}>
                        OK
                    </Text>
               </TouchableOpacity>
            </View>
      </Screen>
  )
}