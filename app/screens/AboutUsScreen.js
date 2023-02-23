import React, { useState,useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import apifunction from '../Utils/fetchapi'
import { apifunctionGET } from '../Utils/fetchapi'
//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'

//config
import Colors from '../config/Colors'
import Loading from './Loading'
export default function AboutUsScreen(props) {
  const[about,setabout]=useState()
  const[load,setlaod]=useState(false)
  async function apicallget(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
        'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
     });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const apifunctionGET=async(url)=>{
    setlaod(true)
    apicallget(url)
    .then((data) => {
      setabout(data?.results[0].aboutUs)
      setlaod(false)
    }).catch((e)=>{
      setlaod(false)
      console.log(e.message)
    })
  }
  useEffect(()=>{
    apifunctionGET("https://parseapi.back4app.com/classes/AboutUs")
  },[])
  if(load)
  {
    return <Loading/>
  }
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
        <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
         <HeaderMode title='About Us' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
     </View>

     {/* Information */}
     
     <View style={{alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontWeight:'800',fontSize:RFPercentage(2.5),marginTop:RFPercentage(2),color:Colors.secondary}}>
                 Information
               </Text>
               <View style={{width:'80%',marginTop:RFPercentage(3),alignItems:'center',justifyContent:'center',}}>

                     {/* <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    “ Our motto is to connect all local businesses to the Internet ”
                      </Text>
                      <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.8), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center',marginTop:RFPercentage(3) }}>
                                    Not only you can use this app to search for businesses and services nearby or anywhere, 
                                    you can also Not only can you use this app to search for anywhere, you can also 
                                   </Text>
                                   <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    PROMOTE YOUR BUSINESS OR TALENT AS A SERVICE OVER THE INTERNET
                                  </Text>
                                   <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.8), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center' }}>
                                    without spending a lot of money maintaining and selling your website. Your company is up and
                                     running in minutes and
                                    can be accessed and found by anyone. as a service over the internet without spending a lot of
                                     money maintaining
                                    and selling your website.
                                    Your company is up and running in minutes and can be accessed and found by anyone.
                      </Text> */}
                      <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.8), 
                                  color: Colors.secondary,lineHeight:RFPercentage(3),textAlign:'center',marginTop:RFPercentage(3) }}>
                        {
                         about&&about
                        }
                      </Text>

                </View>
            </View>
    </Screen>
  )
}