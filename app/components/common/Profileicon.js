import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ImageBackground, FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../../config/Colors'

export default function Profileicon({ title, icon }) {
    return (

        <>
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', marginTop: RFPercentage(2) }}>
                <Image style={{ width: RFPercentage(3.6), height: RFPercentage(3.6), }} source={icon} />

                <Text style={{ fontWeight: '400', fontSize: RFPercentage(1.5), marginLeft: RFPercentage(1.5), color: Colors.primary }}>
                    {title}
                </Text>
            </View>

        </>
    )
}