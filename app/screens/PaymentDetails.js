import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, Switch, FlatList} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function PaymentDetails(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>


        <View style={{width:'87%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop: RFPercentage(4)}}>
           <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}} >
              <Image
               style={{
                   width: RFPercentage(2.5),
                   height: RFPercentage(2.5),
               }}
               source={require('../../assets/images/arowblogo.png')} />
           </TouchableOpacity>

               <Text style={{fontWeight:'600',fontSize:RFPercentage(2.5), color:Colors.secondary,marginLeft:RFPercentage(6)}}>
                  Payment Details
               </Text>
           <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('StatementScreen')}}
                         style={{width:RFPercentage(13),height:RFPercentage(3.5),alignItems:'center',
                         justifyContent: 'center',backgroundColor:Colors.primary,borderRadius:RFPercentage(1)}}>
                <Text style={{color:Colors.lightWhite,fontSize:RFPercentage(1.7)}}>
                  Statement
                </Text>

           </TouchableOpacity>
         </View>

         <View style={{marginTop:RFPercentage(5)}}>
            <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:'#4A4A4A'}}>
                Overview
            </Text>
         </View>
         <View style={{width:RFPercentage(22),height:RFPercentage(20),
            backgroundColor:Colors.primary,borderRadius:RFPercentage(2),alignItems:'center',justifyContent:'center',marginTop:RFPercentage(3)}}>
            <Text style={{fontWeight:'700',fontSize:RFPercentage(5), color:Colors.white,paddingRight:RFPercentage(1)}}>
                   $25
               </Text>
               <Text style={{fontWeight:'600',fontSize:RFPercentage(2), color:Colors.white,marginTop:RFPercentage(1)}}>
                     per month
              </Text>

            </View>

         {/* description set */}
            <View style={{width:'95%',marginTop:RFPercentage(6)}}>
               <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                             Next Payment due on
                          </Text>
                        <View style={{position:'absolute',right:RFPercentage(3)}}>
                           <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                                 Jan 20,2023  
                           </Text>
                         </View>
                 </View>
                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:RFPercentage(3) }}>
                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                             Term and date
                          </Text>
                        <View style={{position:'absolute',right:RFPercentage(3)}}>
                           <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                               Never  
                           </Text>
                         </View>
                 </View>
                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:RFPercentage(5) }}>
                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                             Autoplay
                          </Text>
                        <View style={{position:'absolute',right:RFPercentage(3)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Switch
                              
                              trackColor={{ false:"#959595", true: Colors.primary}}
                              thumbColor={isEnabled ?  Colors.white:Colors.primary}
                              ios_backgroundColor="#959595"
                              onValueChange={toggleSwitch}
                              value={isEnabled}
                            />
                            {isEnabled ?
                           <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                                ON 
                           </Text>
                           :
                           <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                                OFF
                           </Text> }
                           </View> 
                         </View>

                         
                 </View>
                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:RFPercentage(7) }}>
                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                          Payment History
                          </Text>
                        <TouchableOpacity activeOpacity={0.7} style={{position:'absolute',right:RFPercentage(3)}}>
                           <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                                see all 
                           </Text>
                         </TouchableOpacity>
                 </View>
             
             
            
                 </View>
                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:RFPercentage(7),backgroundColor:Colors.white,width:'90%',
                                  height:RFPercentage(7),borderRadius:RFPercentage(2) }}>
                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                             Payment scheduled for
                          </Text>
                        <TouchableOpacity activeOpacity={0.7} style={{position:'absolute',right:RFPercentage(3)}}>
                           <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                             Jan 20,2023
                           </Text>
                         </TouchableOpacity>
                 </View>

                  {/* button */} 
                  <TouchableOpacity activeOpacity={0.7} style={{marginTop:RFPercentage(3)}}>
                          <AppButton title='Make a payment'/>
                  </TouchableOpacity>
             </Screen>
  )
}