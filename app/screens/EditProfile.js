import React, { useState,useEffect } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, FlatList,Modal,ScrollView,Pressable} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'
import { AuthProvider,useAuth,AuthContext } from '../../contextapi/Auth';
import postDataapi from '../../redux/apicall';
import Loading from './Loading';
import Parse from 'parse/react-native.js';

export default function EditProfile(props) {
  const { user, login, logout, isLoading } = useAuth();
  const userinfo=useAuth()
  const[countries,setcountries]=useState([])
  const[email,setemail]=useState(userinfo?.user?.email||"")
  const[name,setname]=useState(userinfo?.user?.username||"")
  const[phone,setphone]=useState(userinfo?.user?.phoneNumber||"")
  const[load,setlaod]=useState(false)
  const[country,setcountry]=useState({
    Name:userinfo?.user?.country||""
  })
  const [modalVisible, setModalVisible] = useState(false);
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
      'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const getcats=async()=>{
    setlaod(true)
    postData("https://parseapi.back4app.com/classes/Countries")
    .then((data) => {
      setcountries(data.results); // JSON data parsed by `data.json()` call
      setlaod(false)
    }).catch((e)=>{
      setlaod(false)
    }) 
  }

    const editList = [
        {
            id: '1',
            title: 'Name',
            subtitle:'Enter Name'
    
        },
        {
            id: '2',
            title: 'Email',
            subtitle:'Enter Email'
    
      },
        {
            id: '3',
            title: 'Phone Number',
            subtitle:'Phone Number'
    
        },
    ]

    const updateaccount = async () => {
       setlaod(true);
      const currentUser = await Parse.User.currentAsync();
      if (currentUser) {
        currentUser.set('username', name);
        currentUser.set('email', email);
        currentUser.set('name', name);
        currentUser.set('phoneNumber', Number(phone));
        currentUser.set('country', country?.Name);
        try {
          await currentUser.save();
          alert('User Updated Login again');
          logout();
          setlaod(false);
        } catch (error) {
          alert('Failed to update user.');
          setlaod(false);
        }
      } else {
        alert('No current user found.');
        setlaod(false);
      }
    };
    

useEffect(()=>{
  getcats()
},[])
if(load)
{
    return(<Loading/>)
}
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor: Colors.lightWhite }}>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={{flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: "center",
                      marginTop: 29}}>
          <View style={{ width:'100%',height:RFPercentage(37),
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
          <ScrollView>
         
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

            {/* title */}
            <TouchableOpacity activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.primary,fontWeight:'600'}}>Select Country</Text>
            </TouchableOpacity>
          {
            countries?.map((item,i)=>(
              <TouchableOpacity key={i} onPress={()=>{
                setModalVisible(!modalVisible)
               setcountry(item)
             }} activeOpacity={0.7}>
                <Text style={{fontSize:RFPercentage(2.5),color:Colors.secondary,marginTop:RFPercentage(2.3),fontWeight:'600'}}>{item?.Name}</Text>
               </TouchableOpacity>
           
            ))
          }

</ScrollView>
          </View>
        </View>
      </Modal>
            <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(4)}}>
                    <HeaderMode title='Edit profile' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ProfileScreen' })}}/>
            </View>
 
            <View style={{marginTop:RFPercentage(3),}}>
                     <InputField title="Name" placeholder={name?.toString()||"Name"} onChangeText={(e)=>setname(e)}/>
              </View>
              <View style={{marginTop:RFPercentage(3),}}>
                     <InputField title="Email" placeholder={email?.toString()||"Email"} onChangeText={(e)=>setemail(e)}/>
                 </View>
                <View style={{marginTop:RFPercentage(3),}}>
                     <InputField title="Phone Number" placeholder={phone?.toString()||"Phone Number"} onChangeText={(e)=>setphone(e)}/>
                 </View>
        
                 <View style={{ marginTop: RFPercentage(3) }}>
                    
                    <TouchableOpacity activeOpacity={0.7}  style={{ backgroundColor: Colors.inputcolor,
                                       width: RFPercentage(45),
                                       borderRadius: RFPercentage(1.5),
                                        height:RFPercentage(7),
                                         justifyContent:'center' }} onPress={() => setModalVisible(true)} >
            
                                   <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
            
                                      <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                                      {country===''?"Select country":country?.Name}
                                      </Text>
                                    <View style={{position:'absolute',right:RFPercentage(3)}}>
                                      <Image
                                        style={{
                                            width: RFPercentage(4),
                                            height: RFPercentage(4),
                                            }}
                                            source={require('../../assets/images/dropdownicon.png')} /> 
                                     </View>
                                    </View>
                                   
                            </TouchableOpacity>
                     </View>

                {/* button */} 
                <TouchableOpacity activeOpacity={0.7} onPress={() => { updateaccount()}} 
                                   style={{marginTop:RFPercentage(6),marginBottom:RFPercentage(4)}}>
                          <AppButton title='Save'/>
                 </TouchableOpacity>
 </Screen>
  )
}