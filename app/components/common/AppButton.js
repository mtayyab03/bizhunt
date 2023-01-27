import React from 'react'
import { Text,View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../../config/Colors'

export default function AppButton({ title }) {
    return (

        <View style={{
              width: RFPercentage(45), height: RFPercentage(6)
            , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center', marginTop: RFPercentage(2)
            ,backgroundColor:'#FF9900' }}>
            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                {title}
            </Text>
        </View>

    )
}