import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function FeedbackScreen(props) {

  const [Name, onChangeName] = useState('');
  const [fillstar, setFillstar] = useState(false);


  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
        
          <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
              <HeaderMode title='Feedback' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
          </View>

         {/* feedback area */}
          <View style={{alignItems:'center',justifyContent:'center',height:'80%'}}>

          <View style={{width:'75%',marginTop:RFPercentage(3),alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'600',fontSize:RFPercentage(2.3), color:'#858585',marginTop:RFPercentage(4),
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                   How would you rate your experience with this app?
              </Text>
          </View>
              <View style={{width:'50%',flexDirection:'row',marginTop:RFPercentage(3),alignItems:'center',justifyContent:'space-between'}}>

                          {/* 1 star */}
                        {fillstar == true ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                                      <Image  style={{
                                             width: RFPercentage(4),
                                             height: RFPercentage(4),
                                                }}
                                       source={require('../../assets/images/staricon.png')} />
                            </TouchableOpacity>
                             : <TouchableOpacity activeOpacity={0.7} onPress={() => {setFillstar(true)}} >
                                   <Image  style={{
                                              width: RFPercentage(4),
                                              height: RFPercentage(4),
                                           }}
                                    source={require('../../assets/images/holostaricon.png')} />
                            </TouchableOpacity>}
                            
                            {/* 2 star */}
                        {fillstar == true ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                                      <Image  style={{
                                             width: RFPercentage(4),
                                             height: RFPercentage(4),
                                                }}
                                       source={require('../../assets/images/staricon.png')} />
                            </TouchableOpacity>
                             : <TouchableOpacity activeOpacity={0.7} onPress={() => {setFillstar(true)}} >
                                   <Image  style={{
                                              width: RFPercentage(4),
                                              height: RFPercentage(4),
                                           }}
                                    source={require('../../assets/images/holostaricon.png')} />
                            </TouchableOpacity>}
                            
                            {/* 3 star */}
                        {fillstar == true ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                                      <Image  style={{
                                             width: RFPercentage(4),
                                             height: RFPercentage(4),
                                                }}
                                       source={require('../../assets/images/staricon.png')} />
                            </TouchableOpacity>
                             : <TouchableOpacity activeOpacity={0.7} onPress={() => {setFillstar(true)}} >
                                   <Image  style={{
                                              width: RFPercentage(4),
                                              height: RFPercentage(4),
                                           }}
                                    source={require('../../assets/images/holostaricon.png')} />
                            </TouchableOpacity>}
                            
                            {/* 4 star */}
                        {fillstar == true ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                                      <Image  style={{
                                             width: RFPercentage(4),
                                             height: RFPercentage(4),
                                                }}
                                       source={require('../../assets/images/staricon.png')} />
                            </TouchableOpacity>
                             : <TouchableOpacity activeOpacity={0.7} onPress={() => {setFillstar(true)}} >
                                   <Image  style={{
                                              width: RFPercentage(4),
                                              height: RFPercentage(4),
                                           }}
                                    source={require('../../assets/images/holostaricon.png')} />
                            </TouchableOpacity>}
                            
                            {/* 5 star */}
                        {fillstar == true ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                                      <Image  style={{
                                             width: RFPercentage(4),
                                             height: RFPercentage(4),
                                                }}
                                       source={require('../../assets/images/staricon.png')} />
                            </TouchableOpacity>
                             : <TouchableOpacity activeOpacity={0.7} onPress={() => {setFillstar(true)}} >
                                   <Image  style={{
                                              width: RFPercentage(4),
                                              height: RFPercentage(4),
                                           }}
                                    source={require('../../assets/images/holostaricon.png')} />
                            </TouchableOpacity>}
                            
                                      
              </View>
        
        {/* dscription box */}
        <View style={{marginTop:RFPercentage(5)}}>
        <View style={{
           width: RFPercentage(45),
           height: RFPercentage(15),
           backgroundColor: '#F2F3F7',
           color: Colors.black,
           paddingLeft: RFPercentage(2),
           paddingTop:RFPercentage(1.5),
           borderRadius: RFPercentage(1.5),
           }}>
           <TextInput
              style={{fontSize:RFPercentage(2),width:RFPercentage(45)}}
                onChangeText={onChangeName}
                value={Name}
                placeholder='Describe your experience'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
         </View>

           {/* button */} 
           <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("ThankYouScreen") }} 
                     style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                    <AppButton title='Submit'/>
            </TouchableOpacity>
      </View>
    </Screen>
  )
}