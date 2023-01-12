import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'

//config
import Colors from '../config/Colors'

const HomeScreen = (props) => {

  const [search, onChangeSearch] = useState('');
  const [heartfill, setHeartfill] = useState(false);


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
            <FlatList
                style={{ width:'85%',marginTop: RFPercentage(0.5),flexGrow:0}}
                data={shopList}
                keyExtractor={shopList => shopList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>

          
            <View  
                           style={{backgroundColor: Colors.white,marginTop:RFPercentage(2),
                           borderRadius: RFPercentage(1.5), height:RFPercentage(21),flexDirection:'row',overflow:'hidden'}}>

                {/* shop Image */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("InnerShopScreen") }}>
                  <Image style={{ width: RFPercentage(23), height: RFPercentage(21) }} 
                          source={item.imageSource} />
                </TouchableOpacity>

                {/* shop data */}
                <View style={{padding:RFPercentage(2),}}>
                    <View style={{flexDirection:'row'}}>
                     <Text style={{color:Colors.secondary,fontWeight:'700'}}>
                        {item.title}
                     </Text>

                     {heartfill ?
                          <TouchableOpacity activeOpacity={0.7} onPress={() => {setHeartfill(false)}}  style={{paddingLeft:RFPercentage(6)}}>
                          <Image
                            style={{
                                width: RFPercentage(2.4),
                                height: RFPercentage(2.2),
                                }}
                                source={require('../../assets/images/hearticon.png')} /> 
                         </TouchableOpacity>
                         :
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {setHeartfill(true)}}  style={{paddingLeft:RFPercentage(6)}}>
                          <Image
                            style={{
                                width: RFPercentage(2.3),
                                height: RFPercentage(2.2),
                                }}
                                source={require('../../assets/images/orangehearticon.png')} /> 
                         </TouchableOpacity>
                         }

                   </View>

                    <View style={{width:RFPercentage(17)}}>
                       <Text style={{fontSize:RFPercentage(1.6),marginTop:RFPercentage(1),color:Colors.secondary}}>
                         {item.description} 
                       </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',position:'absolute',bottom:RFPercentage(2),right:RFPercentage(2)}}>

                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }} 
                                source={require('../../assets/images/locationicon.png')} />
                          <Text style={{color:Colors.secondary,fontWeight:'400',fontSize:RFPercentage(1.3),paddingLeft:RFPercentage(0.5)}}>
                             {item.shopLocation}
                          </Text>
                      </View>
                      <View style={{paddingLeft:RFPercentage(3),flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }} 
                                source={require('../../assets/images/staricon.png')} />
                          <Text style={{color:Colors.secondary,fontWeight:'400',fontSize:RFPercentage(1.6),paddingLeft:RFPercentage(0.3)}}>
                              {item.shopStars}
                           </Text>
                      </View>

                   </View>

                </View>
           </View>

          } />

    </Screen>
  )
}

export default HomeScreen