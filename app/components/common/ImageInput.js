import React, { useState,useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, Pressable, Modal,onPress, Alert,TextInput } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//config
import Colors from '../../config/Colors'

export default function ImageInput({imageUri,OnChangeImage}) {
    const [Name, onChangeName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        requestPermission();
    }, [])
    const requestPermission=async ()=>{
        const {granted}=await ImagePicker.requestCameraPermissionsAsync()
        if(!granted)
        alert('You need to enable permission to access the library')
    }

    const handlepress=()=>{
        if(!imageUri) pickImage();
        else Alert.alert('Delete','Are you sure you want to delete?',[
            {text:'Yes',onPress:()=>{OnChangeImage(null)}},
            {text:'No'}
        ])

    }

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
            OnChangeImage(result.assets[0].uri);
        }
      };
  return (
    <>
        <TouchableOpacity activeOpacity={0.7} onPress={handlepress} 
               style={{width:RFPercentage(15),height:RFPercentage(15),borderRadius:RFPercentage(1),
                 backgroundColor:Colors.grey,alignItems:'center',justifyContent:'center',marginLeft:RFPercentage(3)}}>
             {!imageUri &&   <MaterialCommunityIcons name="camera" color={Colors.white} size={40} />}
                  {imageUri && <Image source={{ uri: imageUri }} style={{ width: RFPercentage(15),
                     height: RFPercentage(15),
                     borderRadius:RFPercentage(1) }} />}
                
         </TouchableOpacity>

         {/* image picker Modal */}
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
                         source={require('../../../assets/images/cancelicon.png')} /> 
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
      </>

  )
}