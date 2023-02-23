import React, { useState,useContext } from 'react'
import { Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Formik } from 'formik';
import * as yup from 'yup';

//Components
import Screen from '../components/Screen'
import AppButton from '../components/common/AppButton';

import Loading from './Loading';
//config
import Colors from '../config/Colors'
import { AuthProvider,useAuth,AuthContext } from '../../contextapi/Auth';
export default function SignInScreen(props) {
    const { user, login, logout, isLoading } = useAuth();
    const[load,setload]=useState(false)
    let validationSchema = yup.object().shape({
        email: yup.string().required().label('Username'),
        password: yup.string().required().min(4).label('Password'),
        })
        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
        const loginprocess=(values)=>{
            setload(true)
            const{email,password}=values
            postData(`https://parseapi.back4app.com/login?username=${email}&password=${password}`)
            .then((data) => {
              login(data)
              setload(false)
            }).catch((e)=>{
                setload(false)
              console.log("error")
            })
        }
if(isLoading||load)
{
    return(<Loading/>)
}
    return (
        <Screen style={{ flex: 1, justifyContent: 'center',alignItems:'center',backgroundColor: Colors.lightWhite }}>

            {/* Image Logo */}
            <View style={{ marginTop: RFPercentage(2), marginBottom:RFPercentage(4), 
                alignItems: 'center',justifyContent:'center' }}>

                <Image style={{ width: RFPercentage(15.8), height: RFPercentage(15) }} 
                source={require('../../assets/images/bizlogo.png')} />
                
                </View>


            <View style={{ justifyContent: 'center' }}>

                {/* title */}
                <Text style={{fontSize:RFPercentage(2.5),fontWeight:'700',color:Colors.secondary}}> Login </Text>

                {/* facebook */}
                <TouchableOpacity activeOpacity={0.7} style={{
                    width: RFPercentage(45), height: RFPercentage(6)
                    , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center',
                     marginTop: RFPercentage(3),borderColor: '#0D104080', borderWidth: RFPercentage(0.07),
                }}>

                    {/* icon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Image
                            style={{
                                width: RFPercentage(1.5),
                                height: RFPercentage(3),
                                marginRight: RFPercentage(2)
                            }}
                            source={require('../../assets/images/flogo.png')} />

                        <Text style={{ color: Colors.secondary, fontWeight:'400', fontSize: RFPercentage(2) }}>
                             FACEBOOK
                        </Text>
                    </View>

                </TouchableOpacity>

                {/* //google */}
                <TouchableOpacity activeOpacity={0.7} style={{
                    width: RFPercentage(45), height: RFPercentage(6)
                    , borderRadius: RFPercentage(1), justifyContent: 'center', alignItems: 'center', 
                    marginTop: RFPercentage(1.5), backgroundColor: Colors.lightWhite, borderColor: '#0D104080', borderWidth: RFPercentage(0.07),
                }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Image
                            style={{
                                width: RFPercentage(2.9),
                                height: RFPercentage(3),
                                marginRight: RFPercentage(2)
                            }}
                            source={require('../../assets/images/Glogo.png')} />


                        <Text style={{ color: Colors.secondary, fontWeight:'400', fontSize: RFPercentage(2) }}>
                            GOOGLE
                        </Text>

                    </View>
                </TouchableOpacity>

         

                {/* //logintext */}
                <View style={{width:RFPercentage(45) ,alignItems:'center',justifyContent:'center'}}>

                <Text style={{
                    marginTop: RFPercentage(2), marginBottom:RFPercentage(2), color: '#0D104080', fontSize: RFPercentage(1.5)
                }}>
                    ------------------- Or ---------------------
                </Text>
                    </View>

                {/* //email input */}
                <Formik
                      initialValues={{ email: '', password: '' }}
                      onSubmit={(values) => { loginprocess(values)}}
                      validationSchema={validationSchema}
                      >
                        {({handleChange,handleSubmit,errors,setFieldTouched,touched})=>(
                            
                        <>
                <View>
                    <TextInput
                        style={{
                            height: RFPercentage(5),
                            width: RFPercentage(45),
                            height: RFPercentage(6.5),
                            backgroundColor: '#F2F3F7',
                            color: Colors.black,
                            paddingLeft: RFPercentage(3),
                            borderRadius: RFPercentage(1.5)
                        }}
                        keyboardType='default'
                        onChangeText={handleChange('email')}
                        onBlur={()=>setFieldTouched('email')}
                        // value={text}
                        placeholder='Usename'
                        placeholderTextColor={Colors.placeholder}
                    />

                  {touched.email && <Text style={{color:'#FF0000',fontSize:RFPercentage(1.3),marginTop:RFPercentage(0.5)}}>{errors.email}</Text>}
                    <TextInput
                        style={{
                            height: RFPercentage(5),
                            marginTop: RFPercentage(1.8),
                            width: RFPercentage(45),
                            height: RFPercentage(6.5),
                            backgroundColor: '#F2F3F7',
                            color: Colors.black,
                            paddingLeft: RFPercentage(3),
                            borderRadius: RFPercentage(1.5)
                        }}
                        
                        onChangeText={handleChange('password')}
                        onBlur={()=>setFieldTouched('password')}
                        // value={Password}
                        placeholder='Password'
                        placeholderTextColor={Colors.placeholder}
                        secureTextEntry
                    />
                  {touched.password && <Text style={{color:'#FF0000',fontSize:RFPercentage(1.3),marginTop:RFPercentage(0.5)}}>{errors.password}</Text>}
                </View>

                
                <TouchableOpacity  style={{ marginTop: RFPercentage(2) }} activeOpacity={0.7} 
                                        onPress={handleSubmit} >
                    <AppButton title='LOG IN' />
                </TouchableOpacity>

                </>
                )}

                </Formik>
                
                {/* //forget text */}
                <View style={{width:RFPercentage(45) ,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => { props.navigation.navigate("ForgotPassword") }}>
                    <Text style={{ marginTop: RFPercentage(2), color: Colors.secondary, fontSize: RFPercentage(1.6), fontWeight: '400' }}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
                </View>


                {/* belowbuttonline */}
                <View style={{ marginTop: RFPercentage(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#A1A4B2', fontSize: RFPercentage(1.5) }}>
                        ALREADY HAVE AN ACCOUNT?
                    </Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => { props.navigation.navigate("SignUpScreen") }}>
                        <Text style={{ color: Colors.primary, fontSize: RFPercentage(1.5) ,fontWeight:'500'}}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </Screen>
    )
}