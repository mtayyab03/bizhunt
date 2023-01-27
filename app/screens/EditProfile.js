import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function EditProfile(props) {

    const editList = [
        {
            id: '1',
            title: 'Name',
            subtitle:'Enter Name'
    
        },
        {
            id: '2',
            title: 'Email',
            subtitle:'Enter Email'
    
      },
        {
            id: '3',
            title: 'Phone Number',
            subtitle:'Phone Number'
    
        },
    ]

  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

            <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
                    <HeaderMode title='Edit profile' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
            </View>
 
           
             {/* flastlist edit  */}
               <FlatList
               scrollEnabled={false}
               contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                style={{width: '85%', marginTop: RFPercentage(8),flexGrow:0}}
                data={editList}
                keyExtractor={editList => editList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>
                <View style={{marginTop:RFPercentage(3),}}>
                     <InputField title={item.title} placeholder={item.subtitle}   />
                 </View>
                } />
                
        
                <View style={{ marginTop: RFPercentage(3)}}>
                  <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
                      Country
                   </Text>
               <TouchableOpacity activeOpacity={0.7}  style={{ backgroundColor: Colors.inputcolor,
                           width: RFPercentage(45),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(7),
                             justifyContent:'center' }}>

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                                India
                          </Text>
                        <View style={{position:'absolute',right:RFPercentage(3)}}>
                          <Image
                            style={{
                                width: RFPercentage(4),
                                height: RFPercentage(4),
                                }}
                                source={require('../../assets/images/dropdownicon.png')} /> 
                         </View>
                        </View>
                       
                     </TouchableOpacity>
          </View>

                {/* button */} 
                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}} 
                                   style={{marginTop:RFPercentage(6),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Save'/>
                 </TouchableOpacity>
 </Screen>
  )
}