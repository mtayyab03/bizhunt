import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function ShopDays(props) {

    const [ticbox, setTicbox] = useState(false);

    const daysList = [
        {
            id: '1',
            day:'Monday',
            timef:'10:00am',
            timel:'06:00pm',
        },
        {
            id: '2',
            day:'Tuesday',
            timef:'10:00am',
            timel:'06:00pm',
    
      },
        {
            id: '3',
            day:'Wednsday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
        {
            id: '4',
            day:'Thursday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
        {
          id: '5',
          day:'Friday',
          timef:'10:00am',
          timel:'06:00pm',
    
      },
        {
            id: '6',
            day:'Saturday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
        {
            id: '7',
            day:'Sunday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
    ]

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
        <CircleLine title='4'/>
        <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),
               borderColor:Colors.secondary,borderWidth:RFPercentage(0.3),alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:Colors.secondary}}>
               5
             </Text>
        </View>

      </View>

      {/* title */}

      <View style={{marginTop:RFPercentage(7)}}>
        <Text style={{fontWeight:'600',color:Colors.secondary}}>
            Choose your business days and hours
        </Text>
      </View>

      {/* flat listdays time */}
      <FlatList
                style={{ width: '85%', marginTop: RFPercentage(3)}}
                data={daysList}
                keyExtractor={daysList => daysList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>
                <View style={{  backgroundColor: Colors.white,
                           paddingHorizontal:RFPercentage(3),marginTop:RFPercentage(1),
                           borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center' }}>

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                         <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                         <TouchableOpacity activeOpacity={0.7} onPress={() => { setTicbox(true) }} 
                                  style={{ width: RFPercentage(3), height: RFPercentage(3), borderRadius:RFPercentage(1),
                                    borderWidth: RFPercentage(0.3), borderColor: Colors.secondary, 
                                   alignItems: 'center', justifyContent: 'center' }}>

                              {ticbox == true ?
                                  <TouchableOpacity activeOpacity={0.7} onPress={() => { setTicbox(false) }}>
                                      <Image
                                          style={{
                                              width: RFPercentage(1.7),
                                              height: RFPercentage(1.7),
                                          }}
                                          source={require('../../assets/images/ticlogo.png')} />
                                  </TouchableOpacity>
                                  : null}
                              
                        </TouchableOpacity>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(1.5), color: Colors.secondary }}>
                              {item.day}
                          </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute',right:0 }}>
                        <View style={{width:RFPercentage(8),height:RFPercentage(4),
                                      borderWidth:RFPercentage(0.3),borderColor:Colors.secondary,borderRadius:RFPercentage(2),
                                      alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:RFPercentage(1.5),color:Colors.secondary}}>
                                {item.timef}
                            </Text>
                        </View>
                        <View style={{width:RFPercentage(8),height:RFPercentage(4),marginLeft:RFPercentage(1),
                                      borderWidth:RFPercentage(0.3),borderColor:Colors.secondary,borderRadius:RFPercentage(2),
                                      alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:RFPercentage(1.5),color:Colors.secondary}}>
                                {item.timel}
                            </Text>
                        </View>

                    </View>
                        </View>

              </View>
             }/>

                 {/* button */} 
                 <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("ShopPagelinksScreen") }} 
                                   style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Next'/>
                    </TouchableOpacity>

      </Screen>

  )
}