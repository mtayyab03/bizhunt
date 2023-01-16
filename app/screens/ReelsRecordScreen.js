import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity,onPress } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../config/Colors'


export default function ReelsRecordScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  
useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{ flex: 1 }}>
  <Camera
    style={{ flex: 1 }}
    type={type}
    ref={(ref) => {
      setCameraRef(ref);
    }}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        marginBottom:RFPercentage(8)
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems:'center'
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Ionicons
            name={
              Platform.OS === "ios" ? "camera" : "md-reverse-camera"
            }
            size={50}
            color="white"
          />
        </TouchableOpacity>
       
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={async () => {
            if (!recording) {
              setRecording(true);
              let video = await cameraRef.recordAsync();
              console.log("video", video);
            } else {
              setRecording(false);
              cameraRef.stopRecording();
            }
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 25,
              borderColor: "red",
              height: 50,
              width: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 25,
                borderColor: "red",
                height: 40,
                width: 40,
                backgroundColor: "red",
              }}
            ></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => { props.navigation.navigate('ReelCaption')}}
        >
          <View style={{
              width: RFPercentage(13), height: RFPercentage(6)
            , borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center'
            ,backgroundColor:Colors.lightWhite }}>
            <Text style={{ color: Colors.secondary, fontSize: RFPercentage(2.2), fontWeight:'700' }}>
                Next
            </Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  </Camera>
</View>
  );
}