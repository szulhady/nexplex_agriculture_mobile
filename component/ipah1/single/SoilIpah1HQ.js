import React, {useEffect} from 'react';
import { Text, View,Image} from 'react-native'

export default function SoilIpah1HQ({dataPass}) {
  
  return(
      <View style={{backgroundColor:'#1B1B1B', paddingTop:10, marginBottom:5}}>
      <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center', paddingTop:10, marginBottom:10}}>
        <View style={{alignItems:'center'}}>
          <Image
            source={require('../../../assets/ec.png')}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{color:'white', paddingTop:10, fontWeight:'bold'}}>{dataPass.SEC}</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Image
            source={require('../../../assets/ms.png')}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{color:'white', paddingTop:10, fontWeight:'bold'}}>{dataPass.HMD}</Text>
        </View>
      </View>
      </View>
  )
}


