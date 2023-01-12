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


export default function ReelCaption(props) {
    const [description, onChangeDescription] = useState('');
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

       {/* headerMode */}
        <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
                <HeaderMode title='Reels' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
        </View>

        <View style={{width:RFPercentage(20),height:RFPercentage(20),alignItems:'center',justifyContent:'center',marginTop:RFPercentage(7)}}>

<ImageBackground
   style={{
       width: RFPercentage(20),
       height: RFPercentage(20),
   }}
   source={require('../../assets/images/shop1.png')} >

     <View style={{
       width: RFPercentage(20),
       height: RFPercentage(20),
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

  {/* caption */}
  <View style={{
           width: RFPercentage(45),
           height: RFPercentage(12),
           backgroundColor: '#F2F3F7',
           color: Colors.black,
           paddingLeft: RFPercentage(2),
           paddingTop:RFPercentage(1.5),
           borderRadius: RFPercentage(1.5),
           marginTop:RFPercentage(7)
           }}>
           <TextInput
              style={{fontSize:RFPercentage(2),width:RFPercentage(45)}}
                onChangeText={onChangeDescription}
                value={description}
                placeholder='write a caption'
                placeholderTextColor={Colors.placeholder}
              />
         </View>

         {/* button */} 
         <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("PublishReelsScreen") }} 
                                   style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Publish'/>
          </TouchableOpacity>
    </Screen>
  )
}