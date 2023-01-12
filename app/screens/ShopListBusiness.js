import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, Modal,Pressable } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'



export default function ShopListBusiness(props) {

  const [image, setImage] = useState(null);
  const [Name, onChangeName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

     <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
         <HeaderMode title='List your business' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
     </View>

     {/* CircleLine */}

      <View style={{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:RFPercentage(5)}}>
        
        <CircleLine title='1'/>
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

      {/* Images picker */}

          <View style={{width:RFPercentage(17),height:RFPercentage(17),borderWidth:RFPercentage(0.3),
                     borderColor:Colors.lightgrey,borderRadius:RFPercentage(2),marginTop:RFPercentage(4),alignItems:'center',justifyContent:'center'}}>

              <TouchableOpacity activeOpacity={0.7} onPress={pickImage} style={{marginTop:RFPercentage(3)}}>
                {image? null :
              <Image
              style={{
                     width: RFPercentage(14),
                     height: RFPercentage(14),
                     borderRadius:RFPercentage(2)
                     }}
                 source={require('../../assets/images/shop1.png')} /> }
                {image && <Image source={{ uri: image }} style={{ width: RFPercentage(14),
                     height: RFPercentage(14),
                     borderRadius:RFPercentage(2) }} />}
                
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={{bottom:RFPercentage(2)}}>
                   <Image
                     style={{
                     width: RFPercentage(3.5),
                     height: RFPercentage(3),
                     }}
                     source={require('../../assets/images/cameraicon.png')} />
                     
                </TouchableOpacity>

          </View>

          {/* title */}
          
          <View style={{ marginTop: RFPercentage(3) }}>
                    
             <InputField title='Title' placeholder='Title' />

           </View>

           {/* description */}
           <View style={{ marginTop: RFPercentage(3)}}>
           <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
               Business Description
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
              style={{fontSize:RFPercentage(2)}}
                onChangeText={onChangeName}
                value={Name}
                placeholder='Write the description'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
        </View>

        {/* category */}
        <View style={{ marginTop: RFPercentage(3)}}>
           <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
               Category
           </Text>
               <TouchableOpacity activeOpacity={0.7}  style={{ backgroundColor: Colors.inputcolor,
                           width: RFPercentage(45),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(7),
                             justifyContent:'center' }} onPress={() => setModalVisible(true)} >

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                              select category
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

          {/* category Modal */}
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
                      justifyContent: 'flex-end',
                      alignItems: "center",
                      marginTop: 29}}>
          <View style={{ width:'100%',height:RFPercentage(37),
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

            {/* title */}
            <TouchableOpacity activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.primary,fontWeight:'600'}}>Select category</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
               <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>General Store</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
            <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>Beauty</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
            <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>Clothing</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
            <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>Construction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
          {/* button */} 
            <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("ShopDetailsScreen") }} style={{marginTop:RFPercentage(2)}}>
                <AppButton title='Next'/>
              </TouchableOpacity>
</Screen>
  )
}

const styles = StyleSheet.create({
  
});