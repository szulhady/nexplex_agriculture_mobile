import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import axios from 'axios';

const station = ["311", "321", "331", "341"];
const sensor = ["soilNitrogen_val", "soilPhosphorus_val","soilPotassium_val","soilPH_val", "soilEC_val", "soilHMD_val",'soilTEMP_val'];

import AsyncStorage from '@react-native-async-storage/async-storage';

import Chart from '../Chart'


const componentSensor1 = () => <Text style={{color:'white'}}>EC</Text>
const componentSensor2 = () => <Text style={{color:'white'}}>pH</Text>
const componentSensor3 = () => <Text style={{color:'white'}}>Humidity</Text>
let station_name
export default function BlockIpah1() {
  const [selectedIndex,setSelectedIndex] = useState(0)
  const [selectedIndexSensor,setSelectedIndexSensor] = useState(0)
  const [chartDataDaily, setChartDataDaily] = useState({min:[0],max:[0],avg:[0],time:[0]});
  const [chartDataMonthly, setChartDataMonthly] = useState({min:[0],max:[0],avg:[0],time:[0]});
  const[acvtiveStation, setActiveStation] = useState(null)
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
  useEffect(() => {
    // Run! Like go get some data from an API.
    getDataDaily('ipah_data',station[0], sensor[0])
    getDataMonthly('ipah_data',station[0], sensor[0])
  }, []);

  // API DAILY DATA
const getDataDaily = (
  table,
  station,
  sensor) => {
  axios
    .get('http://139.59.109.48/api/daily/mobile',{
      params:{
        table: table,
        station: station,
        sensor:sensor
      }
    })
    .then(function (response) {
      let arrayData =response.data
      setChartDataDaily(arrayData)
      // alert(JSON.stringify(response.data));
      // alert(data);
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
const getDataMonthly = (
  table,
  station,
  sensor) => {
  axios
    .get('http://139.59.109.48/api/monthly/mobile',{
      params:{
        table: table,
        station: station,
        sensor:sensor
      }
    })
    .then(function (response) {
      let arrayData =response.data
      setChartDataMonthly(arrayData)
      // alert(JSON.stringify(response.data));
      // alert(data);
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

  function updateIndex (selectedIndex) {
    setSelectedIndex(selectedIndex)
    getDataDaily('ipah_data', station[selectedIndex],sensor[selectedIndexSensor])
    getDataMonthly('ipah_data', station[selectedIndex],sensor[selectedIndexSensor])

  }
  function updateIndexSensor (selectedIndexSensor) {
    setSelectedIndexSensor(selectedIndexSensor)
    getDataDaily('ipah_data', station[selectedIndex],sensor[selectedIndexSensor])
    getDataMonthly('ipah_data', station[selectedIndex],sensor[selectedIndexSensor])
  }
  let buttonsSensor

  if(station_name==='manong'){
    buttonsSensor = [{ element: componentSensor1 }, { element: componentSensor2 }]
   }else{
     buttonsSensor = [{ element: componentSensor1 }, { element: componentSensor3 }]
   }

  // buttonsSensor = [{ element: componentSensor1 }, { element: componentSensor2 }]
  return(
    <View style={{paddingTop:10, marginBottom:20}}>

  <View style={{paddingBottom:8, marginHorizontal:20, marginTop:10}}>
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
  <Text style={{color:'white', paddingLeft:20, paddingVertical:15}}>Daily Trends</Text>
  <Chart chartData={chartDataDaily}/>
  <Text style={{color:'white', paddingLeft:20, paddingVertical:15}}>Monthly Trends</Text>
  <Chart chartData={chartDataMonthly}/>
  
  </View>
  )
}
