import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, Modal,Pressable } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function ShopProductsAddScreen(props) {
    const [Name, onChangeName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

        {/* headerMode */}
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
        <CircleLine title='3'/>
        <CircleLine title='4'/>
        <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),
               borderColor:Colors.secondary,borderWidth:RFPercentage(0.3),alignItems:'center',justifyContent:'center'}}>
         <Text style={{color:Colors.secondary}}>
            5
          </Text>
        </View>

      </View>

      {/* button */} 
      <TouchableOpacity activeOpacity={0.7}  onPress={() => setModalVisible(true)} 
                                       style={{marginTop:RFPercentage(6),marginBottom:RFPercentage(4)}}>
                    <AppButton title='Create category'/>
         </TouchableOpacity>
{/* Review Modal */}
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex: 1,
                      justifyContent: 'center',
                      alignItems: "center",
                      marginTop: 29}}>
          <View style={{ width:'90%',height:RFPercentage(37),
                         backgroundColor: "white",
                         borderRadius: 20,
                         padding: 35,
                         alignItems: "center",
                         shadowColor: "#000",
                         shadowOffset: {
                           width: 0,
                           height: 2
                         },
                         shadowOpacity: 0.25,
                         shadowRadius: 4,
                         elevation: 5}}>
            <Pressable
              style={{width:'100%',alignItems:'flex-end'}}
              onPress={() => setModalVisible(!modalVisible)}
            >
                <Image
                     style={{
                         width: RFPercentage(4),
                         height: RFPercentage(4),
                         }}
                         source={require('../../assets/images/cancelicon.png')} /> 
            </Pressable>

            
            <View style={{width:'90%',marginTop:RFPercentage(1)}}>
                     <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
                           create category
                         </Text>
                     
                         <View style={{
                             width: RFPercentage(35),
                             height: RFPercentage(7),
                             backgroundColor: '#F2F3F7',
                             color: Colors.black,
                             paddingLeft: RFPercentage(3),
                             borderRadius: RFPercentage(1.5),
                             justifyContent: 'center'
                         }}>
                        <TextInput
                           style={{width:RFPercentage(45)}}
                           onChangeText={onChangeName}
                           value={Name}
                           placeholder={'Enter category'}
                           placeholderTextColor={Colors.placeholder}
                       />
                     </View>

                   {/* button */} 
           <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} 
                     style={{marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}>
                    <View style={{
                       width: RFPercentage(35), height: RFPercentage(6)
                     , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(2)
                     ,backgroundColor:'#FF9900' }}>
                     <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                         create
                     </Text>
                 </View>
            </TouchableOpacity>
          
      </View>
          </View>
        </View>
      </Modal>
        </Screen>
  )
}