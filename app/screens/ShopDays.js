import React, { useState,useCallback } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'
import SelectTime from '../components/common/SelectTime'
import Parse from 'parse/react-native.js';
import Loading from './Loading'
//config
import Colors from '../config/Colors'

export default function ShopDays(props) {
   const bid=props.route.params.buisenessid
  const [timmings,settimmings]=React.useState([])
  const[load,setlaod]=useState(false)
  const settime = useCallback((newItem) => {
    settimmings((prevItems) => [...prevItems, newItem]);
  }, []);
  const deltime = useCallback((id) => {
    settimmings((prevItems) => prevItems.filter((item) => item.day !== id));
  }, []);
    const daysList = [
        {
            id: '1',
            day:'Monday',
            timef:'10:00am',
            timel:'06:00pm',
        },
        {
            id: '2',
            day:'Tuesday',
            timef:'10:00am',
            timel:'06:00pm',
    
      },
        {
            id: '3',
            day:'Wednsday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
        {
            id: '4',
            day:'Thursday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
        {
          id: '5',
          day:'Friday',
          timef:'10:00am',
          timel:'06:00pm',
    
      },
        {
            id: '6',
            day:'Saturday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
        {
            id: '7',
            day:'Sunday',
            timef:'10:00am',
            timel:'06:00pm',
    
        },
    ]
    const navigationfunction=async()=>{
      
      setlaod(true);
      try {
        if (timmings?.length >= 1) {
          const BusinessInfo = Parse.Object.extend('BusinessInfo');
          const businessInfoObject = new BusinessInfo();
          businessInfoObject.id = bid;
          await Promise.all(
                timmings?.map(async (item) => {
                  const myNewObject = new Parse.Object('BusinessTimings');
                  myNewObject.set('day', item?.day);
                  myNewObject.set('fromTime', item?.fromTime);
                  myNewObject.set('toTime', item?.toTime);
                  myNewObject.set('businessId', businessInfoObject);
                  const result = await myNewObject.save();
                })
           );
          setlaod(false);
          props.navigation.navigate("ShopPagelinksScreen",{ buisenessid: bid })

        } else {
          alert('Kindly add timming to buiseness');
          setlaod(false);
        }
      } catch (e) {
        console.log(e)
        setlaod(false);
        alert('Try again later');
      }
      
    }
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
          
      <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 1
               </Text>
            </View>
          <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>
        
           <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),backgroundColor:Colors.primary,
                    borderColor:Colors.secondary,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:Colors.white}}>
                 2
               </Text>
            </View>
          <View style={{width:RFPercentage(5),height:RFPercentage(0.3),backgroundColor:Colors.secondary}}/>
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

      {/* title */}

      <View style={{marginTop:RFPercentage(7)}}>
        <Text style={{fontWeight:'600',color:Colors.secondary}}>
            Choose your business days and hours
        </Text>
      </View>

      {/* flat listdays time */}
      <FlatList
                style={{ width: '85%', marginTop: RFPercentage(3)}}
                data={daysList}
                keyExtractor={daysList => daysList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>
                <SelectTime settime={settime} deltime={deltime} day={item.day} timef={item.timef} timel={item.timel}/>
             }/>

                 {/* button */} 
                 <TouchableOpacity activeOpacity={0.7} onPress={navigationfunction} 
                                   style={{marginTop:RFPercentage(4),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Next'/>
                    </TouchableOpacity>

      </Screen>

  )
}