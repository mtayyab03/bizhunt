import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import ImageInput from './ImageInput'
import { RFPercentage } from 'react-native-responsive-fontsize'

function ImageInputList({getdetails,ls,rmp,iteminfo}) {
  const[price,setprice]=React.useState(0)
  const[title,settitle]=React.useState("title")
  function callback1(state){
    setprice(state)
  }
  function callback2(state){
    settitle(state)
  }
  return (
    <View style={{flexDirection:'row'}}> 
   {iteminfo?.product?.map(item=>
            <View >
            <ImageInput
             imageUri={item?.image}
             key={item?.image}
             ls={ls}
             rmp={rmp}
             iteminfo={iteminfo}
             />
               <Text style={{textAlign:"center",marginVertical:RFPercentage(1),fontSize:RFPercentage(2.5)}}>Price {item?.price}$</Text>
               <Text style={{textAlign:"center",fontSize:RFPercentage(2.5)}}>{item?.desc}</Text>
             </View>
             )}
             <ImageInput price2={callback1} title2={callback2} getdetails={getdetails} ls={ls} rmp={rmp} iteminfo={iteminfo}/>
    </View>
  )
}

export default memo(ImageInputList)