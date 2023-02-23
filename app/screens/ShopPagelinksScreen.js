import React, { useState } from 'react'
import { Image, TouchableOpacity,TextInput, StyleSheet, View, Text,FlatList,ScrollView,Modal,Pressable } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import AppButton from '../components/common/AppButton'
import Inputicon from '../components/common/Inputicon'
import Loading from './Loading';
//config
import Colors from '../config/Colors'
import uuid from 'react-native-uuid';
export default function ShopPagelinksScreen(props) {
  const bimages=props.route.params.buisenessimages
  const binfo=props.route.params.buisenessinfo
  const bcontacts=props.route.params.buisenesscontact
  const btimmings=props.route.params.buisenesstimmings
  const[load,setload]=useState(false)  
  const [ticbox, setTicbox] = useState(false);
    const [tickbox, setTickbox] = useState(false);
    const [showtimeline, setShowtimeline] = useState(false);
    const [showtime, setShowtime] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [freedelivery,setfreedelivery]=useState(false)
    const [homedelivery,sethomedelivery]=useState(false)
    const [timeofdelivery,settimeofdelivery]=useState("")
    const [web,setweb]=useState("")
    const [youtube,setyoutube]=useState("")
    const [fb,setfb]=useState("")
    const [insta,setinsta]=useState("")
    const linkList = [
        {
            id: '1',
            imageSource: require('../../assets/images/globeicon.png'),
            title: 'Enter website link',
    
        },
        {
          id: '2',
          imageSource: require('../../assets/images/youtubeicon.png'),
          title: 'Enter youtube link',
    
      },
        {
            id: '3',
            imageSource: require('../../assets/images/facebookicon.png'),
            title: 'Enter facebook page',
            onpress:''
    
        },
        {
            id: '4',
            imageSource: require('../../assets/images/instagramicon.png'),
            title: 'Enter instagram page',
    
        }
    ]
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
          'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body:JSON.stringify(data)
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
const createshop=async()=>{
  setload(true)
  const buisenessid=uuid.v4().slice(0,10);
  const buisemesssocialapidata={
    website_page_link: web,
    facebook_page_link: fb,
    youtube_page_link: youtube,
    insta_page_link: insta,
    businessId: buisenessid,
    homeDelivery: homedelivery,
    freeDeliveryRange: freedelivery,
    timeOfDelivery: timeofdelivery
  }
  const buisemesstimmingsapidata=Object.assign(btimmings,{businessId: buisenessid})
  const buisemessimagesapidata=Object.assign(bimages,{businessId: buisenessid})
  const buisemesscontactsapidata=Object.assign(bcontacts,{businessId: buisenessid})
  const data21 =await postData('https://parseapi.back4app.com/classes/BusinessInfo',binfo)
  const data22 =await postData('https://parseapi.back4app.com/functions/AddBusinessContactDetails',buisemesscontactsapidata)
  const data23 =await postData('https://parseapi.back4app.com/functions/AddImages',buisemessimagesapidata)
  const data24 =await postData('https://parseapi.back4app.com/functions/AddBusinessTimings',buisemesstimmingsapidata)
  const data25 =await postData('https://parseapi.back4app.com/functions/AddExternalLinks',buisemesssocialapidata)
  console.log(data21)
  console.log(data22)
  console.log(data23)
  console.log(data24)
  console.log(data25)
  setload(false)
  //props.navigation.navigate("ShopDataSuccess")
}
if(load)
{
return(<Loading/>)
}

  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
       <ScrollView contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false} style={{width:'100%'}}>

     <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
         <HeaderMode title='List your business' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
     </View>

     {/* CircleLine */}

      <View style={{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:RFPercentage(5)}}>
          
          <CircleLine title='1'/>
          <CircleLine title='2'/>
        
           <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 3
               </Text>
            </View>
          <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>
        <CircleLine title='4'/>
        <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),
               borderColor:Colors.secondary,borderWidth:RFPercentage(0.3),alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:Colors.secondary}}>
               5
             </Text>
        </View>

      </View>
     
     {/* Home delivery title checkbox */}
     <View style={{width:'85%',height:RFPercentage(8),flexDirection:'row',alignItems:'center',
                  justifyContent:'center',marginTop: RFPercentage(5)}}>
        
                    <View style={{width:'10%',alignItems:'center',justifyContent:'center'  }}>
                         <TouchableOpacity disabled={ticbox} activeOpacity={0.7} onPress={() => {
                          sethomedelivery(!homedelivery)
                          setTicbox(true)
                          setShowtimeline(true)
                          setShowtime(false)}} 
                                  style={{ width: RFPercentage(3), height: RFPercentage(3), borderRadius:RFPercentage(1),
                                    borderWidth: RFPercentage(0.3), borderColor: Colors.secondary, 
                                   alignItems: 'center', justifyContent: 'center' }}>

                              {ticbox == true ?
                                  <TouchableOpacity disabled={!ticbox} activeOpacity={0.7} onPress={() => { 
                                    sethomedelivery(!homedelivery)
                                     setTicbox(false)
                                     setShowtimeline(false)
                                     setShowtime(false)
                                      }}>
                                      <Image
                                          style={{
                                              width: RFPercentage(1.7),
                                              height: RFPercentage(1.7),
                                          }}
                                          source={require('../../assets/images/ticlogo.png')} />
                                  </TouchableOpacity>
                                  : null}
                              
                        </TouchableOpacity>

                    </View>
                          <View style={{width:'90%',paddingTop:RFPercentage(2),paddingLeft:RFPercentage(2)}}>
                             <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), color: Colors.secondary,lineHeight:RFPercentage(3) }}>
                                  Do you provide home delivery of your 
                                   products?
                             </Text>
                          </View>
     </View>
     
       {/* delivery time checkbox */}
      { showtimeline== true ?
        <View style={{width:'85%',height:RFPercentage(8),flexDirection:'row',alignItems:'center',
                  justifyContent:'center',marginTop: RFPercentage(1)}}>
        
                    <View style={{width:'10%',alignItems:'center',justifyContent:'center'  }}>
                         <TouchableOpacity activeOpacity={0.7} onPress={() => {
                          setfreedelivery(!freedelivery)
                          setTickbox(true)
                          setShowtime(true) }} 
                                  style={{ width: RFPercentage(3), height: RFPercentage(3), borderRadius:RFPercentage(1),
                                    borderWidth: RFPercentage(0.3), borderColor: Colors.secondary, 
                                   alignItems: 'center', justifyContent: 'center' }}>

                              {tickbox == true ?
                                  <TouchableOpacity activeOpacity={0.7} onPress={() => { 
                                    setfreedelivery(!freedelivery)
                                    setTickbox(false)
                                    setShowtime(false) }}>
                                      <Image
                                          style={{
                                              width: RFPercentage(1.7),
                                              height: RFPercentage(1.7),
                                          }}
                                          source={require('../../assets/images/ticlogo.png')} />
                                  </TouchableOpacity>
                                  : null}
                              
                        </TouchableOpacity>

                    </View>
                          <View style={{width:'90%',paddingTop:RFPercentage(2),paddingLeft:RFPercentage(2)}}>
                             <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), color: Colors.secondary,lineHeight:RFPercentage(3) }}>
                                   Agree with delivery charges of Rs0 within 2 Km?
                             </Text>
                     </View>
          </View>
          :null }

          {/* time line dropdown open modal  */}
          { showtime== true ?
                 <View style={{width:'82%',paddingLeft:RFPercentage(2),
                        justifyContent:'center',marginTop: RFPercentage(4)}}>
                            <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), color: Colors.secondary,lineHeight:RFPercentage(3) }}>
                                How long does it takes to deliver your products ?
                             </Text>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)} style={{width:RFPercentage(15),height:RFPercentage(5),marginTop:RFPercentage(1),
                                      borderWidth:RFPercentage(0.3),borderColor:Colors.secondary,borderRadius:RFPercentage(2),
                                      alignItems:'center',justifyContent:'center'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                              <Text style={{fontSize:RFPercentage(1.2),color:Colors.secondary}}>
                                Less than a day
                            </Text>
                           <Image
                               style={{
                                   width: RFPercentage(3),
                                   height: RFPercentage(3),
                               }}
                            source={require('../../assets/images/dropdownicon.png')} /> 
                        </View>

                    </TouchableOpacity>
                  </View>
           :null }

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
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.primary,fontWeight:'600'}}>Select delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity onpress={()=>{settimeofdelivery("Less than a day")
            setModalVisible(false)}} activeOpacity={0.7}>
               <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>Less than a day</Text>
              </TouchableOpacity>
              <TouchableOpacity onpress={()=>{settimeofdelivery("1 day")
               setModalVisible(false)}} activeOpacity={0.7}>
            <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>1 Day</Text>
            </TouchableOpacity>
            <TouchableOpacity onpress={()=>{settimeofdelivery("2 day")
             setModalVisible(false)}} activeOpacity={0.7}>
            <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>Two Days</Text>
            </TouchableOpacity>
            <TouchableOpacity onpress={()=>{settimeofdelivery("Less Than 5 day")
             setModalVisible(false)}} activeOpacity={0.7}>
            <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>Less than 5 days</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

           {/* links */}
           <View style={{width:'85%',marginTop:RFPercentage(7)}}>

              <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), color: Colors.secondary }}>
                       Enter your business page links if any
                </Text>
           </View>

            <View style={{ width:'85%',marginTop: RFPercentage(1.5),flexGrow:0}}>
            <View style={{   backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),
        borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center',marginTop:RFPercentage(2) }}>

<View style={{ flexDirection: 'row', alignItems: 'center',  }}>

 <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }}
  source={linkList[0].imageSource} />

 <TextInput
        style={{width:'100%',paddingLeft:RFPercentage(1.5),
                fontSize:RFPercentage(2),color:Colors.secondary}}
         onChangeText={(e)=>setweb(e)}
         value={web}
         placeholder={linkList[0].title}
         placeholderTextColor={'#DEDCDC'}
     /> 
 
