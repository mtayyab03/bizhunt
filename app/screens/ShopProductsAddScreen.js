import React, { useState,useEffect, useReducer, useCallback } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, Modal,Pressable, Alert, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';

//Components
import Screen from '../components/Screen'
import CircleLine from '../components/common/CircleLine'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'
import ImageInputList from '../components/common/ImageInputList';
import Loading from './Loading';
//config
import Colors from '../config/Colors'
import uuid from 'react-native-uuid';
import Parse from 'parse/react-native.js';
const imageid=uuid.v4().slice(0,10);
export default function ShopProductsAddScreen(props) {
    const bic=props.route.params?.buisenessid
    const btags=props.route.params?.tags
    const [modalVisible, setModalVisible] = useState(false);
    const [title,settitle]=useState("")
    const [productimage,setproductimage]=useState("")
    const [productimage64,setproductimage64]=useState("")
    const [price,setprice]=useState("")
    const[cat,setcat]=useState("")
    const[load,setlaod]=useState(false)
    const firstproduct=[]
    const reducerfunc = (state, action) => {
      switch (action.type) {
        case "addgroup":
          return [
            ...state,
            {
              group: action.payload,
              product: []
            }
          ];
        case "addproduct":
            return updateProductForGroup(state,action.payload,{price:price,desc:title,image:productimage,image64:productimage64})
        case "removeproduct":
            return removeProductForGroup(state,action.payload.group,action.payload.url)
        default:
          return state;
      }
    };
    

    const [productsdata,dispatchfunc]=useReducer(reducerfunc,firstproduct)
    function updateProductForGroup(arr, groupName, newProduct) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].group === groupName) {
          arr[i].product.push(newProduct);
          break;
        }
      }
      return arr;
    }
    
      function  removeProductForGroup(state, groupName, url) {
        // Find the group object with the given group name
        const group = state.find(group => group.group === groupName);
      
        if (!group) {
          // If the group is not found, return an empty array
          return [];
        }
      
        // Filter the products in the group by their images that do not match the given URL
        const filteredProducts = group.product.filter(product => product.image !== url);
      
        // Create a new object that has the same group name but the filtered products
        const newGroup = {
          group: group.group,
          product: filteredProducts
        };
      
        // Create a new array that has the same objects as the original state but with the new group
        const newState = state.map(oldGroup => {
          if (oldGroup.group === groupName) {
            return newGroup;
          }
          return oldGroup;
        });
      
        // Return the new state array
        return newState;
      }
      
     
    const getdetails=(b64,img,pr,tt)=>{
      settitle(tt)
      setprice(pr)
      setproductimage(img)
      setproductimage64(b64)
    }
    

    const lsfunc=(state)=>{
      dispatchfunc({type:"addproduct",payload:state})
    }
    const removeproduct=(state)=>{
      dispatchfunc({type:"removeproduct",payload:state})
    }
    const navigationfunction = async () => {
      setlaod(true);
      try {
        if (productsdata?.length >= 1) {
          const BusinessInfo = Parse.Object.extend('BusinessInfo');
          const businessInfoObject = new BusinessInfo();
          businessInfoObject.id = bic;
    
          // Use Promise.all() to wait for all promises to resolve
          await Promise.all(
            productsdata?.map((item, i) => {
              return Promise.all(
                item?.product.map(async (item2) => {
                  const myNewObject = new Parse.Object('Images');
                  myNewObject.set('priceToShow', item2?.price);
                  myNewObject.set('imageDesc', item2?.desc);
                  myNewObject.set(
                    'imageFilePath',
                    new Parse.File(imageid.toString(), { base64: item2?.image64 })
                  );
                  myNewObject.set('businessId', businessInfoObject ? businessInfoObject : null);
                  myNewObject.set('groupName', item?.group);
                  myNewObject.set('Keywords', btags ? btags : null);
                  const result = await myNewObject.save();
                })
              );
            })
          );
          setlaod(false);
          props.navigation.navigate('ShopDays', { buisenessid: bic });
        } else {
          alert('Kindly add product to buiseness');
          setlaod(false);
        }
      } catch (e) {
        setlaod(false);
        alert('Try again later');
      }
    };
    

    if(load)
  {
      return(<Loading/>)
  }
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start',backgroundColor: Colors.lightWhite }}>
      <ScrollView>
        {/* headerMode */}
        <View style={{width:'100%',alignItems:'center'}}>
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
        <CircleLine title='3'/>
        <CircleLine title='4'/>
        <View style={{width:RFPercentage(5),height:RFPercentage(5),borderRadius:RFPercentage(3),
               borderColor:Colors.secondary,borderWidth:RFPercentage(0.3),alignItems:'center',justifyContent:'center'}}>
         <Text style={{color:Colors.secondary}}>
            5
          </Text>
        </View>

      </View>

      {/* button */} 
      <TouchableOpacity activeOpacity={0.7}  onPress={() => setModalVisible(true)} 
                                       style={{marginTop:RFPercentage(6),marginBottom:RFPercentage(4)}}>
                    <AppButton title='Create category'/>
         </TouchableOpacity>
         </View>

