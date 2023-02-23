import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, onPress } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from './Loading';
//Components
import Screen from '../components/Screen'
import AppButton from '../components/common/AppButton';


//config
import Colors from '../config/Colors'

export default function ForgotPassword(props) {
    const [Password, onChangePassword] = useState('');
    const[load,setload]=useState(false)
   
    const [eyeIcon, setEyeIcon] = useState(false);
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
            'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body:JSON.stringify({email:Password})
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
    const resetprocess=()=>{
        setload(true)
        postData(`https://parseapi.back4app.com/requestPasswordReset`)
        .then((data) => {
          alert("Check your Email for password Recovery")
          setload(false)
        }).catch((e)=>{
            setload(false)
            alert("try again later")
          console.log("error")
        })
    }
if(load)
{
return(<Loading/>)
}
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: Colors.lightWhite }}>

            {/* backlogo */}
            <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("SignInScreen") }} 
            style={{ backgroundColor: Colors.lightWhite,
                  marginLeft: RFPercentage(6), marginTop: RFPercentage(4), }}>
                <Image
                    style={{
                        width: RFPercentage(2.5),
                        height: RFPercentage(2.5),
                    }}
                    source={require('../../assets/images/arowblogo.png')} />
            </TouchableOpacity>

            {/* title */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(4) }}>

                {/* Image Logo */}
            <View style={{ marginTop: RFPercentage(2), marginBottom:RFPercentage(4), 
                alignItems: 'center',justifyContent:'center' }}>

                <Text style={{fontWeight:'800',fontSize:RFPercentage(4),color:Colors.primary}}>Create new Password</Text>
                
                </View>

                {/* Username */}
                <View style={{ marginTop: RFPercentage(3) }}>

                <Text style={{fontSize:RFPercentage(2.5),fontWeight:'bold',color:Colors.secondary}}>
                     Email
                     </Text>

                    
                    {/* password */}
                    <View style={{
                        width: RFPercentage(45),
                        height: RFPercentage(7),
                        marginTop: RFPercentage(2),
                        backgroundColor: '#F2F3F7',
                        color: Colors.black,
                        paddingLeft: RFPercentage(3),
                        borderRadius: RFPercentage(1.5),
                        justifyContent: 'center'
                    }}>
                        <TextInput
                            onChangeText={(e)=>onChangePassword(e)}
                            value={Password}
                            placeholder='Enter Linked Email'
                            placeholderTextColor={Colors.placeholder}

                        />
                    </View>

                    {/* password */}
        
                </View>

                {/* button */}
                <TouchableOpacity  style={{marginTop:RFPercentage(2)}} 
                   activeOpacity={0.7} onPress={resetprocess} >
                    <AppButton title='Send' />
                </TouchableOpacity>


            </View>
        </Screen >
  )
}