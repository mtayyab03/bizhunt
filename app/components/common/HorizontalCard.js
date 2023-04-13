import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'


//config
import Colors from '../../config/Colors'
import { AuthProvider,useAuth,AuthContext } from '../../../contextapi/Auth';
import { useIsFocused } from '@react-navigation/native'
import Parse from 'parse/react-native.js';
import Loading from '../../screens/Loading';
export default function HorizontalCard({load,imageSource,title,description,shopLocation,shopStars,navigation,bid,binfo},props) {
   const{user}=useAuth()
    const [heartfill, setHeartfill] = useState(false);
    const [loading, setLoading] = useState(false);
    const [favid,setfavid]=useState(null)
    const addtofavourite=async(id)=>{
      load(true)
      const myNewObject = new Parse.Object('SaveFavorites');
      const BusinessInfo = Parse.Object.extend('BusinessInfo');
      const businessInfoObject = new BusinessInfo();
      businessInfoObject.id = id;
      const UserInfo = Parse.Object.extend('User');
      const UserInfoObject = new UserInfo();
      UserInfoObject.id=user?.objectId
      myNewObject.set('businessId', businessInfoObject);
      myNewObject.set('userId', UserInfoObject);
      try {
        const result = await myNewObject.save();
        load(false)
      } catch (error) {
         console.log(error)
        laod(false)
      }
    }
      
    const removetofavourite=async(id)=>{
         load(true)
         const query = new Parse.Query('SaveFavorites');
  try {
    // here you put the objectId that you want to delete
    const object = await query.get(id);
    try {
      const response = await object.destroy();
     load(false)
    } catch (error) {
     load(false)
    }
  } catch (error) {
    load(false)
  }
    }

    const getfavitemstatus=async()=>{
      const SaveFavorites = Parse.Object.extend('SaveFavorites');
      const query = new Parse.Query(SaveFavorites);
    query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bid });
      try {
         const temp=[]
        const results = await query.find();
        for (const object of results) {
          const businessId = object.get('businessId')
          const userId = object.get('userId')
            temp.push({businessId:businessId,id:object.id})
         }
         setfavid(temp[0].id)
         for(const i=0;i<temp.length;i++)
         {
            if(temp[i].businessId.id===bid)
            {
               setHeartfill(true)
               break
            }
            
         }
      } catch (error) {
      }
    }
    React.useEffect(()=>{
      getfavitemstatus()
    },[])
    if(loading)
    {
      <Loading/>
    }
    return (
    <View  
           style={{backgroundColor: Colors.white,marginTop:RFPercentage(2),
                           borderRadius: RFPercentage(1.5), height:RFPercentage(21),flexDirection:'row',overflow:'hidden'}}>

                {/* shop Image */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate("InnerShopScreen",{bid:bid,binfo:binfo}) }}>
                  <Image style={{ width: RFPercentage(23), height: RFPercentage(21) }} 
                          source={ imageSource!==undefined?{uri:imageSource?.url()}:require("../../../assets/images/shop1.png")} />
                </TouchableOpacity>

                {/* shop data */}
                <View style={{padding:RFPercentage(2),}}>
                    <View style={{flexDirection:'row'}}>
                     <Text style={{color:Colors.secondary,fontWeight:'700'}}>
                        {title}
                     </Text>

                     {!heartfill?
                          <TouchableOpacity activeOpacity={0.7} onPress={() => {
                           addtofavourite(bid)
                           setHeartfill(true)}}  style={{paddingLeft:RFPercentage(6)}}>
                          <Image
                            style={{
                                width: RFPercentage(2.4),
                                height: RFPercentage(2.2),
                                }}
                                source={require('../../../assets/images/hearticon.png')} /> 
                         </TouchableOpacity>
                         :
                        <TouchableOpacity  activeOpacity={0.7} onPress={() => {
                          removetofavourite(favid)
                           setHeartfill(true)}}  style={{paddingLeft:RFPercentage(6)}}>
                          <Image
                            style={{
                                width: RFPercentage(2.3),
                                height: RFPercentage(2.2),
                                }}
                                source={require('../../../assets/images/orangehearticon.png')} /> 
                         </TouchableOpacity>
                         }

                   </View>

                    <View style={{width:RFPercentage(17)}}>
                       <Text style={{fontSize:RFPercentage(1.6),marginTop:RFPercentage(1),color:Colors.secondary}}>
                         {description} 
                       </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',position:'absolute',bottom:RFPercentage(2),right:RFPercentage(2)}}>

                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          {/* <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }} 
                                source={require('../../../assets/images/locationicon.png')} /> */}
                          <Text style={{color:Colors.secondary,fontWeight:'400',fontSize:RFPercentage(1.3),paddingLeft:RFPercentage(0.5)}}>
                             {shopLocation}
                          </Text>
                      </View>
                      <View style={{paddingLeft:RFPercentage(3),flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }} 
                                source={require('../../../assets/images/staricon.png')} />
                          <Text style={{color:Colors.secondary,fontWeight:'400',fontSize:RFPercentage(1.6),paddingLeft:RFPercentage(0.3)}}>
                              {shopStars}
                           </Text>
                      </View>

                   </View>

                </View>
           </View>
  )
}