{/* category creation Modal */}
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex: 1,
                      justifyContent: 'center',
                      alignItems: "center",
                      marginTop: 29}}>
          <View style={{ width:'90%',height:RFPercentage(37),
                         backgroundColor: "white",
                         borderRadius: 20,
                         padding: 35,
                         alignItems: "center",
                         shadowColor: "#000",
                         shadowOffset: {
                           width: 0,
                           height: 2
                         },
                         shadowOpacity: 0.25,
                         shadowRadius: 4,
                         elevation: 5}}>
            <Pressable
              style={{width:'100%',alignItems:'flex-end'}}
              onPress={() => setModalVisible(!modalVisible)}
            >
                <Image
                     style={{
                         width: RFPercentage(4),
                         height: RFPercentage(4),
                         }}
                         source={require('../../assets/images/cancelicon.png')} /> 
            </Pressable>

            
            <View style={{width:'90%',marginTop:RFPercentage(1)}}>
                     <Text style={{fontSize:RFPercentage(2),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(1.5)}}> 
                           create category
                         </Text>
                     
                         <View style={{
                             width: RFPercentage(35),
                             height: RFPercentage(7),
                             backgroundColor: '#F2F3F7',
                             color: Colors.black,
                             paddingLeft: RFPercentage(3),
                             borderRadius: RFPercentage(1.5),
                             justifyContent: 'center'
                         }}>
                        <TextInput
                           style={{width:RFPercentage(45)}}
                           onChangeText={(e)=>setcat(e)}
                           value={cat}
                           placeholder={'Enter category'}
                           placeholderTextColor={Colors.placeholder}
                       />
                     </View>

                   {/* button */} 
           <TouchableOpacity activeOpacity={0.7} onPress={() => {
            dispatchfunc({type:"addgroup",payload:cat})
            setModalVisible(!modalVisible)
           }} 
                     style={{marginTop:RFPercentage(2),marginBottom:RFPercentage(2)}}>
                    <View style={{
                       width: RFPercentage(35), height: RFPercentage(6)
                     , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(2)
                     ,backgroundColor:'#FF9900' }}>
                     <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                         create
                     </Text>
                 </View>
            </TouchableOpacity>
          
      </View>
          </View>
        </View>
      </Modal>

      {/* image Add container */}
      {
        productsdata?.map((item,i)=>(<>
        <View style={{marginTop:RFPercentage(1),width:'100%',alignItems:'center',justifyContent:'center'}}>
      <View style={{width:'85%',justifyContent:'center'}}>
        <Text style={{color:Colors.secondary,fontWeight:'600',fontSize:RFPercentage(2.5)}}>
            {item?.group}
        </Text>
        </View>     
        </View>

        <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>  
      <View style={{marginTop:RFPercentage(2),borderWidth:0.2,borderColor:Colors.grey,height:RFPercentage(25),width:'100%',
        borderRadius:RFPercentage(1),marginLeft:RFPercentage(5),justifyContent: 'center',paddingRight:RFPercentage(4),}}>             
                <ImageInputList 
                          getdetails={getdetails}
                         ls={lsfunc}
                         rmp={removeproduct}
                         iteminfo={item}
                         />
      </View>
      </ScrollView>
      </View></>))
      }

       {/* button */} 
       <View style={{width:'100%',alignItems:'center'}}>
       <TouchableOpacity activeOpacity={0.7}  onPress={navigationfunction}
                                       style={{marginTop:RFPercentage(6),marginBottom:RFPercentage(4)}}>
                    <AppButton title='Next'/>
         </TouchableOpacity>
         </View>
         </ScrollView>
        </Screen>
  )
}