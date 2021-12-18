import React, { useState,useEffect } from 'react';
import { Text, View, Platform, Image,Alert,TextInput , SafeAreaView, Button ,ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-async-storage/async-storage';

var mqtt = require('@taoqf/react-native-mqtt')

var client

const ControlStack = createStackNavigator();

let topic_mqtt

function ControlScreen() {

  const [number, onChangeNumber] = useState(null);
  const [status, setStatus] = useState("System is idle")
  const [fillStop, setFillStop] = useState(null);
  const [preparation, setPreparation] = useState(null);
  const [stopPreparation, setStopPreparation] = useState(null);
  
  const [ec, onChangeEc] = useState(null);

  useEffect(()=>{
    displayData = async ()=>{  
      try{  
        let user = await AsyncStorage.getItem('user');  
        topic_mqtt = JSON.parse(user).topic_mqtt; 
        let server_mqtt = JSON.parse(user).server_mqtt; 
        setFillStop(`${topic_mqtt.slice(0,-1)}c/wf`)
        setPreparation(`${topic_mqtt.slice(0,-1)}c/n`)
        setStopPreparation(`${topic_mqtt.slice(0,-1)}c/ns`)
        client  = mqtt.connect(`${server_mqtt}`)
        client.on('connect', function(){
          console.log('connected control screen')
        })

        client.subscribe(topic_mqtt, function (err) {
          if (!err) {
            //  console.log('connected',topic_mqtt)
           }
        })

        client.on('message', function (topic, message) {
          // console.log(topic)
            if (topic === `${topic_mqtt.slice(0,-1)}s/c/new`){
              let data= JSON.parse(message.toString())
              // let data= JSON.parse(message.toString())
              console.log(data)
              if(data.WDB==1){
                setStatus('Water dripping on block')
              }
              if(data.NDB ==1){
                setStatus('Nutrient dripping on block')
              }
              if(data.NF==1){
                setStatus('Nutrient preparation. Dossing process is ongoing.')
              }
              if(data.WF==1){
                setStatus('Nutrient preparation. Water filling process in fertilizer solution tank.')
              }
              if(data.WDB ==0 && data.NDB == 0 && data.NF==0 && data.WF==0){
                setStatus('System is idle')
              }
            }
          }
        )

      }
      catch(error){  
        alert(error)  
      } 
  
    } 
    displayData()
  }, [])

  return (
  <ScrollView style={{backgroundColor:'#141414',flex: 1}}>
      <View style={{padding:10}}>
        <Text style={{color:'white'}}>STATUS</Text>
      </View>
      <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <View style={{ marginTop:5, marginBottom:10, backgroundColor:"#1A1A1A", paddingVertical:5, borderRadius:5, maxWidth:"80%", paddingHorizontal:15}}>
          <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>STATUS : {status}</Text>
        </View>
      </View>
      
      <View style={{padding:10}}>
        <Text style={{color:'white'}}>MANUAL FERTIGATION CONTROL</Text>
      </View>
      <View style={{backgroundColor:'#1B1B1B', borderTopWidth:1, borderTopColor:"#333333", paddingTop:10, marginBottom:20, paddingBottom:10, paddingHorizontal:10}}>
        <View style={{paddingLeft:15, paddingBottom:10}}>
          <Text style={{color:'white'}}>
          Water Filling for Fertilizer Solution Tank
          </Text>
        </View> 
        <View>
          <Text style={{color:'white', textAlign: 'justify',}}>
          Press FILL button to start filling water manually into fetilizer solution tank. Press STOP button to stop filling process.
          </Text>
          <View style={{display:'flex', flexDirection:"row", justifyContent:'space-evenly', marginVertical:10}}>
            <View style={{width:100}}>
              <Button
            title="Fill"
            onPress={() => {
              client.publish(fillStop,'10')
            }
            }
              color="#19A78B"
              />
            </View>
            <View style={{width:100}}>
              <Button
                title="Stop"
                onPress={() => client.publish(fillStop,'20')}
                color="#D83B28"
                />
            </View>
          </View>
        </View>
      </View>

      <View style={{backgroundColor:'#1B1B1B', borderTopWidth:1, borderTopColor:"#333333", paddingTop:10, marginBottom:20, paddingHorizontal:10}}>
    <View style={{paddingLeft:15, paddingBottom:10}}>
      <Text style={{color:"white"}}>
      Nutrient Preparation
      </Text>
    </View>
    <View>
      <Text style={{color:"white", textAlign: 'justify',}}>
      Nutrient preparation is done via schedule set by user on schedule panel. It is done on 5.00am on choosen date. Please fill EC value input and click button below to start nutrient preparation manually.
      </Text>
      <View style={{display:'flex', flexDirection:"column", alignItems:"center", justifyContent:'center', marginVertical:10, marginBottom:20}}>
      <View style={{marginBottom:15,backgroundColor:'white',width:"25%",height: 40, borderRadius:5}}>
        {/* <TextInput
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Duration (minute)"
        placeholderTextColor="#ddd" 
        keyboardType="numeric"
        color='white'
        textAlign={'center'}
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
        <View style={{display:'flex', flexDirection:"row", justifyContent:'space-evenly', marginVertical:10, width:"100%"}}>
        <View>
        <Button
        title="Start preparation"
        onPress={() => {
          // console.log(ec)
          if(ec !=null){
            if(ec.length!=4){
            // if(ec<1 || ec.includes("-")){
              alert("Please select valid EC value (eg:1.00).");
              return;
            }
          }else{
           return alert("Please input valid EC value (eg:1.00).")
          }
          client.publish(preparation,`{D1:10,D2:${ec}}`)}}
        color="#19A78B"
          />
          </View>
          <View style={{width:100}}>
              <Button
                title="Stop"
                onPress={() => client.publish(stopPreparation,'ECH,404')}
                color="#D83B28"
                />
            </View>
          </View>
      </View>
    </View>
    </View>
  </ScrollView>

  );
}

export default function ControlStackScreen() {
  return (
    <ControlStack.Navigator>
      <ControlStack.Screen name="Control" component={ControlScreen} 
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