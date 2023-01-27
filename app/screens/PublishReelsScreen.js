import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList,ImageBackground} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function PublishReelsScreen(props) {
    const linkList = [
        {
            id: '1',
            imageSource: require('../../assets/images/shop1.png'),
    
        },
        {
          id: '2',
          imageSource: require('../../assets/images/shop2.png'),
    
      },
      {
        id: '3',
        imageSource: require('../../assets/images/shop3.png'),
  
    },
    {
        id: '4',
        imageSource: require('../../assets/images/shop2.png'),
  
    },
    {
        id: '5',
        imageSource: require('../../assets/images/shop1.png'),
  
    },
    ]
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

    {/* headerMode */}
        <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
                <HeaderMode title='Reels' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
        </View>
    
         {/* button */} 
         <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('ReelsRecordScreen')}} 
                                       style={{marginTop:RFPercentage(6),marginBottom:RFPercentage(4)}}>
                    <AppButton title='Post a Reel'/>
         </TouchableOpacity>

         {/* congrats publish */}
     <View style={{marginTop:RFPercentage(3)}}>
        <Text style={{color:Colors.secondary,fontSize:RFPercentage(2),fontWeight:'600'}}>
             Congrats, Your reel is now published!
        </Text>
     </View>

    
                 <FlatList
                       contentContainerStyle={{justifyContent:'center'}}
                       style={{width:'95%',marginTop: RFPercentage(8),flexGrow:0}}
                       data={linkList}
                       keyExtractor={linkList => linkList.id.toString()}
                       showsVerticalScrollIndicator={false}
                       vertical
                       numColumns={3}
                       renderItem={({ item }) =>
    
                         <View style={{width:RFPercentage(15),height:RFPercentage(15),alignItems:'center',justifyContent:'center',marginLeft:RFPercentage(2),marginTop:RFPercentage(2)}}>
    
                         <ImageBackground
                            style={{
                                width: RFPercentage(16.5),
                                height: RFPercentage(16.5),
                            }}
                            source={item.imageSource} >
    
                              <View style={{
                                width: RFPercentage(16.5),
                                height: RFPercentage(16.5),
                                backgroundColor:'#868686',
                                opacity:0.6,alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity activeOpacity={0.7} style={{alignItems:'center',justifyContent:'center'}}  >
                                   <Image
                                    style={{
                                        width: RFPercentage(5),
                                        height: RFPercentage(5),
                                    }}
                                    source={require('../../assets/images/playicon.png')} />
                                </TouchableOpacity>
    
                              </View>
                            </ImageBackground>
                           </View>
                       }/>
    
        </Screen>
  )
}