import React, { useState,useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, Pressable, Modal,onPress, Alert,TextInput } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//config
import Colors from '../../config/Colors'

export default function ImageInput({imageUri,OnChangeImage,price2,title2,getdetails}) {
    const [Name, onChangeName] = useState('');
    const [title, onChangeTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [pr,setpr]=useState('')
    const [lks,setlks]=useState("")
    const [ti,settif]=useState("")
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
            setlks(result.assets[0].uri)
            }
      };
  return (
    <>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)}  
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
          <View style={{ width:'90%',height:RFPercentage(67),
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
             
             {/* image picker */}
             <View style={{width:RFPercentage(17),height:RFPercentage(17),borderWidth:RFPercentage(0.3),
                     borderColor:Colors.lightgrey,borderRadius:RFPercentage(2),marginTop:RFPercentage(4),alignItems:'center',justifyContent:'center'}}>

              <TouchableOpacity activeOpacity={0.7} onPress={handlepress} style={{marginTop:RFPercentage(3)}}>
                
              <Image
              style={{
                     width: RFPercentage(14),
                     height: RFPercentage(14),
                     borderRadius:RFPercentage(2)
                     }}
                 source={require('../../../assets/images/shop1.png')} /> 
                
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={{bottom:RFPercentage(2)}}>
                   <Image
                     style={{
                     width: RFPercentage(3.5),
                     height: RFPercentage(3),
                     }}
                     source={require('../../../assets/images/cameraicon.png')} />
                     
                </TouchableOpacity>

          </View>

          {/* modal title & price */}
            
            <View style={{width:'90%',marginTop:RFPercentage(1)}}>
            <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
                           Title
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
                           onChangeText={(e)=>{onChangeTitle(e)
                            title2(e)
                            settif(e)
                            }}
                           value={title}
                           placeholder={'Enter title'}
                           placeholderTextColor={Colors.placeholder}
                       />
                     </View>
                     <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5),marginTop:RFPercentage(1.5)}}> 
                           price
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
                           onChangeText={(e)=>{onChangeName(e)
                          price2(e)
                          setpr(e)
                          }}
                           value={Name}
                           placeholder={'Enter price'}
                           placeholderTextColor={Colors.placeholder}
                       />
                     </View>

                   {/* button */} 
           <TouchableOpacity activeOpacity={0.7} onPress={() => {setModalVisible(!modalVisible)
          getdetails(lks,pr,ti) 
          }} 
                     style={{marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}>
                    <View style={{
                       width: RFPercentage(35), height: RFPercentage(6)
                     , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(2)
                     ,backgroundColor:'#FF9900' }}>
                     <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                         submit
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