import React, { useState, useEffect } from 'react';
import { Text, View, Platform, Image, Alert ,TextInput, StyleSheet, SafeAreaView, Button ,ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Table, Row } from 'react-native-table-component';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';

import { TextInputMask } from 'react-native-masked-text'

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
      get = JSON.parse(user).get_schedule_nutrient;  
      post = JSON.parse(user).post_schedule_nutrient;  
      deleteData = JSON.parse(user).delete_schedule_nutrient;  
      // alert(JSON.parse(user).get_schedule);  
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
      // .get('http://139.59.109.48/api/schedule/manong/nutrient')
      .get(get)
      // .get('http://192.168.0.20:5000/api/schedule/manong/nutrient')
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
    // axios.delete('http://139.59.109.48/api/schedule/manong/nutrient',{
    axios.delete(deleteData,{
    // axios.delete('http://192.168.0.20:5000/api/schedule/manong/nutrient',{
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
  const [allEC, setAllEC] = useState([])
  // const [allDuration, setAllDuration] = useState([])

  // SET OPTION 1
  const [ec, onChangeEc] = useState(null);

  // POST SCHEDULE
  const sendSchedule = (dateList, allEC) => {
    axios
      // .post('http://139.59.109.48/api/setSchedule/manong/nutrient',{
      .post(post,{
      // .post('http://192.168.0.20:5000/api/setSchedule/manong/nutrient',{
        params:{
          date:dateList,
          ec: allEC,
        }
      })
      .then(function (response) {
        alert(response.data)
        if(response.data == 'Success'){
          
          onChangeEc("")

          setDate({
            date: null,
            focus: 'startDate',
            startDate: null,
            endDate: null
          })
          getSchedule()
        }
      
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
          Please select date/s that has not been set in the schedule before (refer table below). Then choose EC value in the input slot.
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

<View style={{height:250, overflow:"hidden", marginHorizontal:30, paddingTop:10, marginBottom:20,backgroundColor:"#1B1B1B"}}>
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
      <ListItem.Accordion  topDivider
        containerStyle={{backgroundColor: '#1B1B1B', paddingVertical:15}}
        content={
          <>
          <Icon name='keyboard' type='font-awesome-5' size={20} color="#19A78B" style={{paddingRight:15}}/>
          <ListItem.Content >
            <ListItem.Title style={{color:'white'}}>Input Slot</ListItem.Title>
          </ListItem.Content >
        </>
      }
        isExpanded={input}
        onPress={() => {
          setExpandedInput(!input);
        }}
      >
        {
          input==true ?
          <View style={{backgroundColor:'#1B1B1B', paddingTop:10}}>
          
          {/* INPUT 1 */}
          <View style={{ width:"90%", flexDirection:'row', justifyContent:'space-between', alignItems:"center", marginBottom:20, marginHorizontal:10}}>
            <View style={{width:"65%"}}>
              <Text textAlign={'center'} style={{color:'white'}}>
                Default time for nutrient preparation process on selected date is on 5am. Please select date and EC value ( eg: 1.00 ) for dosing process.</Text>
            </View>
            <View style={{backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
            {/* <TextInput
            onChangeText={onChangeDuration1}
            value={duration1}
            placeholder="Duration"
            placeholderTextColor="#999" 
            keyboardType="numeric"
            color='black'
            textAlign={'center'}
            style={{height:"100%"}}
          /> */}
              <TextInputMask
              textAlign="center"
              onChangeText={onChangeEc}
              placeholder={'EC value'}
              type={'custom'}
              options={{
                mask: '9.99'
              }}
              value={ec}
              // onChangeText={text => {
              //   setTime1(text)
              // }}
              style={{height:"100%"}}
            />
            </View>
          </View>
    
            <View style={{ justifyContent:'center', alignItems:'center', marginBottom:10}}>
            <Button
            title="Set Schedule"
            color="#19A78B"
            onPress={() => {
              dateList = getDatesBetweenDates(date.startDate, date.endDate)
              if(dateList[0]=="Invalid date"){
                alert("Please select valid date");
                return;
              }
              setAllEC([])
    
              if(ec !=""){
    
                if(ec.length!=4){
                // if(ec<1 || ec.includes("-")){
                  alert("Please select valid EC value (eg:1.00).");
                  return;
                }
                allEC.push(ec)
                sendSchedule(dateList,allEC)
                
              }else{
                alert("Please input valid time")
              }
            }}
          />
              </View>

          </View>
          : <View></View>
        }

        </ListItem.Accordion>


        {/* <ListItem.Accordion  topDivider
        containerStyle={{backgroundColor: '#1B1B1B', paddingVertical:15, marginTop:20}}
        content={
          <>
          <Icon name='calendar-alt' type='font-awesome-5' size={20} color="#19A78B" style={{paddingRight:20}}/>
          <ListItem.Content >
            <ListItem.Title style={{color:'white'}}>Schedule</ListItem.Title>
          </ListItem.Content >
        </>
      }
        isExpanded={expandedTable}
        onPress={() => {
          setExpandedTable(!expandedTable);
        }}
      >

          <TableSchedule navigation={navigation}/>
        </ListItem.Accordion> */}

    {/* <TableSchedule navigation={navigation}/> */}
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
 