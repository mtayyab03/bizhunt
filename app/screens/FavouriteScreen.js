import React, { useState,useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList, onPress } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Components
import Screen from '../components/Screen'
import AppButton from '../components/common/AppButton';

import Loading from './Loading'
import { useIsFocused } from '@react-navigation/native'
import Parse from 'parse/react-native.js';
import { AuthProvider, useAuth, AuthContext } from '../../contextapi/Auth';

//config
import Colors from '../config/Colors'

export default function FavouriteScreen(props) {
  const{user}=useAuth()
  const [shops, setShops] = useState([]);
const [loading, setLoading] = useState(false);
const isfocus = useIsFocused()
  

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
    ]
    const favlist=async()=>{
      setLoading(true)
      const SaveFavorites = Parse.Object.extend('SaveFavorites');
      const query = new Parse.Query(SaveFavorites);
      query.equalTo('userId', { "__type": "Pointer", "className": "_User", "objectId": user?.objectId });
      try {
        const temp=[]
        const results = await query.find();
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          const businessId = object.get('businessId')
          temp.push(businessId.id)
        }
        const tempResults = [];
        for(let i=0;i<temp.length;i++)
        {
          const BusinessInfo = Parse.Object.extend('BusinessInfo');
          const query = new Parse.Query(BusinessInfo);
          query.equalTo('objectId', temp[i]);
          //query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": temp[i] });
          try {
            const results = await query.find();
            for (const object of results) {
              const category = object.get('category');
              const description = object.get('description');
              const inBusinessSince = object.get('inBusinessSince');
              const userId = object.get('userId');
              const objId = object.id;
              const name = object.get('name');
              const active = object.get('active');
              const business_PrimaryImage = object.get('business_PrimaryImage');
              const rating = object.get('rating');
              tempResults.push({
                category,
                description,
                inBusinessSince,
                userId,
                name,
                active,
                business_PrimaryImage,
                rating,
                objId
              });
            }
           } catch (error) {

        setLoading(false)
            }

        }
        setShops(tempResults);
        
        setLoading(false)
      

        
      } catch (error) {
        setLoading(false)
        console.error('Error while fetching SaveFavorites', error);
      }
    }
    useEffect(() => {
      favlist()
    }, [isfocus]);
  
    if (loading) {
      return (<Loading />)
    }
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start',alignItems: 'center', backgroundColor: Colors.lightWhite }}>

    {/* headrer Name */}

   <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>

     <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'HomeScreen' })}} 
         style={{ position:'absolute',left:RFPercentage(2) }}>
        <Image
            style={{
                width: RFPercentage(2.5),
                height: RFPercentage(2.5),
            }}
            source={require('../../assets/images/arowblogo.png')} />
     </TouchableOpacity>

     <Text style={{fontWeight:'600',fontSize:RFPercentage(2.5)}}>
        Favourite
     </Text>
    </View>

      {/* flatlist Shops */}
      <FlatList
                style={{ width:'85%',marginTop: RFPercentage(5)}}
                data={shops}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>

          
           <View style={{backgroundColor: Colors.white,marginTop:RFPercentage(2),
                           borderRadius: RFPercentage(1.5), height:RFPercentage(21),flexDirection:'row',overflow:'hidden'}}>

                {/* shop Image */}
                <View>
                  <Image style={{ width: RFPercentage(23), height: RFPercentage(21) }} 
                          source={item?.business_PrimaryImage!==undefined?{uri:item?.business_PrimaryImage?.url()}:require("../../assets/images/shop2.png")} />
                </View>

                {/* shop data */}
                <View style={{padding:RFPercentage(2),}}>
                    <View style={{flexDirection:'row'}}>
                     <Text style={{color:Colors.secondary,fontWeight:'700'}}>
                        {item?.name?item.name.substring(0,15)+"...":"No Name"}
                     </Text>

                     <View style={{paddingLeft:RFPercentage(6)}}>
                          <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.2) }} 
                                source={require('../../assets/images/orangehearticon.png')} />
                     </View>

                   </View>

                    <View style={{width:RFPercentage(17)}}>
                       <Text style={{fontSize:RFPercentage(1.6),marginTop:RFPercentage(1),color:Colors.secondary}}>
                         {item?.description?item.description.substring(0,50)+"...":"No Desc"} 
                       </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',position:'absolute',bottom:RFPercentage(2),right:RFPercentage(2)}}>

                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Text style={{color:Colors.secondary,fontWeight:'400',fontSize:RFPercentage(1.3),paddingLeft:RFPercentage(0.5)}}>
                             {item?.category?item.category:"No category"}
                          </Text>
                      </View>
                      <View style={{paddingLeft:RFPercentage(3),flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }} 
                                source={require('../../assets/images/staricon.png')} />
                          <Text style={{color:Colors.secondary,fontWeight:'400',fontSize:RFPercentage(1.6),paddingLeft:RFPercentage(0.3)}}>
                              {item?.rating?item.rating:0}
                           </Text>
                      </View>

                   </View>

                </View>
           </View>

          } />

    </Screen>
  )
}