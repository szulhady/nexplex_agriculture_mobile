import React, {useEffect} from 'react';
import { Text, View,Image} from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// let station = null
export default function SoilIpah1({dataPass}) {
  
  // useEffect(()=>{
  //   displayData = async ()=>{  
  //     try{  
  //       let user = await AsyncStorage.getItem('user');  
  //       station = JSON.parse(user).station_name;  
  //       console.log(station)
  //     }
  //     catch(error){  
  //       alert(error)  
  //     } 
  
  //   } 
  //   displayData()
  // }, [])

  return(

    // <View>
    // {station === 'manong'  ?
    <View style={{backgroundColor:'#1B1B1B', paddingTop:10, marginBottom:5}}>
    <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center', paddingTop:10, marginBottom:10}}>
      <View style={{alignItems:'center'}}>
        <Image
          source={require('../../../assets/ec.png')}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{color:'white', paddingTop:10, fontWeight:'bold'}}>{dataPass.EC}</Text>
      </View>
      <View style={{alignItems:'center'}}>
        <Image
          source={require('../../../assets/ph.png')}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{color:'white', paddingTop:10, fontWeight:'bold'}}>{dataPass.pH}</Text>
      </View>
    </View>
    </View>
  //     : station !=="manong" && station !== null ?
  //     <View style={{backgroundColor:'#1B1B1B', paddingTop:10, marginBottom:5}}>
  //     <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center', paddingTop:10, marginBottom:10}}>
  //       <View style={{alignItems:'center'}}>
  //         <Image
  //           source={require('../../../assets/ec.png')}
  //           style={{ width: 40, height: 40 }}
  //         />
  //         <Text style={{color:'white', paddingTop:10, fontWeight:'bold'}}>{dataPass.EC}</Text>
  //       </View>
  //       <View style={{alignItems:'center'}}>
  //         <Image
  //           source={require('../../../assets/ms.png')}
  //           style={{ width: 40, height: 40 }}
  //         />
  //         <Text style={{color:'white', paddingTop:10, fontWeight:'bold'}}>{dataPass.pH}</Text>
  //       </View>
  //     </View>
  //     </View>
  //     : <View></View>
  //   } 

  //   </View>
  )
}


