import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ScrollView, FlatList} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function UpgradePremium(props) {
    const editList = [
        {
            id: '1',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Upload upto 5 media files.',
    
        },
        {
            id: '2',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Get reviews and ratings of your services from your customers',
    
      },
        {
            id: '3',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Build your business statistics of views and ratings to boost your in customer’s search.',
    
        },
        {
            id: '4',
            imageSource: require('../../assets/images/redcancel.png'),
            title: 'Upload upto 50 media files.',
    
        },
        {
            id: '5',
            imageSource: require('../../assets/images/redcancel.png'),
            title: 'Upload video files.',
    
      },
        {
            id: '6',
            imageSource: require('../../assets/images/redcancel.png'),
            title: 'Get your business boosted to show on top for your customers search results.',
    
        },

    ]

    const paidplanList = [
        {
            id: '1',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Upload upto 50 media files.',
    
        },
        {
            id: '2',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Upload video files.',
    
      },
        {
            id: '3',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Get your business boosted to show on top for your customers search results.',
    
        },
        {
            id: '4',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Build your business statistics of views and ratings to boost your in customer’s search.',
    
        },
        {
            id: '5',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Get reviews and ratings of your services from your customers',
    
      },
        {
            id: '6',
            imageSource: require('../../assets/images/ticcircle.png'),
            title: 'Cancel anytime.',
    
        },

    ]
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
        <ScrollView contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false} style={{width:'100%'}}>


             <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
                     <HeaderMode title='Upgrade to premium' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
             </View>
             
             {/* detail */}

          <View style={{width:'80%',height:RFPercentage(23),
                     backgroundColor:Colors.primary,borderRadius:RFPercentage(2),marginTop:RFPercentage(7),
                     alignItems:'center',justifyContent:'center'}}>
              
            <View style={{width:'90%',marginTop:RFPercentage(1),marginBottom:RFPercentage(2),alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'600',fontSize:RFPercentage(2.4), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                     Our Simple, All-inclusive Pricing
              </Text>
            </View>
              <View style={{width:'90%',height:RFPercentage(0.3),backgroundColor:Colors.white,borderRadius:RFPercentage(3)}}/>
              <View style={{width:'90%',marginTop:RFPercentage(1),alignItems:'center',justifyContent:'center',}}>
                <Text style={{fontWeight:'400',fontSize:RFPercentage(2), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                      Our simple, straightforward plans offer never change..so you peace of mind at all time.
                      No more surprise bills.
                </Text>
            </View>
          </View>

          {/* Free Plan */}
          <View style={{width:'75%',height:RFPercentage(73),justifyContent:'center',
                     backgroundColor:Colors.secondary,borderRadius:RFPercentage(2),marginTop:RFPercentage(3),
                     alignItems:'center',}}>
              
            <View style={{width:'90%',marginTop:RFPercentage(1),marginBottom:RFPercentage(1),alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'600',fontSize:RFPercentage(2.4), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                     Free
              </Text>
            </View>
              <View style={{width:'80%',alignItems:'center',justifyContent:'center',}}>
                <Text style={{fontWeight:'400',fontSize:RFPercentage(1.7), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                      You can now put you business on internet and expand your opportunity with no cost
                </Text>
            </View>
            
            <View style={{width:'85%',height:RFPercentage(0.2),backgroundColor:Colors.white,borderRadius:RFPercentage(3),
            marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}/>
          
              <Text style={{fontWeight:'600',fontSize:RFPercentage(5), color:Colors.white,
                    textAlign:'center'}}>
                   $0
               </Text>

            <View style={{width:'85%',height:RFPercentage(0.2),backgroundColor:Colors.white,borderRadius:RFPercentage(3),
            marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}/>

      {/* flatlistfree plan description */}
       <FlatList
               scrollEnabled={false}
                style={{width:'80%',flexGrow:0,paddingLeft:RFPercentage(2)}}
                data={editList}
                keyExtractor={editList => editList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>
                <View style={{width:'80%'}}>
             
                  <View style={{flexDirection:'row',marginTop:RFPercentage(0.8)}}>
                     <Image  style={{
                            width: RFPercentage(2),
                            height: RFPercentage(2),
                               }}
                      source={item.imageSource} />
                
                        <Text style={{fontWeight:'400',fontSize:RFPercentage(1.5), color:Colors.white,paddingLeft:RFPercentage(2)}}>
                                  {item.title}
                        </Text>
                  </View>
                </View>
                }/>
             
             {/* button */}
             <TouchableOpacity activeOpacity={0.7} style={{
              width: RFPercentage(30), height: RFPercentage(6)
            , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(5)
            ,backgroundColor:'#FF9900' }}>
            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                  Continue with Free Plan
            </Text>
            </TouchableOpacity>
          </View>

          {/* paid plan */}
          <View style={{width:'75%',height:RFPercentage(73),justifyContent:'center',marginBottom:RFPercentage(3),
                     backgroundColor:Colors.secondary,borderRadius:RFPercentage(2),marginTop:RFPercentage(3),
                     alignItems:'center',}}>
              
            <View style={{width:'90%',marginTop:RFPercentage(1),marginBottom:RFPercentage(1),alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'600',fontSize:RFPercentage(2.4), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                     Paid Plan
              </Text>
            </View>
              <View style={{width:'80%',alignItems:'center',justifyContent:'center',}}>
                <Text style={{fontWeight:'400',fontSize:RFPercentage(1.7), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                      This plan gives you advantages boost your business.
                </Text>
            </View>
            
            <View style={{width:'85%',height:RFPercentage(0.2),backgroundColor:Colors.white,borderRadius:RFPercentage(3),
            marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}/>
          
              <Text style={{fontWeight:'600',fontSize:RFPercentage(5), color:Colors.white,
                    textAlign:'center'}}>
                   $30
               </Text>
               <Text style={{fontWeight:'600',fontSize:RFPercentage(2), color:Colors.white,
                      textAlign:'center',lineHeight:RFPercentage(3.5)}}>
                     per month billed annually
              </Text>

            <View style={{width:'85%',height:RFPercentage(0.2),backgroundColor:Colors.white,borderRadius:RFPercentage(3),
            marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}/>

      {/* flatlistfree plan description */}
       <FlatList
                scrollEnabled={false}
                style={{width:'80%',flexGrow:0,paddingLeft:RFPercentage(2)}}
                data={paidplanList}
                keyExtractor={paidplanList => paidplanList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>
                <View style={{width:'80%'}}>
             
                  <View style={{flexDirection:'row',marginTop:RFPercentage(0.8)}}>
                     <Image  style={{
                            width: RFPercentage(2),
                            height: RFPercentage(2),
                               }}
                      source={item.imageSource} />
                
                        <Text style={{fontWeight:'400',fontSize:RFPercentage(1.5), color:Colors.white,paddingLeft:RFPercentage(2)}}>
                                  {item.title}
                        </Text>
                  </View>
                </View>
                }/>
             
             {/* button */}
             <TouchableOpacity activeOpacity={0.7} style={{
              width: RFPercentage(30), height: RFPercentage(6)
            , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(5)
            ,backgroundColor:'#FF9900' }}>
            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                  Choose Plan
            </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
    </Screen>
  )
}