import React, { useState, useEffect } from 'react';
import { Text, View, Platform, Image, SafeAreaView ,ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { LinearGradient } from 'expo-linear-gradient';
const HomeStack = createStackNavigator();
import ContentSoilIpah1 from '../component/ipah1/ContentSoilIpah1'
import ContentNutrientHouseIpah1 from '../component/ipah1/ContentNutrientHouseIpah1'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements/dist/buttons/Button';
import AuthContext  from '../component/Context';


function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);
  const [usernameDisplay,setUsernameDisplay] = useState("")
  const [stationDisplay,setStationDisplay] = useState("")
  
  useEffect(() => {
    displayData = async ()=>{  
      try{  
        let user = await AsyncStorage.getItem('user');  
        let username = JSON.parse(user).username;  
        console.log('here',username) 
        let station = JSON.parse(user).station;  
        setUsernameDisplay(username.toUpperCase()) 
        setStationDisplay(station.toUpperCase()) 
      }  
      catch(error){  
        alert(error)  
      } 
  
    }  
    displayData()
  }, [])

  return (
    <ScrollView  style={{ flex: 1, backgroundColor:'#141414' }}>
      <View style={{flexDirection:'column', marginTop:5, justifyContent:'center'}}>
        <View style={{alignItems:'center', paddingVertical:10}}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#115757', '#07a6a6']}
            style={{width:'86%',height:120, backgroundColor:'#19A78B', justifyContent:'flex-end', paddingBottom:10, paddingLeft:15, borderRadius:10}}
            >
            <Text style={{color:'white', fontSize:18, fontWeight:'bold', paddingBottom:5}}>{usernameDisplay}</Text>
            <Text style={{color:'white', fontSize:18}}>{stationDisplay}</Text>
            <Image
                style={{width: 150,
                  height: 100, borderRadius:10, position:'absolute', right:10, top:10}}            
                  source={require('../assets/jabatanPertanianLogo.png')}
                resizeMode="cover"
              />
          </LinearGradient>
        </View>
      <ContentSoilIpah1/>
      <ContentNutrientHouseIpah1/>
      <View>
        
      <TouchableOpacity  onPress={() => signOut()}
              title="Info"
              color="#fff"
              style={{flexDirection:'row', backgroundColor:'#115757', justifyContent:'center', alignItems:"center", marginHorizontal:100, borderRadius:10, marginBottom:20}}>
                <Text style={{color:"white", paddingLeft:20}}>Sign Out</Text>
            <View style={{paddingLeft:20}}>
            <Ionicons name="log-out" size={25} color={"white"} />
            </View>
            </TouchableOpacity>
        </View>    
   </View>
    </ScrollView >
  );
}

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} 
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
              alignItems:"center",
              paddingTop:Platform.OS === 'android' ? 40 : 50,
              // paddingBottom:Platform.OS === 'android' ? 10 : 15,
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
    </HomeStack.Navigator>
  );
}