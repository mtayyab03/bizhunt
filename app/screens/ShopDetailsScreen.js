import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function ShopDetailsScreen(props) {

  const [Name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');

  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

        <ScrollView  showsVerticalScrollIndicator={false} style={{marginLeft:RFPercentage(5),width:'90%'}}>

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
        <CircleLine title='2'/>
        <CircleLine title='3'/>
        <CircleLine title='4'/>
        <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),
               borderColor:Colors.secondary,borderWidth:RFPercentage(0.3),alignItems:'center',justifyContent:'center'}}>
         <Text style={{color:Colors.secondary}}>
            5
          </Text>
        </View>

      </View>

      {/* Shop Details */}
      <View style={{ marginTop: RFPercentage(8)}}>
           <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
               Address line 1
           </Text>

       <View style={{
           width: RFPercentage(45),
           height: RFPercentage(12),
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
                placeholder='Address line 1'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
        </View>

        <View style={{ marginTop: RFPercentage(3)}}>
           <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
               Address line 2
           </Text>

       <View style={{
           width: RFPercentage(45),
           height: RFPercentage(12),
           backgroundColor: '#F2F3F7',
           color: Colors.black,
           paddingLeft: RFPercentage(2),
           paddingTop:RFPercentage(1.5),
           borderRadius: RFPercentage(1.5),
           }}>
           <TextInput
              style={{fontSize:RFPercentage(2),width:RFPercentage(45)}}
                onChangeText={onChangeDescription}
                value={description}
                placeholder='Address line 2'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
        </View>

        {/* country */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
            <InputField title='Country' placeholder='India' />
       
         </View>

         {/* state */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
             <InputField title='State' placeholder='Haryana' />
               
         </View>

          {/* City */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
             <InputField title='City' placeholder='Enter City' />
                      
        </View>

         {/* Zipcode */}
         <View style={{ marginTop: RFPercentage(3) }}>
                    
                 <InputField title='Zipcode' placeholder='Enter Zipcode' />
                      
        </View>

        {/* Phone */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
                    <InputField title='Phone' placeholder='Enter phone' />
                         
           </View>

           {/* Zipcode */}
         <View style={{ marginTop: RFPercentage(3) }}>
                    
                    <InputField title='Email' placeholder='Enter email' />
                         
           </View>

                 {/* button */} 
                  <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("ShopProductsAddScreen") }} 
                                   style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Next'/>
                  </TouchableOpacity>
        </ScrollView>
      </Screen>
  )
}