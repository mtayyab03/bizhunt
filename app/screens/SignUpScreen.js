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

export default function SignUpScreen(props) {
    const[load,setload]=useState(false)
    const [Name, onChangeName] = useState('');
    const [text, onChangeText] = useState('');
    const [Password, onChangePassword] = useState('');
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
          body:JSON.stringify({username:Name,name:Name,email:text,password:Password})
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
    const signupprocess=()=>{
        setload(true)
        postData(`https://parseapi.back4app.com/users`)
        .then((data) => {
            if(data?.error)
            {
                alert(data?.error)
            }
            else
            {
          alert("Account created")
            }
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

            {/* title */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(4) }}>

                {/* Image Logo */}
            <View style={{ marginTop: RFPercentage(4), marginBottom:RFPercentage(4), 
                alignItems: 'center',justifyContent:'center' }}>

                <Image style={{ width: RFPercentage(15.8), height: RFPercentage(15) }} 
                source={require('../../assets/images/bizlogo.png')} />
                
                </View>

                {/* Username */}
                <View style={{ marginTop: RFPercentage(3) }}>

                <Text style={{fontSize:RFPercentage(2.5),fontWeight:'700',color:Colors.secondary, marginBottom: RFPercentage(3)}}> 
                Sign Up</Text>

                    <View style={{
                        width: RFPercentage(45),
                        height: RFPercentage(7),
                        backgroundColor: '#F2F3F7',
                        color: Colors.black,
                        paddingLeft: RFPercentage(3),
                        borderRadius: RFPercentage(1.5),
                        justifyContent: 'center'
                    }}>
                        <TextInput
                            onChangeText={(e)=>onChangeName(e)}
                            value={Name}
                            placeholder='Username'
                            placeholderTextColor={Colors.placeholder}
                        />
                    </View>

                    {/* //email input */}
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
                            onChangeText={(e)=>onChangeText(e)}
                            value={text}
                            placeholder='Email address'
                            placeholderTextColor={Colors.placeholder}
                        />
                    </View>

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
                            placeholder='Password'
                            placeholderTextColor={Colors.placeholder}
                            secureTextEntry={true && !eyeIcon}
                        />

                        <TouchableOpacity activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center', position: "absolute", right: RFPercentage(1), width: RFPercentage(5), height: RFPercentage(5) }}>

                            <TouchableOpacity onPress={() => setEyeIcon(!eyeIcon)} style={{ position: "absolute", right: RFPercentage(1), }}>
                                <MaterialCommunityIcons
                                    color={Colors.grey}
                                    style={{ right: RFPercentage(1) }}
                                    size={RFPercentage(3)}
                                    name={eyeIcon ? "eye-outline" : "eye-off-outline"}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>


                    </View>
                </View>

                {/* button */}
                <TouchableOpacity
                  style={{marginTop:RFPercentage(2)}} activeOpacity={0.7} onPress={signupprocess} >
                    <AppButton title='SIGN UP' />
                </TouchableOpacity>

                {/* belowbuttonline */}
                <View style={{ marginTop: RFPercentage(17), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#A1A4B2', fontSize: RFPercentage(1.5) }}>
                        ALREADY HAVE AN ACCOUNT?
                    </Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => { props.navigation.navigate("SignInScreen") }}>
                        <Text style={{ color: Colors.primary, fontSize: RFPercentage(1.5) }}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Screen >
    )
}