import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList, onPress, ScrollView, ImageBackground, Modal, Pressable, TextInput, KeyboardAvoidingView, Linking } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swiper from 'react-native-swiper'

//Components
import Screen from '../components/Screen'
import AppButton from '../components/common/AppButton';
import InputField from '../components/common/InputField';


//config
import Colors from '../config/Colors'
import Loading from './Loading'
import { useIsFocused } from '@react-navigation/native'
import Parse from 'parse/react-native.js';
import { AuthProvider, useAuth, AuthContext } from '../../contextapi/Auth';

export default function InnerShopScreen(props) {
  const bsid = props.route.params.bid
  const binfo = props.route.params.binfo
  const isfocus = useIsFocused()
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()
  const [fillstar, setFillstar] = useState(false);
  const [description, onChangeDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [radioButton, setRadioButton] = useState(false);
  const [bimages, setbimages] = useState([])
  const [timmings, settimmings] = useState([])
  const [bdetails, setbdetails] = useState([])
  const [links, setlinks] = useState([])
  const [bsrev,setbsrev]=useState([])
  const [bryes,setbryes]=useState(0)
  const [brno,setbrno]=useState(0)
  const [rid,setrid]=useState(null)
  const getbuisenessimages = async () => {
    const Images = Parse.Object.extend('Images');
    const query = new Parse.Query(Images);
    // You can also query by using a parameter of an object
    query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bsid });
    try {
      const results = await query.find();
      const tempResults = [];
      for (const object of results) {
        // Access the Parse Object attributes using the .GET method
        const priceToShow = object.get('priceToShow')
        const imageDesc = object.get('imageDesc')
        const imageFilePath = object.get('imageFilePath')
        const businessId = object.get('businessId')
        const groupName = object.get('groupName')
        const Keywords = object.get('Keywords')
        tempResults.push({
          imageFilePath
        });

      }
      setbimages(tempResults)
    } catch (error) {
      console.error('Error while fetching Images', error);
    }
  };
  const getbuisenesstimmings = async () => {
    const BusinessTimings = Parse.Object.extend('BusinessTimings');
    const query = new Parse.Query(BusinessTimings);
    // You can also query by using a parameter of an object
    query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bsid });
    try {
      const results = await query.find();
      const tempResults = [];
      for (const object of results) {
        // Access the Parse Object attributes using the .GET method
        const day = object.get('day')
        const businessId = object.get('businessId')
        const fromTime = object.get('fromTime')
        const toTime = object.get('toTime')
        const Keywords = object.get('Keywords')
        tempResults.push({
          fromTime,
          toTime,
          day
        });
      }
      settimmings(tempResults)
    } catch (error) {
      console.error('Error while fetching Images', error);
    }
  };
  const getbuisenessdetails = async () => {
    const BusinessContactDetails = Parse.Object.extend('BusinessContactDetails');
    const query = new Parse.Query(BusinessContactDetails);
    // You can also query by using a parameter of an object
    query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bsid });
    try {
      const results = await query.find();
      const tempResults = [];
      for (const object of results) {
        const phone_primary = object.get('phone_primary')
        const email = object.get('email')
        const address = object.get('address')
        tempResults.push({
          phone_primary,
          email,
          address
        });

      }
      setbdetails(tempResults)
    } catch (error) {
      console.error('Error while fetching Images', error);
    }
  };
  const getbuisenesslinks = async () => {
    const ExternalLinks = Parse.Object.extend('ExternalLinks');
    const query = new Parse.Query(ExternalLinks);
    // You can also query by using a parameter of an object
    query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bsid });
    try {
      const results = await query.find();
      const tempResults = [];
      for (const object of results) {
        const website_page_link = object.get('website_page_link')
        const facebook_page_link = object.get('facebook_page_link')
        const youtube_page_link = object.get('youtube_page_link')
        const insta_page_link = object.get('insta_page_link')
        const businessId = object.get('businessId')
        const homeDelivery = object.get('homeDelivery')
        const freeDeliveryRange = object.get('freeDeliveryRange')
        const timeOfDelivery = object.get('timeOfDelivery')
        tempResults.push({
          website_page_link,
          facebook_page_link,
          youtube_page_link,
          insta_page_link
        });
      }
      setlinks(tempResults)
    } catch (error) {
      console.error('Error while fetching Images', error);
    }
  };
  const getbuisenessrecommendations = async () => {
    const BusinessRecommendation = Parse.Object.extend('BusinessRecommendation');
  const query = new Parse.Query(BusinessRecommendation);
    // You can also query by using a parameter of an object
    query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bsid });
    try {
      const results = await query.find();
      const tempResults = [];
      for (const object of results) {
        const no = object.get('no')
        const yes = object.get('yes')
        const id = object.id
        tempResults.push({
          yes,
          no,
          id
        });
      }
      if(tempResults.length!==0)
      {
      setbrno(tempResults[0]?.no)
      setbryes(tempResults[0]?.yes)
      setrid(tempResults[0]?.id)
      }
    } catch (error) {
      console.error('Error while fetching Images', error);
    }
  };
  const recommend=async()=>{
    if(rid!==null)
    {
      const BusinessRecommendation = Parse.Object.extend('BusinessRecommendation');
      const query = new Parse.Query(BusinessRecommendation);
      try {
        // here you put the objectId that you want to update
        const object = await query.get(rid);
        object.set('no', object.get('no'));
        object.set('yes', object.get('yes')+1);
        await object.save()
        } catch (error) {
          console.error('Error while retrieving object BusinessRecommendation', error);
        }
    }
    else
    {
      const BusinessInfo = Parse.Object.extend('BusinessInfo');
      const businessInfoObject = new BusinessInfo();
      businessInfoObject.id = bsid;
      const myNewObject = new Parse.Object('BusinessRecommendation');
      myNewObject.set('businessId', businessInfoObject);
      myNewObject.set('no', 0);
      myNewObject.set('yes', 1);
  try {
    const result = await myNewObject.save();
    // Access the Parse Object attributes using the .GET method
    console.log('BusinessRecommendation created', result);
  } catch (error) {
    console.error('Error while creating BusinessRecommendation: ', error);
  }
    }
  }
  const notrecommend=async()=>{
    if(rid!==null)
    {
      const BusinessRecommendation = Parse.Object.extend('BusinessRecommendation');
      const query = new Parse.Query(BusinessRecommendation);
      try {
        // here you put the objectId that you want to update
        const object = await query.get(rid);
        object.set('no', object.get('no')+1);
        object.set('yes', object.get('yes'));
        await object.save()
        } catch (error) {
          console.error('Error while retrieving object BusinessRecommendation', error);
        }
    }
    else
    {
      const BusinessInfo = Parse.Object.extend('BusinessInfo');
      const businessInfoObject = new BusinessInfo();
      businessInfoObject.id = bsid;
      const myNewObject = new Parse.Object('BusinessRecommendation');
      myNewObject.set('businessId', businessInfoObject);
      myNewObject.set('no', 1);
      myNewObject.set('yes', 0);
  try {
    const result = await myNewObject.save();
    // Access the Parse Object attributes using the .GET method
    console.log('BusinessRecommendation created', result);
  } catch (error) {
    console.error('Error while creating BusinessRecommendation: ', error);
  }
    }
  }
  // const getbuisenessreviews = async () => {
  //   const ExternalLinks = Parse.Object.extend('ExternalLinks');
  //   const query = new Parse.Query(ExternalLinks);
  //   // You can also query by using a parameter of an object
  //   query.equalTo('businessId', { "__type": "Pointer", "className": "BusinessInfo", "objectId": bsid });
  //   try {
  //     const results = await query.find();
  //     const tempResults = [];
  //     for (const object of results) {
  //       const website_page_link = object.get('website_page_link')
  //       const facebook_page_link = object.get('facebook_page_link')
  //       const youtube_page_link = object.get('youtube_page_link')
  //       const insta_page_link = object.get('insta_page_link')
  //       const businessId = object.get('businessId')
  //       const homeDelivery = object.get('homeDelivery')
  //       const freeDeliveryRange = object.get('freeDeliveryRange')
  //       const timeOfDelivery = object.get('timeOfDelivery')
  //       tempResults.push({
  //         website_page_link,
  //         facebook_page_link,
  //         youtube_page_link,
  //         insta_page_link
  //       });
  //     }
  //     setlinks(tempResults)
  //   } catch (error) {
  //     console.error('Error while fetching Images', error);
  //   }
  // };
  const getalldata=async()=>{
    setLoading(true)
    Promise.all([getbuisenesstimmings(),getbuisenessimages(),
      getbuisenessdetails(),
      getbuisenesslinks(),
    getbuisenessrecommendations()
    ]
      ).then(()=>{

        setLoading(false)

      }).catch(()=>{

        setLoading(false)

      })

  }
  useEffect(() => {
    getalldata()
  }, [isfocus]);

  if (loading) {
    return (<Loading />)
  }
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.lightWhite }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

        {/* Swiper */}
        <View style={{ width: '100%', height: RFPercentage(35), backgroundColor: Colors.grey }}>
          <Swiper activeDotColor={Colors.primary} style={{}} >
            {
              bimages?.map((item, i) => (

                <View key={i} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{
                      width: '100%',
                      height: RFPercentage(35),
                    }}
                    source={item?.imageFilePath !== undefined ? { uri: item?.imageFilePath.url() } : require('../../assets/images/shop1.png')} />
                </View>
              ))
            }
          </Swiper>

        </View>

        {/* shop data */}
        <View style={{ width: '90%', alignItems: 'center', marginTop: RFPercentage(4) }}>

          <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'HomeScreen' }) }}
            style={{ position: 'absolute', left: RFPercentage(2) }}>
            <Image
              style={{
                width: RFPercentage(2.5),
                height: RFPercentage(2.5),
              }}
              source={require('../../assets/images/arowblogo.png')} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '700', fontSize: RFPercentage(2.7), color: Colors.secondary }}>
            {binfo?.name}
          </Text>

          <TouchableOpacity activeOpacity={0.7}
            style={{ position: 'absolute', right: RFPercentage(2) }}>
            <Image
              style={{
                width: RFPercentage(3.5),
                height: RFPercentage(3.2),
              }}
              source={require('../../assets/images/orangehearticon.png')} />
          </TouchableOpacity>

        </View>

        <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.7), color: Colors.secondary, marginTop: RFPercentage(3) }}>
          Servicing Since {binfo?.inBusinessSince}
        </Text>

        {/* shop contacts */}
        <View style={{ width: '90%', marginTop: RFPercentage(7), flexDirection: 'row', justifyContent: 'space-around', }}>

          {/* phoneicon */}
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${bdetails[0]?.phone_primary}`)} activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Image
              style={{
                width: RFPercentage(4),
                height: RFPercentage(4),
              }}
              source={require('../../assets/images/phoneicon.png')} />
            <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.2), color: Colors.secondary, marginTop: RFPercentage(2) }}>
              Call the store
            </Text>
          </TouchableOpacity>

          {/* chaticon */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'ChatScreen' }) }}
            style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Image
              style={{
                width: RFPercentage(4),
                height: RFPercentage(4),
              }}
              source={require('../../assets/images/chaticon.png')} />
            <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.2), color: Colors.secondary, marginTop: RFPercentage(2) }}>
              Chat with Provider
            </Text>
          </TouchableOpacity>

          {/* mailicon */}
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${bdetails[0]?.email}`)} activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center' }}  >
            <Image
              style={{
                width: RFPercentage(4),
                height: RFPercentage(4),
              }}
              source={require('../../assets/images/mailicon.png')} />
            <Text style={{ fontWeight: '500', fontSize: RFPercentage(1.2), color: Colors.secondary, marginTop: RFPercentage(2) }}>
              Contact via email
            </Text>
          </TouchableOpacity>
        </View>

        {/* shop open time */}
        <View style={{ width: '95%', marginTop: RFPercentage(6) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(3) }}>
            <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
              Opening Day
            </Text>
            <View style={{ position: 'absolute', right: RFPercentage(3) }}>
              <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                Timming
              </Text>
            </View>
          </View>

          {
            timmings?.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(3) }}>
                <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                  {item?.day}
                </Text>
                <View style={{ position: 'absolute', right: RFPercentage(3) }}>
                  <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#959595' }}>
                    {item?.fromTime} to {item?.toTime}
                  </Text>
                </View>
              </View>
            ))
          }
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(4) }}>
            <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
              People Recommended
            </Text>
            <View style={{ position: 'absolute', right: RFPercentage(3) }}>
              <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: '#4CAF50' }}>
                {bryes===0&&brno===0||bryes===NaN||brno===NaN?0:Math.round((bryes*100)/(brno+bryes))}%
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(4) }}>
            <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
              Address
            </Text>
            <View style={{ position: 'absolute', right: RFPercentage(3) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }}
                  source={require('../../assets/images/locationicon.png')} />
                <Text style={{ color: Colors.secondary, fontWeight: '400', fontSize: RFPercentage(1.3), paddingLeft: RFPercentage(0.5) }}>
                  {bdetails[0]?.address}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* links */}
        <View style={{ width: '95%', marginTop: RFPercentage(5) }}>
          <Text style={{ fontWeight: '700', fontSize: RFPercentage(2.5), marginLeft: RFPercentage(3), color: Colors.secondary }}>
            Find me on:
          </Text>
        </View>
        <View style={{ width: '90%', marginTop: RFPercentage(3), flexDirection: 'row', justifyContent: 'space-around', }}>

          {/* globeicon */}
          <TouchableOpacity onPress={() => {

            if (links[0].website_page_link?.length!==0&&links[0].website_page_link!==undefined) {
              Linking.openURL(links[0].website_page_link)
            }
          }
          } activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Image
              style={{
                width: RFPercentage(3),
                height: RFPercentage(3),
              }}
              source={require('../../assets/images/globeicon.png')} />
          </TouchableOpacity>

          {/* youtubeicon */}
          <TouchableOpacity
            onPress={() => {
              if (links[0].youtube_page_link?.length!==0&&links[0].youtube_page_link!==undefined) {
                Linking.openURL(links[0].youtube_page_link)
              }
            }}
            activeOpacity={0.7} onPress={() => { props.navigation.navigate('BottomTab', { screen: 'ChatScreen' }) }}
            style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Image
              style={{
                width: RFPercentage(3),
                height: RFPercentage(3),
              }}
              source={require('../../assets/images/youtubeicon.png')} />
          </TouchableOpacity>

          {/* facebookicon */}
          <TouchableOpacity
            onPress={() => {
              if (links[0].facebook_page_link?.length!==0&&links[0].facebook_page_link!==undefined) {
                Linking.openURL(links[0].facebook_page_link)
              }
            }}
            activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center' }}  >
            <Image
              style={{
                width: RFPercentage(3),
                height: RFPercentage(3),
              }}
              source={require('../../assets/images/facebookicon.png')} />
          </TouchableOpacity>

          {/* instagram icon */}
          <TouchableOpacity
            onPress={() => {
              if (links[0].insta_page_linkk?.length!==0&&links[0].insta_page_linkk!==undefined) {
                Linking.openURL(links[0].insta_page_link)
              }
            }
            }
            activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center' }}  >
            <Image
              style={{
                width: RFPercentage(3),
                height: RFPercentage(3),
              }}
              source={require('../../assets/images/instagramicon.png')} />
          </TouchableOpacity>
        </View>
          {
            binfo?.userId!==user?.objectId
            ?
            <>
                    <View style={{ width: '85%', marginTop: RFPercentage(5) }}>
          <Text style={{ fontWeight: '700', fontSize: RFPercentage(2.5), color: Colors.secondary }}>
            Would you recommend
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(3) }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {radioButton ?
              <View style={{
                width: RFPercentage(2), height: RFPercentage(2), borderRadius: RFPercentage(2),
                borderColor: Colors.grey, borderWidth: RFPercentage(0.5)
              }}>
              </View> :
              <View style={{
                width: RFPercentage(2), height: RFPercentage(2), borderRadius: RFPercentage(2),
                backgroundColor: Colors.primary
              }}>
              </View>}

            <TouchableOpacity activeOpacity={0.7} onPress={() => { 
              recommend()
              [setRadioButton(false)] }}>
              <Image style={{ width: RFPercentage(5), height: RFPercentage(5), marginLeft: RFPercentage(1) }}
                source={require('../../assets/images/thumblikeicon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: RFPercentage(8), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {radioButton ?

              <View style={{
                width: RFPercentage(2), height: RFPercentage(2), borderRadius: RFPercentage(2),
                backgroundColor: Colors.primary
              }}>
              </View> :
              <View style={{
                width: RFPercentage(2), height: RFPercentage(2), borderRadius: RFPercentage(2),
                borderColor: Colors.grey, borderWidth: RFPercentage(0.5)
              }}>
              </View>}
            <TouchableOpacity activeOpacity={0.7} onPress={() => { 
              notrecommend()
              [setRadioButton(true)] 
              }} >
              <Image style={{ width: RFPercentage(5), height: RFPercentage(5), marginLeft: RFPercentage(1) }}
                source={require('../../assets/images/thumbunlikeicon.png')} />
            </TouchableOpacity>
          </View>

        </View>

        {/* add review */}
        <View style={{ width: '85%', marginTop: RFPercentage(5), flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: RFPercentage(2.5), color: Colors.secondary }}>
            Add a Review
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)}
            style={{
              width: RFPercentage(5), height: RFPercentage(5), borderRadius: RFPercentage(1),
              backgroundColor: Colors.grey, alignItems: 'center', justifyContent: 'center', marginLeft: RFPercentage(3)
            }}>

            <Text style={{ fontWeight: '700', fontSize: RFPercentage(3), color: Colors.white }}>
              +
            </Text>
          </TouchableOpacity>
        </View>

            </>
            :<></>
          }

        {/* Review Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: "center",
            marginTop: 29
          }}>
            <View style={{
              width: '100%', height: RFPercentage(67),
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
              elevation: 5
            }}>
              <Pressable
                style={{ width: '100%', alignItems: 'flex-end' }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image
                  style={{
                    width: RFPercentage(4),
                    height: RFPercentage(4),
                  }}
                  source={require('../../assets/images/cancelicon.png')} />
              </Pressable>

              {/* title */}
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={{ fontSize: RFPercentage(3), color: Colors.primary, fontWeight: '600' }}>Add a Review</Text>
              </TouchableOpacity>
              <View style={{ width: '95%', marginTop: RFPercentage(3) }}>
                <InputField title='Name' placeholder='Enter Name' />
                <View style={{ marginTop: RFPercentage(3) }}>
                  <Text style={{ fontSize: RFPercentage(2), fontWeight: '700', color: Colors.secondary, marginBottom: RFPercentage(1.5) }}>
                    Comment
                  </Text>

                  <View style={{
                    width: RFPercentage(45),
                    height: RFPercentage(12),
                    backgroundColor: '#F2F3F7',
                    color: Colors.black,
                    paddingLeft: RFPercentage(2),
                    paddingTop: RFPercentage(1.5),
                    borderRadius: RFPercentage(1.5),
                  }}>
                    <TextInput
                      style={{ fontSize: RFPercentage(2), width: RFPercentage(45) }}
                      onChangeText={onChangeDescription}
                      value={description}
                      placeholder='Enter comment'
                      placeholderTextColor={Colors.placeholder}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: RFPercentage(3), alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: '600', fontSize: RFPercentage(2.5), color: Colors.secondary }}>
                    Rate it
                  </Text>
                  <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* 1 star */}
                    {fillstar == true ?
                      <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/staricon.png')} />
                      </TouchableOpacity>
                      : <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(true) }} >
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/holostaricon.png')} />
                      </TouchableOpacity>}

                    {/* 2 star */}
                    {fillstar == true ?
                      <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/staricon.png')} />
                      </TouchableOpacity>
                      : <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(true) }} >
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/holostaricon.png')} />
                      </TouchableOpacity>}

                    {/* 3 star */}
                    {fillstar == true ?
                      <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/staricon.png')} />
                      </TouchableOpacity>
                      : <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(true) }} >
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/holostaricon.png')} />
                      </TouchableOpacity>}

                    {/* 4 star */}
                    {fillstar == true ?
                      <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/staricon.png')} />
                      </TouchableOpacity>
                      : <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(true) }} >
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/holostaricon.png')} />
                      </TouchableOpacity>}

                    {/* 5 star */}
                    {fillstar == true ?
                      <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(false) }}>
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/staricon.png')} />
                      </TouchableOpacity>
                      : <TouchableOpacity activeOpacity={0.7} onPress={() => { setFillstar(true) }} >
                        <Image style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                        }}
                          source={require('../../assets/images/holostaricon.png')} />
                      </TouchableOpacity>}


                  </View>
                </View>

                {/* button */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)}
                  style={{ marginTop: RFPercentage(4), marginBottom: RFPercentage(4) }}>
                  <AppButton title='Submit' />
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        {/* Reviews */}
        <View style={{ width: '90%', marginTop: RFPercentage(2), flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            {/* picture */}
            <View style={{
              width: RFPercentage(10), height: RFPercentage(10), alignItems: 'center', justifyContent: 'center',
              borderRadius: RFPercentage(5), overflow: 'hidden'
            }}>
              <Image style={{ width: RFPercentage(7), height: RFPercentage(7), }} source={require('../../assets/images/profilepic.png')} />
            </View>

            {/* text */}
            <View style={{ marginLeft: RFPercentage(1) }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '600', fontSize: RFPercentage(2), color: Colors.secondary }}>
                  Lara Shane
                </Text>
                <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={{ width: RFPercentage(2.3), height: RFPercentage(2.1) }}
                    source={require('../../assets/images/staricon.png')} />
                  <Text style={{ color: Colors.secondary, fontWeight: '400', fontSize: RFPercentage(1.6), paddingLeft: RFPercentage(0.3) }}>
                    5
                  </Text>
                </View>
              </View>
              <Text style={{ fontWeight: '300', fontSize: RFPercentage(1.5), color: Colors.grey, marginTop: RFPercentage(1) }}>
                Really Amazing service provide by this Designer
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}