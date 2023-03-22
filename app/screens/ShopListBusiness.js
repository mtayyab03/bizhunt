import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, Modal,Pressable } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as FormData from 'form-data';
//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'
import Loading from './Loading';
//config
import Colors from '../config/Colors'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthProvider,useAuth,AuthContext } from '../../contextapi/Auth';
import postDataapi from '../../redux/apicall';
import uuid from 'react-native-uuid';
const imageid=uuid.v4().slice(0,10);
import Parse from 'parse/react-native.js';
export default function ShopListBusiness(props) {
  const { user, login, logout, isLoading } = useAuth();
  const [image, setImage] = useState(null);
  const [title,settitle]=useState("")
  const [category,setcategory]=useState("")
  const [desc,setdesc]=useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [cats,setcats]=useState([])
  const[load,setlaod]=useState(false)
  const[since,setsince]=useState("")
  const[base64image,setbase64image]=useState()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Add this option to get the base64 encoding
    });


    if (!result.canceled) {
     setImage(result);
    //  setimagename(result.assets[0].assetId)
     setbase64image(`data:${result.assets[0].type};base64,${result.assets[0].base64}`); // Set the image state to the base64 encoding
    }
  };
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
        'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  
  const getcats=async()=>{
    setlaod(true)
    postData("https://parseapi.back4app.com/classes/BusinessCategory")
    .then((data) => {
      setcats(data.results); // JSON data parsed by `data.json()` call
      setlaod(false)
    }).catch((e)=>{
      setlaod(false)
      console.log("error")
    }) 
  }
  const navfunctions = async () => {
 if(title!==""&&desc!==""&&category!==""&&since!==""&&base64image!=="")
 {
  setlaod(true);
  const myNewObject = new Parse.Object('BusinessInfo');
myNewObject.set('category', category);
myNewObject.set('description', desc);
myNewObject.set('inBusinessSince', since);
myNewObject.set('userId', user?.objectId);
myNewObject.set('name', title);
myNewObject.set('active', true);
myNewObject.set('business_PrimaryImage', new Parse.File(imageid.toString(), { base64: base64image }));
myNewObject.set('rating', 0);
try {
 
  const result = await myNewObject.save();
  props.navigation.navigate("ShopDetailsScreen", { buisenessid: result?.id});
  setlaod(false)
} catch (error) {
  alert("Failed tryagain later")
  setlaod(false)
}
 }
 else
 {
  alert("Some Feilds are missing")
 }
  };
  
  const abort=new AbortController()
  React.useEffect(()=>{
    getcats()
   },[])
  if(load)
  {
      return(<Loading/>)
  }
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
<ScrollView showsVerticalScrollIndicator={false}>
      {/* Images picker */}

          <View style={{width:"100%",height:RFPercentage(17),marginTop:RFPercentage(4),alignItems:'center',justifyContent:'center'
                     }}>

              <TouchableOpacity activeOpacity={0.7} onPress={pickImage} style={{marginTop:RFPercentage(3)}}>
                {image? null :
              <Image
              style={{
                     width: RFPercentage(14),
                     height: RFPercentage(14),
                     borderRadius:RFPercentage(2)
                     }}
                 source={require('../../assets/images/shop1.png')} /> }
                {image && <Image source={{ uri: image.assets[0].uri }} style={{ width: RFPercentage(14),
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
                    
             <InputField
             
             onChangeText={(e)=>{settitle(e)}} title='Title' placeholder='Title' />

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
                onChangeText={(e)=>setdesc(e)}
                value={desc}
                placeholder='Write the description'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
        </View>
                  {/* buiseness Since */}
                  <View style={{ marginTop: RFPercentage(3)}}>
           <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
               Business Since
           </Text>

       <View style={{
           width: RFPercentage(45),
           height: RFPercentage(6),
           backgroundColor: '#F2F3F7',
           color: Colors.black,
           paddingLeft: RFPercentage(2),
           paddingTop:RFPercentage(1.5),
           borderRadius: RFPercentage(1.5),
           }}>
           <TextInput
              style={{fontSize:RFPercentage(2)}}
                onChangeText={(e)=>setsince(e)}
                value={since}
                placeholder='Buiseness Since'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
        </View>
 {/* country */}
        {/* <View style={{ marginTop: RFPercentage(3) }}>
                    
        <TouchableOpacity activeOpacity={0.7}  style={{ backgroundColor: Colors.inputcolor,
                           width: RFPercentage(45),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(7),
                             justifyContent:'center' }} onPress={() => setModalVisible2(true)} >

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                          {country===''?"Select country":country?.Name}
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
         </View> */}

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
                          {category.length<=0?"Select category":category}
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
          {
            cats?.map((item,i)=>(
              <TouchableOpacity key={i} onPress={()=>{
                setModalVisible(!modalVisible)
               setcategory(item?.Category)
             }} activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>{item?.Category}</Text>
               </TouchableOpacity>
           
            ))
          }
          </View>
        </View>
      </Modal>
      
          {/* button */} 
            <TouchableOpacity activeOpacity={0.7} onPress={navfunctions} style={{marginTop:RFPercentage(2)}}>
                <AppButton title='Next'/>
              </TouchableOpacity>
              </ScrollView>
</Screen>
  )
}

const styles = StyleSheet.create({
  
});