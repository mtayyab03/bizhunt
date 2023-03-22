import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { RFPercentage } from 'react-native-responsive-fontsize'

//Components
import Screen from '../components/Screen'
import HeaderMode from '../components/common/HeaderMode'
import InputField from '../components/common/InputField'
import AppButton from '../components/common/AppButton'

//config
import Colors from '../config/Colors'

export default function MessageScreen(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'How can I help you ?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  return (
    <Screen style={{ flex: 1, justifyContent: 'flex-start',backgroundColor: Colors.lightWhite }}>
         <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop: RFPercentage(3)}}>
                    <HeaderMode title='Salon Shop' onpress={() => { props.navigation.navigate('BottomTab', { screen: 'ChatScreen' })}}/>
            </View>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
   </Screen>
  )
}