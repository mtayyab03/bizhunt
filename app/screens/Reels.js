import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import ReelsComponent from '../components/ReelsComponent';
const Reels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        position: 'relative',
        bottom:50,
        backgroundColor: 'black',
        
      }}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}> 
      </View>
      <ReelsComponent />
    </View>
  );
};

export default Reels;
