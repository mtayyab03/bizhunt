import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, TextInput, onPress } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Components
import Screen from '../components/Screen'
import AppButton from '../components/common/AppButton';


//config
import Colors from '../config/Colors'

export default function ForgotPassword(props) {

    const [ConifrmPass, onConifrmPass] = useState('');
    const [Password, onChangePassword] = useState('');
    const [eyeIcon, setEyeIcon] = useState(false);

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
                     Password
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
                            onChangeText={onChangePassword}
                            value={Password}
                            placeholder='Password'
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
                            onChangeText={onConifrmPass}
                            value={ConifrmPass}
                            placeholder='Re-enter New Password'
                            placeholderTextColor={Colors.placeholder}
                            secureTextEntry={true && !eyeIcon}
                        />

                        <TouchableOpacity activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center',
                         position: "absolute", right: RFPercentage(1), width: RFPercentage(5), height: RFPercentage(5) }}>

                            <TouchableOpacity onPress={() => setEyeIcon(!eyeIcon)} style={{ position: "absolute", 
                                  right: RFPercentage(1), }}>
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
                <TouchableOpacity disabled={ConifrmPass==''| Password==''} style={{marginTop:RFPercentage(2)}} 
                   activeOpacity={0.7} onPress={() => { props.navigation.navigate("SignInScreen") }} >
                    <AppButton title='Save' />
                </TouchableOpacity>


            </View>
        </Screen >
  )
}