import React, { useState, useEffect } from 'react';
import {Text, View } from 'react-native'
import { ButtonGroup } from 'react-native-elements';
var mqtt = require('@taoqf/react-native-mqtt')

var client
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const station = ["311", "321", "331", "341"];
const sensor = ["soilNitrogen_val", "soilPhosphorus_val","soilPotassium_val","soilPH_val", "soilEC_val", "soilHMD_val",'soilTEMP_val'];

import SoilIpah1 from './single/SoilIpah1'
import SoilIpah1HQ from './single/SoilIpah1HQ'
import Chart from '../Chart'

const componentSensor1 = () => <Text style={{color:'white'}}>EC</Text>
const componentSensor2 = () => <Text style={{color:'white'}}>pH</Text>
const componentSensor3 = () => <Text style={{color:'white'}}>Humidity</Text>
let topic_mqtt
let station_name

export default function BlockIpah1() {
  useEffect(()=>{
    displayData = async ()=>{  
      try{  
        let user = await AsyncStorage.getItem('user');  
        station_name = JSON.parse(user).station_name;  
        setActiveStation(station_name)
      }
      catch(error){  
        alert(error)  
      } 
  
    } 
    displayData()
  }, [])
  const[acvtiveStation, setActiveStation] = useState(null)
  const [selectedIndex,setSelectedIndex] = useState(0)
  const [selectedIndexSensor,setSelectedIndexSensor] = useState(0)

  const [sensorManong, setSensorManong] = useState({EC:0,pH:0});
  const [sensorHQ, setSensorHQ] = useState({SEC:0, WLV:0, HMD:0});
  
  
  const [chartData, setChartData] = useState({min:[0],max:[0],avg:[0],time:[0]});
  
  useEffect(()=>{

    displayData = async ()=>{  
      try{  
        let user = await AsyncStorage.getItem('user');  
        topic_mqtt = JSON.parse(user).topic_mqtt; 
        let server_mqtt = JSON.parse(user).server_mqtt; 
        // console.log(server_mqtt)  
  
        client  = mqtt.connect(`${server_mqtt}`)
        client.on('connect', function(){
          console.log('connected soil')
        })

        client.subscribe(topic_mqtt, function (err) {
          if (!err) {
             console.log('connected',topic_mqtt)
           }
        })
        client.on('message', function (topic, message) {
          if(topic.includes("manong")){
            if (topic === `${topic_mqtt.slice(0,-1)}s/soils`){
              let data= JSON.parse(message.toString())
              console.log(`${topic_mqtt.slice(0,-1)}s/soils`)
              console.log("Manong soil",data)
              setSensorManong(data)
            }
          }else{
            if (topic === `${topic_mqtt.slice(0,-1)}s/n`){
              let data= JSON.parse(message.toString())
              // console.log("HQ",data)
              setSensorHQ(data)
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
  // useEffect(() => {
  //   // Run! Like go get some data from an API.
  //   getDataHourly('ipah_data',station[0], sensor[0])
  // }, []);

  // API HOURLY DATA
const getDataHourly = (
  table,
  station,
  sensor) => {
  axios
    .get('http://159.223.55.150/api/hourly/mobile',{
    // .get('http://139.59.109.48/api/hourly/mobile',{
      params:{
        table: table,
        station: station,
        sensor:sensor
      }
    })
    .then(function (response) {

      let arrayData =response.data
      setChartData(arrayData)

    })
    .catch(function (error) {
      // handle error
      alert(error.message);
    })
    .finally(function () {
      // always executed
      // alert('Finally called');
    });
};

  function updateIndexSensor (selectedIndexSensor) {
    setSelectedIndexSensor(selectedIndexSensor)
    getDataHourly('ipah_data', station[selectedIndex],sensor[selectedIndexSensor])
  }

  let buttonsSensor
  if(station_name==='manong'){
   buttonsSensor = [{ element: componentSensor1 }, { element: componentSensor2 }]
  }else{
    buttonsSensor = [{ element: componentSensor1 }, { element: componentSensor3 }]
  }

  return(
    <View style={{backgroundColor:'#1B1B1B', borderTopWidth:1, borderTopColor:"#333333", paddingTop:10, marginBottom:20}}>
  <View style={{marginHorizontal:10}}>
    <Text style={{color:'white', paddingVertical:10, fontSize:16}}>SOIL</Text>
  </View>

<View>

{acvtiveStation==='manong' ? 
<SoilIpah1 dataPass={sensorManong }/>
:
<SoilIpah1HQ dataPass={sensorHQ }/>
}
    
</View>
  <View style={{marginVertical:10}}>
  <Chart chartData={chartData}/>
    
  </View>
  <View style={{paddingBottom:8, marginHorizontal:20}}>
  <ButtonGroup
  onPress={updateIndexSensor}
  selectedIndex={selectedIndexSensor}
  buttons={buttonsSensor}
  containerStyle={{height: 35,backgroundColor:'transparent',
  borderWidth: 0,margin: 30,
  borderColor:"#19A78B",
borderWidth:1}} 
  buttonContainerStyle={{
    color:'white',
    borderColor:'transparent',
    backgroundColor:'#1B1B1B',
    borderColor:"#19A78B",
    borderWidth:1
  }}
  selectedButtonStyle={{
    backgroundColor:'#19A78B',
  }}
  />
  </View>
  </View>
  )
}

