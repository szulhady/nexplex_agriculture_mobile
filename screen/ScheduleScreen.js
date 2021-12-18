import React, { useState, useEffect } from 'react';
import { Text, View, Platform, Image, Alert ,TextInput, StyleSheet, SafeAreaView, Button ,ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';

import { TextInputMask } from 'react-native-masked-text'

import RNPickerSelect from 'react-native-picker-select';

import AsyncStorage from '@react-native-async-storage/async-storage';


const ControlStack = createStackNavigator();

import Dates from 'react-native-dates';
import axios from 'axios';

const getDatesBetweenDates=(startDate, endDate) =>{
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  // const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, moment(new Date(theDate)).format("YYYY-MM-DD")];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, moment(endDate).format("YYYY-MM-DD")];
  return dates;
}

let get
let post
let deleteData

function ScheduleScreen({navigation}) {
  
  displayData = async ()=>{  
    try{  
      let user = await AsyncStorage.getItem('user');  
      get = JSON.parse(user).get_schedule;  
      post = JSON.parse(user).post_schedule;  
      deleteData = JSON.parse(user).delete_schedule;  
      console.log(post)
      console.log(get)
      console.log(deleteData)
      getSchedule()
    }  
    catch(error){  
      alert(error)  
    } 

  }  
  // TABLE
  useEffect(() => {
    // Update the document title using the browser API
    
    navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      displayData()
    });
  },[]);
  const [tableSchedule,setTableSchedule] = useState([])

  const getSchedule = async () => {

    axios
      .get(get)
      // .get('http://139.59.109.48/api/schedule/manong/')
      // .get('http://192.168.0.20:5000/api/schedule/manong/')
      .then(function (response) {
        setTableSchedule([])
        let table=[]
        response.data.forEach(i =>{
          let date = i.date
          let remarks = i.remarks
          let data  = [date,remarks]
          table.push(data)
        })
        setTableSchedule(table)
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
  const deleteSchedule = (date)=>{
    axios.delete(deleteData,{
    // axios.delete('http://139.59.109.48/api/schedule/manong',{
    // axios.delete('http://192.168.0.20:5000/api/schedule/manong',{
      data:{
        date:date
      }
    }).
    then(function(response){
      getSchedule()
    }).catch(function(error){
      console.log(error)
    })
  }

  const data = {
    tableHead: ['Date', 'Remarks'],
    tableData: [
      ['Salinity', "DD"],
      ['Ammonia', "DG"],
      ['Dissolved Oxygen', "DO"],
      ['pH', "PH"],
      ['Temperature', "TMP"],
    ]
  }

  var rowDate = [];

  for(let i = 0; i<tableSchedule.length; i++){
                
    rowDate.push(
      <TouchableOpacity key={i} onPress={()=>{
        Alert.alert(
          "Action",
          `Do you want to delete schedule set on ${tableSchedule[i][0]}`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => deleteSchedule(tableSchedule[i][0]) }
          ]
        )
        
      }}>
    <Row key={i} data={tableSchedule[i]}  textStyle={styles.text2}/>
    </TouchableOpacity>
    )
}

  // END OF TABLE
  let dateList = []
  // SET DATE
  const [date, setDate] = useState({
    date: null,
    focus: 'startDate',
    startDate: null,
    endDate: null
  });

  const [input, setExpandedInput] = useState(true);
  const [expandedTable, setExpandedTable] = useState(false);

  // SET OF ARRAY
  const [allTime, setAllTime] = useState([])
  const [allDuration, setAllDuration] = useState([])
  const [allSubstance, setAllSubstance] = useState([])

  // SET OPTION 1
  const [time1, setTime1] = useState("");
  const [duration1, onChangeDuration1] = useState(null);
  const [substance1, setSubstance1] = useState("");

  // SET OPTION 2
  const [time2, setTime2] = useState("");
  const [duration2, onChangeDuration2] = useState(null);
  const [substance2, setSubstance2] = useState("");

  // SET OPTION 3
  const [time3, setTime3] = useState("");
  const [duration3, onChangeDuration3] = useState(null);
  const [substance3, setSubstance3] = useState("");

  // SET OPTION 4
  const [time4, setTime4] = useState("");
  const [duration4, onChangeDuration4] = useState(null);
  const [substance4, setSubstance4] = useState("");

  // SET OPTION 5
  const [time5, setTime5] = useState("");
  const [duration5, onChangeDuration5] = useState(null);
  const [substance5, setSubstance5] = useState("");

  // SET OPTION 6
  const [time6, setTime6] = useState("");
  const [duration6, onChangeDuration6] = useState(null);
  const [substance6, setSubstance6] = useState("");

  // SET OPTION 7
  const [time7, setTime7] = useState("");
  const [duration7, onChangeDuration7] = useState(null);
  const [substance7, setSubstance7] = useState("");

  // SET OPTION 8
  const [time8, setTime8] = useState("");
  const [duration8, onChangeDuration8] = useState(null);
  const [substance8, setSubstance8] = useState("");

  // SET OPTION 9
  const [time9, setTime9] = useState("");
  const [duration9, onChangeDuration9] = useState(null);
  const [substance9, setSubstance9] = useState("");

  // SET OPTION 10
  const [time10, setTime10] = useState("");
  const [duration10, onChangeDuration10] = useState(null);
  const [substance10, setSubstance10] = useState("");

  // POST SCHEDULE
  const sendSchedule = (dateList, allTime,allDuration, allSubstance) => {
    axios
      .post(post,{
      // .post('http://139.59.109.48/api/setSchedule/manong',{
      // .post('http://192.168.0.20:5000/api/setSchedule/manong/',{
        params:{
          date:dateList,
          time: allTime,
          duration: allDuration,
          substance:allSubstance
        }
      })
      .then(function (response) {
        alert(response.data)
        if(response.data == 'Success'){
          setTime1("")
          setTime2("")
          setTime3("")
          setTime4("")
          setTime5("")
          setTime6("")
          setTime7("")
          setTime8("")
          setTime9("")
          setTime10("")

          onChangeDuration1("")
          onChangeDuration2("")
          onChangeDuration3("")
          onChangeDuration4("")
          onChangeDuration5("")
          onChangeDuration6("")
          onChangeDuration7("")
          onChangeDuration8("")
          onChangeDuration9("")
          onChangeDuration10("")

          setSubstance1("")
          setSubstance2("")
          setSubstance3("")
          setSubstance4("")
          setSubstance5("")
          setSubstance6("")
          setSubstance7("")
          setSubstance8("")
          setSubstance9("")
          setSubstance10("")

          setDate({
            date: null,
            focus: 'startDate',
            startDate: null,
            endDate: null
          })
          getSchedule()
        }
        // let arrayData =response.data
        // setChartDataDaily(arrayData)
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

  const isDateBlocked = (date) =>
    date.isBefore(moment(), 'day');
    const onDatesChange = ({ startDate, endDate, focusedInput }) =>{
    setDate({ ...date, focus: focusedInput,startDate: startDate, endDate:endDate }
    )
  };

  return (

    <ScrollView style={{backgroundColor:'#141414', flex:1}}>
      <View style={{paddingTop: 10,paddingLeft:10}}>
        <Text style={{color:'white'}}>
          SCHEDULE
        </Text>
      </View>
      <View style={{padding: 10,}}>
        <Text style={{color:'white', textAlign: 'justify',}}>
          Please select date/s that has not been set in the schedule before (refer table below). Then choose time (24 hour format), duration (minute) and substance in the input slot.
        </Text>
      </View>
      <View style={{marginHorizontal:40, marginBottom:20, marginTop:10, borderRadius:20, overflow:'hidden'}}>
      <Dates
          onDatesChange={onDatesChange}
          // isDateBlocked={{}}
          isDateBlocked={isDateBlocked}
          startDate={date.startDate}
          endDate={date.endDate}
          focusedInput={date.focus}
          range
        />
      </View>
<View>

<View style={{height:250, marginHorizontal:30, paddingTop:10, marginBottom:20,backgroundColor:"#1B1B1B", }}>
<ScrollView nestedScrollEnabled>
        <Table borderStyle={{borderWidth: 2, borderColor: 'gray'}}>
            <Row data={data.tableHead} style={styles.head} textStyle={styles.text}/>
            {/* <Rows data={tableSchedule} textStyle={styles.text2}/> */}
            
            { rowDate }
            
          </Table>
          </ScrollView>
      </View>

{/* <TableSchedule navigation={navigation}/> */}
  </View>

        <View style={{backgroundColor:'#1B1B1B', paddingTop:10}}>
          
          {/* INPUT 1 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>1)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time1}
              onChangeText={text => {
                setTime1(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration1}
            value={duration1}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance1}
                onValueChange={(value) => {
                setSubstance1(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 2 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>2)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time2}
              onChangeText={text => {
                setTime2(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration2}
            value={duration2}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance2}
                onValueChange={(value) => {
                setSubstance2(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 3 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>3)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time3}
              onChangeText={text => {
                setTime3(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration3}
            value={duration3}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance3}
                onValueChange={(value) => {
                setSubstance3(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
        
          {/* INPUT 4 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>4)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time4}
              onChangeText={text => {
                setTime4(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration4}
            value={duration4}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance4}
                onValueChange={(value) => {
                setSubstance4(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 5 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>5)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time5}
              onChangeText={text => {
                setTime5(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration5}
            value={duration5}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance5}
                onValueChange={(value) => {
                setSubstance5(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 6 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>6)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time6}
              onChangeText={text => {
                setTime6(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration6}
            value={duration6}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance6}
                onValueChange={(value) => {
                setSubstance6(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 7 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>7)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time7}
              onChangeText={text => {
                setTime7(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration7}
            value={duration7}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance7}
                onValueChange={(value) => {
                setSubstance7(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 8 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>8)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time8}
              onChangeText={text => {
                setTime8(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration8}
            value={duration8}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance8}
                onValueChange={(value) => {
                setSubstance8(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 9 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>9)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time9}
              onChangeText={text => {
                setTime9(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration9}
            value={duration9}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance9}
                onValueChange={(value) => {
                setSubstance9(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
    
          {/* INPUT 10 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"7%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>10)</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInputMask
              textAlign="center"
              placeholder={'Time'}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              value={time10}
              onChangeText={text => {
                setTime10(text)
              }}
              style={{height:"100%"}}
            />
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            <TextInput
            onChangeText={onChangeDuration10}
            value={duration10}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          />
            </View>
            <View style={{backgroundColor:'white',width:"35%", borderRadius:5, height:40, justifyContent:'center'}}>
              <RNPickerSelect
                value={substance10}
                onValueChange={(value) => {
                setSubstance10(value)}
                }
                items={[
                  { label: 'Water', value: 'water' },
                  { label: 'Fertilizer', value: 'fertilizer' },
                  ]}
                style={{height:"100%",textAlign:"center"}, {inputAndroid: {color: 'black', paddingLeft:10} }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
    
            </View>
            
            <View style={{ justifyContent:'center', alignItems:'center', marginBottom:10,marginTop:5}}>
            <TouchableOpacity
            //  hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}        
            onPress={() => {
              // console.log('here')
              dateList = getDatesBetweenDates(date.startDate, date.endDate)
              if(dateList[0]=="Invalid date"){
                alert("Please select valid date");
                return;
              }
              setAllTime([])
              setAllDuration([])
              setAllSubstance([])
    
              if(time1 !="" && moment(time1,"HH:mm", true).isValid()){
    
                if(duration1<1 || duration1.includes("-")){
                  alert("Please select valid duration (integer number).");
                  return;
                }
                if(!substance1){
                  alert("Please select valid substance.");
                  return;
                }
                allTime.push(time1)
                allDuration.push(duration1)
                allSubstance.push(substance1)
    
                if(time2){
                  if(duration2<1 || duration2.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance2){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time2)
                  allDuration.push(duration2)
                  allSubstance.push(substance2)
                }
    
                if(time3){
                  if(duration3<1 || duration3.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance3){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time3)
                  allDuration.push(duration3)
                  allSubstance.push(substance3)
                }
    
                if(time4){
                  if(duration4<1 || duration4.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance4){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time4)
                  allDuration.push(duration4)
                  allSubstance.push(substance4)
                }
    
                if(time5){
                  if(duration5<1 || duration5.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance5){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time5)
                  allDuration.push(duration5)
                  allSubstance.push(substance5)
                }
    
                if(time6){
                  if(duration6<1 || duration6.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance6){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time6)
                  allDuration.push(duration6)
                  allSubstance.push(substance6)
                }
    
                if(time7){
                  if(duration7<1 || duration7.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance7){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time7)
                  allDuration.push(duration7)
                  allSubstance.push(substance7)
                }
    
                if(time8){
                  if(duration8<1 || duration8.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance8){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time8)
                  allDuration.push(duration8)
                  allSubstance.push(substance8)
                }
    
                if(time9){
                  if(duration9<1 || duration9.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance9){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time9)
                  allDuration.push(duration9)
                  allSubstance.push(substance9)
                }
    
                if(time10){
                  if(duration10<1 || duration4.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance10){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time10)
                  allDuration.push(duration10)
                  allSubstance.push(substance10)
                }
                sendSchedule(dateList,allTime,allDuration,allSubstance)
                
              }else{
                alert("Please input valid time")
              }
            }}>
            <Button
            title="Set Schedule"
            color="#19A78B"
            onPress={() => {
              // console.log('here')
              dateList = getDatesBetweenDates(date.startDate, date.endDate)
              if(dateList[0]=="Invalid date"){
                alert("Please select valid date");
                return;
              }
              setAllTime([])
              setAllDuration([])
              setAllSubstance([])
    
              if(time1 !="" && moment(time1,"HH:mm", true).isValid()){
    
                if(duration1<1 || duration1.includes("-")){
                  alert("Please select valid duration (integer number).");
                  return;
                }
                if(!substance1){
                  alert("Please select valid substance.");
                  return;
                }
                allTime.push(time1)
                allDuration.push(duration1)
                allSubstance.push(substance1)
    
                if(time2){
                  if(duration2<1 || duration2.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance2){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time2)
                  allDuration.push(duration2)
                  allSubstance.push(substance2)
                }
    
                if(time3){
                  if(duration3<1 || duration3.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance3){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time3)
                  allDuration.push(duration3)
                  allSubstance.push(substance3)
                }
    
                if(time4){
                  if(duration4<1 || duration4.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance4){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time4)
                  allDuration.push(duration4)
                  allSubstance.push(substance4)
                }
    
                if(time5){
                  if(duration5<1 || duration5.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance5){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time5)
                  allDuration.push(duration5)
                  allSubstance.push(substance5)
                }
    
                if(time6){
                  if(duration6<1 || duration6.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance6){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time6)
                  allDuration.push(duration6)
                  allSubstance.push(substance6)
                }
    
                if(time7){
                  if(duration7<1 || duration7.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance7){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time7)
                  allDuration.push(duration7)
                  allSubstance.push(substance7)
                }
    
                if(time8){
                  if(duration8<1 || duration8.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance8){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time8)
                  allDuration.push(duration8)
                  allSubstance.push(substance8)
                }
    
                if(time9){
                  if(duration9<1 || duration9.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance9){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time9)
                  allDuration.push(duration9)
                  allSubstance.push(substance9)
                }
    
                if(time10){
                  if(duration10<1 || duration4.includes("-")){
                    alert("Please select valid duration (integer number).");
                    return;
                  }
                  if(!substance10){
                    alert("Please select valid substance.");
                    return;
                  }
                  allTime.push(time10)
                  allDuration.push(duration10)
                  allSubstance.push(substance10)
                }
                sendSchedule(dateList,allTime,allDuration,allSubstance)
                
              }else{
                alert("Please input valid time")
              }
            }}
          />
          </TouchableOpacity>
              </View>
              
          </View>

    </ScrollView>
  );
}

export default function ScheduleStackScreen() {
  return (
    <ControlStack.Navigator>
      <ControlStack.Screen name="Control" component={ScheduleScreen} 
      options={{
        title: 'Smart Fertigation Dashboard',
        headerStyle: {
          backgroundColor: '#141414',
          height: Platform.OS === 'android' ? 70 : 90,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize:Platform.OS === 'android' ? 14 : 16,
          alignSelf:'center'
        },
        header: () => (
          <SafeAreaView
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop:Platform.OS === 'android' ? 40 : 50,
              height: Platform.OS === 'android' ? 80 : 80,
              backgroundColor: '#141414',
              borderBottomColor:"#444444",
              borderBottomWidth:1
            }}>
            <Image
              style={{width:20,
              height:20, marginRight:10}}
              source={require('../assets/Nex-plex.png')}
            />
            <Text style={{color:"#ffffff", fontSize:Platform.OS === 'android' ? 16 : 17,fontWeight:'bold'}}>SMART FERTIGATION DASHBOARD</Text>
          </SafeAreaView>
        ),
      }}/>
    </ControlStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexGrow: 1,
    marginTop: 20
  },
  date: {
    marginTop: 50,
    color:'white',
  },
  focused: {
    color: 'blue',
    
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  pickerItem: {
    color: 'red'
  },
  container2: {  padding: 16, paddingTop: 10, backgroundColor: 'transparent' },
  head: { height: 40, backgroundColor: "#19A78B" },
  text: { margin: 6 ,color:'white'},
  text2:{
    margin: 8 ,
    color:'white'
  }
});
 