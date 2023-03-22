import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'


//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function ChatScreen(props) {
  const [search, onChangeSearch] = useState('');
  const profileList = [
    {
        id: '1',
        imageSource: require('../../assets/images/shop1.png'),
        title: 'Salon Shop',
        subtitle: 'Have a variety of colthes and different salon products',
    },
    {
      id: '2',
      imageSource: require('../../assets/images/shop2.png'),
      title: 'Barber Shop',
      subtitle: 'Have a variety of colthes and different brands,barber',
     },
     {
       id: '3',
       imageSource: require('../../assets/images/shop3.png'),
       title: 'Cloth Shop',
       subtitle: 'Have a variety of colthes and different brands',
   },
  ]
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

            <View style={{width:'85%',marginTop:RFPercentage(4)}}>
            
            <Text style={{fontWeight:'700',color:Colors.secondary,fontSize:RFPercentage(3)}}>
              Messages
            </Text>
            
            </View>
      <View style={{  width:'90%', backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),marginTop:RFPercentage(3),
                           borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center',  }}>

                    <Image style={{ width: RFPercentage(3.6), height: RFPercentage(3), }}
                     source={require('../../assets/images/searchicon.png')} />

                    <TextInput
                    style={{width:'100%',paddingLeft:RFPercentage(1.5),fontSize:RFPercentage(2.5),color:Colors.secondary}}
                            onChangeText={onChangeSearch}
                            value={search}
                            placeholder='search'
                            placeholderTextColor={'#DEDCDC'}
                        /> 
                    
                </View>
          </View>

         {/* line */}
          <View style={{width:'90%',height:RFPercentage(0.1),backgroundColor:Colors.lightgrey,
                           opacity:0.2,borderRadius:RFPercentage(2),marginTop:RFPercentage(3)}}/>
{/* flatlist on Profile List */}
       <FlatList
                scrollEnabled={false}
                style={{ width: '90%'}}
                data={profileList}
                keyExtractor={profileList => profileList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>
                 <>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("MessageScreen") }}
                              style={{ width: '90%',marginTop: RFPercentage(2),flexDirection: 'row', alignItems: 'center'  }}>
                 <View style={{ flexDirection: 'row', alignItems: 'center',width:'90%' }}>

              {/* picture */}
              <View style={{ width: RFPercentage(10), height: RFPercentage(10),alignItems:'center',justifyContent:'center',
              borderRadius: RFPercentage(5), overflow: 'hidden' }}>
                  <Image style={{ width: RFPercentage(8), height: RFPercentage(8), }} source={item.imageSource} />
              </View>
              
              {/* text */}
              <View style={{ marginLeft: RFPercentage(1) }}>
                  <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), color: Colors.secondary }}>
                     {item.title}
                  </Text>
                  <Text style={{ fontWeight: '300', fontSize: RFPercentage(1.8), color:Colors.grey,marginTop:RFPercentage(1) }}>
                      {item.subtitle}
                  </Text>
              </View>
              
              </View>
              </TouchableOpacity>

              {/* line */}
                <View style={{width:'100%',height:RFPercentage(0.1),backgroundColor:Colors.lightgrey,
                           opacity:0.2,borderRadius:RFPercentage(2),marginTop:RFPercentage(2)}}/>
                           </>
                }/>
    </Screen>
  )
}