import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

//config
import Colors from '../../config/Colors'

export default function Dropdown({title}) {
    const [dropdown, setDropdown] = useState(false);
    const statemrntList = [
        {
            id: '1',
            title: 'December',
    
        },
        {
            id: '2',
            title: 'November',
    
      },
        {
            id: '3',
            title: 'October',
    
        },
    ]
  return (
    <>

<View  style={{ backgroundColor:Colors.transback,
                           width: RFPercentage(47),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(7),
                             justifyContent:'center' }}>

                       <View style={{ flexDirection: 'row', alignItems: 'center',  }}>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color: Colors.secondary }}>
                            {title}
                          </Text>
                          {dropdown ?
                          <TouchableOpacity activeOpacity={0.7} onPress={() => {setDropdown(false)}}  style={{position:'absolute',right:RFPercentage(3)}}>
                          <Image
                            style={{
                                width: RFPercentage(4),
                                height: RFPercentage(4),
                                }}
                                source={require('../../../assets/images/updropicon.png')} /> 
                         </TouchableOpacity>
                         :
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {setDropdown(true)}}  style={{position:'absolute',right:RFPercentage(3)}}>
                          <Image
                            style={{
                                width: RFPercentage(4),
                                height: RFPercentage(4),
                                }}
                                source={require('../../../assets/images/dropdownicon.png')} /> 
                         </TouchableOpacity>
                         }
                        </View>
                       
                </View>

             {/* dropdown */}
             {dropdown ?
             <View  style={{ backgroundColor:Colors.transback,
                           width: RFPercentage(47),
                           borderRadius: RFPercentage(1.5),
                            height:RFPercentage(20) }}>
                    
                    <FlatList
                           scrollEnabled={false}
                            style={{flexGrow:0}}
                            data={statemrntList}
                            keyExtractor={statemrntList => statemrntList.id.toString()}
                            showsVerticalScrollIndicator={false}
                            vertical
                            renderItem={({ item }) =>

                       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:RFPercentage(3) }}>

                          <Text style={{ fontWeight: '500', fontSize: RFPercentage(2), marginLeft: RFPercentage(3), color:Colors.lightgrey }}>
                            {item.title}
                          </Text>
                        <View style={{position:'absolute',right:RFPercentage(3)}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                                <Text style={{color:Colors.lightgrey,fontSize:RFPercentage(2),
                                    fontWeight:'700',marginRight:RFPercentage(2)}}>
                                        25$
                                </Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                  <Image
                                    style={{
                                        width: RFPercentage(4),
                                        height: RFPercentage(4),
                                        }}
                                   source={require('../../../assets/images/downloadicon.png')} />
                                </TouchableOpacity> 
                            </View>
                         </View>
                        </View>
                            }/>
                       
                </View>
:null}

    </>
  )
}