</View>

</View>
<View style={{   backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),
        borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center',marginTop:RFPercentage(2) }}>

<View style={{ flexDirection: 'row', alignItems: 'center',  }}>

 <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }}
  source={linkList[1].imageSource} />

 <TextInput
        style={{width:'100%',paddingLeft:RFPercentage(1.5),
                fontSize:RFPercentage(2),color:Colors.secondary}}
         onChangeText={(e)=>setyoutube(e)}
         value={youtube}
         placeholder={linkList[1].title}
         placeholderTextColor={'#DEDCDC'}
     /> 
 
</View>

</View>

<View style={{   backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),
        borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center',marginTop:RFPercentage(2) }}>

<View style={{ flexDirection: 'row', alignItems: 'center',  }}>

 <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }}
  source={linkList[2].imageSource} />

 <TextInput
        style={{width:'100%',paddingLeft:RFPercentage(1.5),
                fontSize:RFPercentage(2),color:Colors.secondary}}
         onChangeText={(e)=>setfb(e)}
         value={fb}
         placeholder={linkList[2].title}
         placeholderTextColor={'#DEDCDC'}
     /> 
 
</View>

</View>
<View style={{   backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),
        borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center',marginTop:RFPercentage(2) }}>

<View style={{ flexDirection: 'row', alignItems: 'center',  }}>

 <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }}
  source={linkList[3].imageSource} />

 <TextInput
        style={{width:'100%',paddingLeft:RFPercentage(1.5),
                fontSize:RFPercentage(2),color:Colors.secondary}}
         onChangeText={(e)=>setinsta(e)}
         value={insta}
         placeholder={linkList[3].title}
         placeholderTextColor={'#DEDCDC'}
     /> 
 
</View>

</View>

            </View>
                {/* note */}
                <View style={{width:'85%',marginTop:RFPercentage(3)}}>

                   <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.6), color: Colors.secondary,lineHeight:RFPercentage(3) }}>
                         Note: Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                         when an unknown printer took a galley of type and
                         scrambled it to make a type specimen
                          book.
                    </Text>
                </View>

                 {/* button */} 
                 <TouchableOpacity activeOpacity={0.7} onPress={
               createshop
               // () => { props.navigation.navigate("ShopDataSuccess") }
                } 
                                   style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Next'/>
                    </TouchableOpacity>

                </ScrollView>
      </Screen>
  )
}