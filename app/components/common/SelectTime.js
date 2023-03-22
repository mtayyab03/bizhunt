import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../../config/Colors'

export default function SelectTime({settime,deltime,day,timef,timel}) {
    const [ticbox, setTicbox] = useState(false);
  return (
    <View style={{  backgroundColor: Colors.white,
        paddingHorizontal:RFPercentage(3),marginTop:RFPercentage(1),
        borderRadius: RFPercentage(1.5), height:RFPercentage(6), justifyContent:'center' }}>

    <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
      <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
      <TouchableOpacity disabled={ticbox} activeOpacity={0.7} onPress={() => { 
        setTicbox(true)
        settime({
            day:day,
            fromTime:timef,
            toTime:timel
        })
    }} 
               style={{ width: RFPercentage(3), height: RFPercentage(3), borderRadius:RFPercentage(1),
                 borderWidth: RFPercentage(0.3), borderColor: Colors.secondary, 
                alignItems: 'center', justifyContent: 'center' }}>

           {ticbox == true ?
               <TouchableOpacity disabled={!ticbox} activeOpacity={0.7} onPress={() => { 
                
                setTicbox(false) 
                deltime(day)
                }}>
                   <Image
                       style={{
                           width: RFPercentage(1.7),
                           height: RFPercentage(1.7),
                       }}
                       source={require('../../../assets/images/ticlogo.png')} />
               </TouchableOpacity>
               : null}
           
     </TouchableOpacity>

       <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(1.5), color: Colors.secondary }}>
           {day}
       </Text>
 </View>
 <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute',right:0 }}>
     <View style={{width:RFPercentage(8),height:RFPercentage(4),
                   borderWidth:RFPercentage(0.3),borderColor:Colors.secondary,borderRadius:RFPercentage(2),
                   alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:RFPercentage(1.5),color:Colors.secondary}}>
             {timef}
         </Text>
     </View>
     <View style={{width:RFPercentage(8),height:RFPercentage(4),marginLeft:RFPercentage(1),
                   borderWidth:RFPercentage(0.3),borderColor:Colors.secondary,borderRadius:RFPercentage(2),
                   alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:RFPercentage(1.5),color:Colors.secondary}}>
             {timel}
         </Text>
     </View>

 </View>
     </View>

</View>
  )
}