import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ImageBackground, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'


//config
import Colors from '../config/Colors'

export default function ProfileScreen(props) {

  const profileList = [
    {
        id: '1',
        imageSource: require('../../assets/images/shopicon.png'),
        title: 'My Shop',
        onpress: () => { props.navigation.navigate('ShopListBusiness') }

    },
    {
      id: '2',
      imageSource: require('../../assets/images/reelsicon.png'),
      title: 'Post a reel',
      onpress: () => { props.navigation.navigate('PostReelScreen') }

  },
    {
        id: '3',
        imageSource: require('../../assets/images/premiumicon.png'),
        title: 'Upgrde to premium',
        onpress: () => { props.navigation.navigate('UpgradePremium') }
    },
    {
        id: '4',
        imageSource: require('../../assets/images/payplan.png'),
        title: 'Payment Details',
        onpress: () => { props.navigation.navigate('PaymentDetails') }

    },
    {
      id: '5',
      imageSource: require('../../assets/images/feedbackicon.png'),
      title: 'Feedback',
      onpress: () => { props.navigation.navigate('FeedbackScreen') }

  },
    {
        id: '6',
        imageSource: require('../../assets/images/aboutusicon.png'),
        title: 'About Us',
        onpress: () => { props.navigation.navigate('AboutUsScreen') }

    },
    {
        id: '7',
        imageSource: require('../../assets/images/inviteicon.png'),
        title: 'Invite Friend',

    },
]

    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.lightWhite }}>

            {/* profile */}
            <View style={{width:'100%',height:'20%',backgroundColor:Colors.primary ,padding:RFPercentage(3)}}>          
                <View style={{ width: '100%', marginTop: RFPercentage(3),flexDirection: 'row', alignItems: 'center'  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',width:'50%' }}>

                    {/* picture */}
                    <View style={{ width: RFPercentage(10), height: RFPercentage(10),alignItems:'center',justifyContent:'center',
                    borderRadius: RFPercentage(5), overflow: 'hidden' }}>
                        <Image style={{ width: RFPercentage(8), height: RFPercentage(8), }} source={require('../../assets/images/profilepic.png')} />
                    </View>

                    {/* text */}
                    <View style={{ marginLeft: RFPercentage(1) }}>
                        <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), color: Colors.white }}>
                           Katherine Langford
                        </Text>
                        <Text style={{ fontWeight: '300', fontSize: RFPercentage(1.8), color: Colors.white,marginTop:RFPercentage(1) }}>
                            info@gmail.com
                        </Text>
                    </View>

                  </View>

                  {/* //editicon */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('EditProfile') }} style={{alignItems: 'flex-end',width:'50%'}}>
               
                <Image style={{ width: RFPercentage(3), height: RFPercentage(3), }} source={require('../../assets/images/editicon.png')} />

                </TouchableOpacity>
            </View>
            </View>


              {/* flatlist on Profile List */}
               <FlatList
                scrollEnabled={false}
                style={{ width: '90%',marginTop: RFPercentage(1.5)}}
                data={profileList}
                keyExtractor={profileList => profileList.id.toString()}
                showsVerticalScrollIndicator={false}
                vertical
                renderItem={({ item }) =>

                    <TouchableOpacity activeOpacity={0.7} onPress={item.onpress} style={{ marginTop: RFPercentage(1.5),  backgroundColor: Colors.white,
                           paddingHorizontal:RFPercentage(3),
                           borderRadius: RFPercentage(1.5), height:RFPercentage(7), justifyContent:'center' }}>

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                           <Image style={{ width: RFPercentage(3.6), height: RFPercentage(3), }} source={item.imageSource} />

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                            {item.title}
                          </Text>
                    
                        </View>

                     </TouchableOpacity>
                } />

             <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("SignInScreen") }} style={{ marginBottom:RFPercentage(3), 
                           width: '90%', paddingHorizontal:RFPercentage(3),
                           borderRadius: RFPercentage(1.5), justifyContent:'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                    <Image style={{ width: RFPercentage(3.6), height: RFPercentage(3), }} source={require('../../assets/images/logout.png')} />

                    <Text style={{ fontWeight: '700', fontSize: RFPercentage(2), marginLeft: RFPercentage(1.5), color: Colors.secondary }}>
                        Logout
                    </Text>
                    
                </View>

            </TouchableOpacity>
        </Screen>
    )
}