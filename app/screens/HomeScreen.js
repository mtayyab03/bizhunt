import React, { useState,useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import HorizontalCard from '../components/common/HorizontalCard'
import axios from "axios"
//Components
import Screen from '../components/Screen'
import Loading from './Loading'
//config
import Colors from '../config/Colors'
import { AuthProvider,useAuth,AuthContext } from '../../contextapi/Auth';
const HomeScreen = (props) => {

  const [search, onChangeSearch] = useState('');
  const [heartfill, setHeartfill] = useState(false);
  const[load,setlaod]=useState(false)
  const [slist,setslist]=useState([])
  const shopList = [
    {
        id: '1',
        imageSource: require('../../assets/images/shop1.png'),
        title: 'Salon Shop',
        description:'we provide the many services related to your hair like hair cutting, beard and makeup ',
        shopLocation:'Haryana, India',
        shopStars:'5'
    },
    {
        id: '2',
        imageSource: require('../../assets/images/shop2.png'),
        title: 'Barber Shop',
        description:'This shop has the many services related to your skin like the treatment of , beard and makeup ',
        shopLocation:'Mumbai, India',
        shopStars:'4.9'
  },
  {
    id: '3',
    imageSource: require('../../assets/images/shop3.png'),
    title: 'Sweet Shop',
    description:'Our sweet provide the many sweets related to matter the sugar and make your muth taste astonish. ',
    shopLocation:'Haryana, India',
    shopStars:'5'
},
{
    id: '4',
    imageSource: require('../../assets/images/shop1.png'),
    title: 'Barber Shop',
    description:'This shop has the many services related to your skin like the treatment of , beard and makeup ',
    shopLocation:'Mumbai, India',
    shopStars:'4.9'
},
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
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const { user, login, logout, isLoading } = useAuth();
const getshops=async()=>{
  setlaod(true)
  postData("https://parseapi.back4app.com/functions/myShop", { userId:user?.objectId})
  .then((data) => {
    setslist(data.result); // JSON data parsed by `data.json()` call
    setlaod(false)
  }).catch((e)=>{
    setlaod(false)
    console.log("error")
  }) 
}
const abort=new AbortController()
useEffect(()=>{
  getshops()
},[])

if(load)
{
    return(<Loading/>)
}
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>
      <View style={{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:RFPercentage(5)}}>

      <View style={{  width:'83%', backgroundColor: Colors.white,paddingHorizontal:RFPercentage(3),
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
                {/* //favourite */}
                 <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("FavouriteScreen") }}  style={{width:'12%',alignItems:'center',justifyContent:'center',paddingLeft:RFPercentage(1)}}>

                    <Image style={{ width: RFPercentage(3.3), height: RFPercentage(3), }} 
                    source={require('../../assets/images/hearticon.png')} />
                
                </TouchableOpacity>
            </View>

           {/* shop text */}
            <View style={{width:'85%',marginTop:RFPercentage(4)}}>

              <Text style={{fontWeight:'700',color:Colors.secondary,fontSize:RFPercentage(2.5)}}>
                Shops
              </Text>
            
            </View>

          {/* flatlist Shops */}
{
  slist[0]?.ERROR?
  <Text>
    You dont have listed buiseness Yet
  </Text>
:
            <FlatList
                style={{ width:'85%',marginTop: RFPercentage(0.5),flexGrow:0}}
                data={slist&&slist.length>0?slist:[]}
                keyExtractor={slist=> slist?.businessId?.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>

          
            <HorizontalCard title={item?.title} imageSource={item?.business_PrimaryImage?.url} description={item?.description} 
                           shopLocation={item?.shopLocation} shopStars={item?.shopStars}/>
          } />
}
    </Screen>
  )
}

export default HomeScreen