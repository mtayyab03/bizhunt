import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import AppButton from '../components/common/AppButton';


//config
import Colors from '../config/Colors'

export default function SignInScreen(props) {
    const [text, onChangeText] = useState('');
    const [Password, onChangePassword] = useState('');
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
                        onChangeText={onChangeText}
                        value={text}
                        placeholder='Email address'
                        placeholderTextColor={Colors.placeholder}
                    />

                    {/* password */}
                    <TextInput
                        style={{
                            height: RFPercentage(5),
                            marginTop: RFPercentage(1.5),
                            width: RFPercentage(45),
                            height: RFPercentage(6.5),
                            backgroundColor: '#F2F3F7',
                            color: Colors.black,
                            paddingLeft: RFPercentage(3),
                            borderRadius: RFPercentage(1.5)
                        }}
                        onChangeText={onChangePassword}
                        value={Password}
                        placeholder='Password'
                        placeholderTextColor={Colors.placeholder}
                        secureTextEntry
                    />
                </View>

                {/* button */}
                <TouchableOpacity disabled={text==''| Password==''} style={{ marginTop: RFPercentage(2) }} activeOpacity={0.7} 
                                        onPress={() => { props.navigation.navigate('BottomTab', { screen: 'HomeScreen' })}} >
                    <AppButton title='LOG IN' />
                </TouchableOpacity>
                
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