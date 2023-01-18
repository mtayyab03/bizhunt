import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import HorizontalCard from '../components/common/HorizontalCard'

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

          
            <HorizontalCard title={item.title} imageSource={item.imageSource} description={item.description} 
                           shopLocation={item.shopLocation} shopStars={item.shopStars}/>
          } />

    </Screen>
  )
}

export default HomeScreen