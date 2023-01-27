import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image,TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../config/Colors'



export default function App() {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');

    })();
  }, []);

  const takeVideo = async () => {
    if(camera){
        const data = await camera.recordAsync({
          maxDuration:10
        })
        setRecord(data.uri);
        console.log(data.uri);
    }
  }

  const stopVideo = async () => {
    camera.stopRecording();
  }

  if (hasCameraPermission === null || hasAudioPermission === null ) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1}}>
        
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'4:3'} >
   
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: record,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />

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
          width:'55%',
          flexDirection: "row",
          justifyContent:'space-around',
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
            }}>
          <Ionicons
            name={
              Platform.OS === "ios" ? "camera" : "md-reverse-camera"
            }
            size={50}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center" }} onPress={() => takeVideo()} 
          
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
          style={{ alignSelf: "center" }} onPress={() => stopVideo()} >
            
          <View
          style={{
            borderWidth: 2,
            borderRadius: 25,
            borderColor: Colors.white,
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
              borderColor: Colors.white,
              height: 40,
              width: 40,
              backgroundColor: Colors.white,
            }}
          ></View>
        </View>
      </TouchableOpacity>
          <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
          </View>
          </View>
          </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  },
  video: {
    width: 350,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})