import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'

//config
import Colors from '../config/Colors'

export default function SplashScreen(props) {
    return (
        <Screen style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: Colors.lightWhite }}>

            <TouchableOpacity activeOpacity={0.9} onPress={() => { props.navigation.navigate("SignInScreen") }}>
                <View style={{marginBottom: RFPercentage(8), width: RFPercentage(40), height: RFPercentage(40),alignItems: 'center',justifyContent:'center' }}>
                <Image style={{ width: RFPercentage(29.5), height: RFPercentage(28) }} source={require('../../assets/images/bizlogo.png')} />
                </View>
            </TouchableOpacity>
        </Screen>
    )
}

const styles = StyleSheet.create({

})