import React, {useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
var mqtt = require('@taoqf/react-native-mqtt')
var client 

import NutrientHouseIpah1 from './single/NutrientHouseIpah1'
import NutrientHouseIpah1HQ from './single/NutrientHouseIpah1HQ'

import AsyncStorage from '@react-native-async-storage/async-storage';

let topic_mqtt
let station_name

export default function BlockIpah1() {


  const [sensorManong, setSensorManong] = useState({EC:0});
  const [sensorHQ, setSensorHQ] = useState({SEC:0,WLV:0, HMD:0});
  const [sensorHQEC, setSensorHQEC] = useState({EC:0});
  // const [sensorHQWL, setSensorHQWL] = useState({WL:0});

  const[acvtiveStation, setActiveStation] = useState(null)
  useEffect(()=>{

    displayData = async ()=>{  
      try{  
        let user = await AsyncStorage.getItem('user');  
        topic_mqtt = JSON.parse(user).topic_mqtt; 
        let server_mqtt = JSON.parse(user).server_mqtt; 
        station_name = JSON.parse(user).station_name;
        setActiveStation(station_name)
        // console.log(station_name)  
  
        client  = mqtt.connect(`${server_mqtt}`)
        client.on('connect', function(){
          console.log('connected')
        })

        client.subscribe(topic_mqtt, function (err) {
          if (!err) {
             console.log('connected nutrienet ipah')
           }
        })
        client.on('message', function (topic, message) {
          if(topic.includes("manong")){
            if (topic === `${topic_mqtt.slice(0,-1)}s/n`){
              let data= JSON.parse(message.toString())
              setSensorManong(data)
            }
          }else{
            console.log('here')
            if (topic === `${topic_mqtt.slice(0,-1)}s/n`){
              let data= JSON.parse(message.toString())
              console.log(data)
              setSensorHQ(data)
            } 
            if (topic === `${topic_mqtt.slice(0,-1)}s/ec`){
              let data= JSON.parse(message.toString())
              setSensorHQEC(data)
            }
          }
        })
      }
      catch(error){  
        alert(error)  
      } 
  
    } 
    displayData()
  }, [])

  return(
    <View style={{backgroundColor:'#1B1B1B', borderTopWidth:1, borderTopColor:"#333333", paddingTop:10, marginBottom:20, paddingHorizontal:10}}>
      <Text style={{color:'white', paddingVertical:10, fontSize:16}}>NUTRIENT HOUSE</Text>
      
      {acvtiveStation==='manong' ? 
 <NutrientHouseIpah1 dataPass={sensorManong }/>
:
<NutrientHouseIpah1HQ dataPass={sensorHQ } dataPassEC={sensorHQEC}/>
}
      
    </View>
  )
}

const styles = StyleSheet.create({})
