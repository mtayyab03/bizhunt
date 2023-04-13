import React, { useState,useContext } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ImageBackground, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'


//config
import Colors from '../config/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthProvider,useAuth,AuthContext } from '../../contextapi/Auth';
import Loading from './Loading'
import Parse from 'parse/react-native.js';
import { useIsFocused } from '@react-navigation/native'

export default function ProfileScreen(props) {
  const isfocus=useIsFocused()
  
  const profileList = [
    {
        id: '1',
        imageSource: require('../../assets/images/shopicon.png'),
        title: 'My Shop',
        onpress: () => { props.navigation.navigate('ShopListBusiness') }

    }
    ,
    {
      id: '2',
      imageSource: require('../../assets/images/reelsicon.png'),
      title: 'Post a reel',
      onpress: () => { props.navigation.navigate('PostReelScreen') }

  },
    {
        id: '3',
        imageSource: require('../../assets/images/premiumicon.png'),
        title: 'Upgrde to premium',
        onpress: () => { props.navigation.navigate('UpgradePremium') }
    },
    {
        id: '4',
        imageSource: require('../../assets/images/payplan.png'),
        title: 'Payment Details',
        onpress: () => { props.navigation.navigate('PaymentDetails') }

    },
    {
      id: '5',
      imageSource: require('../../assets/images/feedbackicon.png'),
      title: 'Feedback',
      onpress: () => { props.navigation.navigate('FeedbackScreen') }

  },
    {
        id: '6',
        imageSource: require('../../assets/images/aboutusicon.png'),
        title: 'About Us',
        onpress: () => { props.navigation.navigate('AboutUsScreen') }

    },
    {
        id: '7',
        imageSource: require('../../assets/images/inviteicon.png'),
        title: 'Invite Friend',

    },
]
const [loading,setloading]=React.useState(false)
const [shopexist,setshopexist]=React.useState(false)
const [profileuser,setprofileuser]=React.useState({})
const { user, login, logout, isLoading } = useAuth();
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
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
const getbuisenessinfo=async()=>{
    setloading(true)
    postData("https://parseapi.back4app.com/functions/myShop", { userId:user?.objectId})
  .then((data) => {
    setshopexist(true);
    setloading(false)
  }).catch((e)=>{
    setloading(false)
    console.log("error")
  }) 
}


React.useEffect(()=>{
    getbuisenessinfo()
  },[isfocus])
if(isLoading||loading)
{
    return(<Loading/>)
}
return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.lightWhite }}>

            {/* profile */}
            <View style={{width:'100%',height:'20%',backgroundColor:Colors.primary ,padding:RFPercentage(3)}}>          
                <View style={{ width: '100%', marginTop: RFPercentage(3),flexDirection: 'row', alignItems: 'center'  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',width:'50%' }}>

                    {/* picture */}
                    <View style={{ width: RFPercentage(10), height: RFPercentage(10),alignItems:'center',justifyContent:'center',
                    borderRadius: RFPercentage(5), overflow: 'hidden' }}>
                        <Image style={{ width: RFPercentage(8), height: RFPercentage(8), }} source={user?.avatar?.url?{uri:user?.avatar?.url}: require('../../assets/images/profilepic.png')} />
                    </View>

                    {/* text */}
                    <View style={{ marginLeft: RFPercentage(1) }}>
                        <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), color: Colors.white }}>
                           {user?.username||"Katherine Langford"}
                        </Text>
                        <Text style={{ fontWeight: '300', fontSize: RFPercentage(1.8), color: Colors.white,marginTop:RFPercentage(1) }}>
                            {user?.email||"info@gmail.com"}
                        </Text>
                    </View>

                  </View>

                  {/* //editicon */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('EditProfile') }} style={{alignItems: 'flex-end',width:'50%'}}>
               
                <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }} source={require('../../assets/images/editicon.png')} />

                </TouchableOpacity>
            </View>
            </View>


              {/* flatlist on Profile List */}
               <FlatList
                scrollEnabled={false}
                style={{ width: '90%',marginTop: RFPercentage(1.5)}}
                data={profileList}
                keyExtractor={profileList => profileList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>

                    <TouchableOpacity activeOpacity={0.7} onPress={item.onpress} style={{ marginTop: RFPercentage(1.5),  backgroundColor: Colors.white,
                           paddingHorizontal:RFPercentage(3),display:shopexist&&item.id==='1'?"none":"flex",
                           borderRadius: RFPercentage(1.5), height:RFPercentage(7), justifyContent:'center' }}>

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                           <Image style={{ width: RFPercentage(3.6), height: RFPercentage(3), }} source={item.imageSource} />

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                            {item.title}
                          </Text>
                    
                        </View>

                     </TouchableOpacity>
                } />

             <TouchableOpacity activeOpacity={0.7} onPress={() => { 
               logout()
            }} style={{ marginBottom:RFPercentage(3), 
                           width: '90%', paddingHorizontal:RFPercentage(3),
                           borderRadius: RFPercentage(1.5), justifyContent:'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                    <Image style={{ width: RFPercentage(3.6), height: RFPercentage(3), }} source={require('../../assets/images/logout.png')} />

                    <Text style={{ fontWeight: '700', fontSize: RFPercentage(2), marginLeft: RFPercentage(1.5), color: Colors.secondary }}>
                        Logout
                    </Text>
                    
                </View>

            </TouchableOpacity>
        </Screen>
    )
}