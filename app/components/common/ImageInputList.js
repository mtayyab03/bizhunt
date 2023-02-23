import { View, Text } from 'react-native'
import React from 'react'
import ImageInput from './ImageInput'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default function ImageInputList({imageUri=[],onRemoveImage,OnAddImage,getdetails}) {
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
   {imageUri.map(uri=>
            <View >
            <ImageInput
             imageUri={uri}
             key={uri}
             OnChangeImage={()=>onRemoveImage(uri)} />
               <Text style={{textAlign:"center",marginVertical:RFPercentage(1),fontSize:RFPercentage(2.5)}}>Price {price}$</Text>
               <Text style={{textAlign:"center",fontSize:RFPercentage(2.5)}}>{title}</Text>
             </View>
             )}
             <ImageInput OnChangeImage={(uri)=>OnAddImage(uri)} price2={callback1} title2={callback2} getdetails={getdetails}/>
           
    </View>
  )
}