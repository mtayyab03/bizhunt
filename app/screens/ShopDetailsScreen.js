import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, ScrollView,Modal,Pressable } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'
import Loading from './Loading'
//config
import Colors from '../config/Colors'

export default function ShopDetailsScreen(props) {
  const data=props.route.params?.buisenessinfo
  const[add1,setadd1]=useState("")
  const[add2,setadd2]=useState("")
  const[country,setcountry]=useState("")
  const[state,setstate]=useState("")
  const[city,setcity]=useState("")
  const[zipcode,setzipcode]=useState("")
  const[email,setemail]=useState("")
  const[phone,setphone]=useState("")
  const[load,setlaod]=useState(false)
  const[countries,setcountries]=useState([])
  const[states,setstates]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const datapass=()=>{
      const newdata={
        businessContactId:phone,
        country:country?.Name
      }
      const binfo=Object.assign(data,newdata)
    return binfo
  }
  const navigationfunction=() => { 
      if(add1!==''&& add2!=='' &&city!==''&&country!==''&&state!==''&&zipcode!=='')
      {
        props.navigation.navigate("ShopProductsAddScreen"
  ,{
    buisenesscontact:{
      phone_primary: phone,
      email:email,
      state_code: state?.StateCode,
      country_code: country?.Code,
      city: city,
      zip_code: zipcode,
      addressLine1: add1,
      addressLine2: add2,
    },
    buisenessinfo:datapass()
  }  )
      }
}
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
      'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  const getcats=async()=>{
    setlaod(true)
    postData("https://parseapi.back4app.com/classes/Countries")
    .then((data) => {
      setcountries(data.results); // JSON data parsed by `data.json()` call
      setlaod(false)
    }).catch((e)=>{
      setlaod(false)
      console.log("error")
    }) 
  }
  const getstates=async(cn)=>{
    setlaod(true)
    postData(`https://parseapi.back4app.com/classes/StatesInACountry?where=%7B%20%20%22Country_ObjId%22%3A%20%7B%20%22__type%22%3A%20%22Pointer%22%2C%20%22className%22%3A%20%22Countries%22%2C%20%22objectId%22%3A%20%22${cn?.objectId}%22%20%7D%20%7D`).then((data) => {
      setstates(data.results); // JSON data parsed by `data.json()` call
      setlaod(false)
    }).catch((e)=>{
      setlaod(false)
      console.log(e)
    }) 
  }
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
 
 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
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
          <ScrollView>
         
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
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.primary,fontWeight:'600'}}>Select Country</Text>
            </TouchableOpacity>
          {
            countries?.map((item,i)=>(
              <TouchableOpacity key={i} onPress={()=>{
                setModalVisible(!modalVisible)
               setcountry(item)
               getstates(item)
             }} activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>{item?.Name}</Text>
               </TouchableOpacity>
           
            ))
          }

</ScrollView>
          </View>
        </View>
      </Modal>
  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible2);
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
          <ScrollView>
         
            <Pressable
              style={{width:'100%',alignItems:'flex-end'}}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
                <Image
                     style={{
                         width: RFPercentage(4),
                         height: RFPercentage(4),
                         }}
                         source={require('../../assets/images/cancelicon.png')} /> 
            </Pressable>

            {
            // states?.length>=0&& 
            <>
            <TouchableOpacity activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.primary,fontWeight:'600'}}>Select State</Text>
            </TouchableOpacity>
            {states?.map((item,i)=>(
              <TouchableOpacity key={i} onPress={()=>{
                setModalVisible2(!modalVisible2)
               setstate(item)
             }} activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>{item?.StateName}</Text>
               </TouchableOpacity>
           
            ))
}
            </>
          }

</ScrollView>
          </View>
        </View>
      </Modal>

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
                onChangeText={(e)=>setadd1(e)}
                value={add1}
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
              onChangeText={(e)=>setadd2(e)}
                value={add2} 
              placeholder='Address line 2'
                placeholderTextColor={Colors.placeholder}
              />
         </View>
        </View>

        {/* country */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
        <TouchableOpacity activeOpacity={0.7}  style={{ backgroundColor: Colors.inputcolor,
                           width: RFPercentage(45),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(7),
                             justifyContent:'center' }} onPress={() => setModalVisible(true)} >

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
         </View>

         {/* state */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
            
        <TouchableOpacity activeOpacity={0.7}  style={{ backgroundColor: Colors.inputcolor,
                           width: RFPercentage(45),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(7),
                             justifyContent:'center' }} onPress={() => setModalVisible2(true)} >

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                          {states?.length<=0?"Select state":state?.StateName}
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

          {/* City */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
             <InputField onChangeText={(e)=>setcity(e)} title='City' placeholder='Enter City' />
                      
        </View>

         {/* Zipcode */}
         <View style={{ marginTop: RFPercentage(3) }}>
                    
                 <InputField title='Zipcode'  onChangeText={(e)=>setzipcode(e)} placeholder='Enter Zipcode' />
                      
        </View>

        {/* Phone */}
        <View style={{ marginTop: RFPercentage(3) }}>
                    
                    <InputField title='Phone'  onChangeText={(e)=>setphone(e)} placeholder='Enter phone' />
                         
           </View>

           {/* Zipcode */}
         <View style={{ marginTop: RFPercentage(3) }}>
                    
                    <InputField onChangeText={(e)=>setemail(e)} title='Email' placeholder='Enter email' />
                         
           </View>

                 {/* button */} 
                  <TouchableOpacity activeOpacity={0.7} onPress={navigationfunction} 
                                   style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Next'/>
                  </TouchableOpacity>
        </ScrollView>
      </Screen>
  )
}