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
import { useIsFocused } from '@react-navigation/native'
import Parse from 'parse/react-native.js';

const HomeScreen = (props) => {
  const isfocus=useIsFocused()
  const [search, onChangeSearch] = useState('');
  const [heartfill, setHeartfill] = useState(false);
  
const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
const callloader=(state)=>{
  setLoading(state)
}
  const getShopsListed = async () => {
    setLoading(true);
    const BusinessInfo = Parse.Object.extend('BusinessInfo');
    const query = new Parse.Query(BusinessInfo);
    try {
      const results = await query.find();
      const tempResults = [];
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
      setShops(tempResults);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getShopsListed();
  }, [isfocus]);

if(loading)
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
  shops[0]?.ERROR?
  <Text>
    You dont have listed buiseness Yet
  </Text>
:
            <FlatList
                style={{ width:'85%',marginTop: RFPercentage(0.5),flexGrow:0}}
                data={shops&&shops?.length>0?shops:[]}
                keyExtractor={slist=> slist?.businessId?.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>

          
            <HorizontalCard
            load={callloader}
            binfo={item}
            navigation={props.navigation} title={item?.name?item.name.substring(0,15)+"...":"No Name"} imageSource={item?.business_PrimaryImage} description={item?.description?item.description.substring(0,50)+"...":"No Desc"} 
                           shopLocation={item?.category?item.category:"No category"} shopStars={item?.rating?item.rating:0} bid={item?.objId}/>
          } />
}
    </Screen>
  )
}

export default HomeScreen