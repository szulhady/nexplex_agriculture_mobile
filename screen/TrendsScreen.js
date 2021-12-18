import React from 'react';
import { Text, View, Platform, Image, SafeAreaView ,ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
import ContentSoilIpahTrends from '../component/ipah1/ContentSoilIpahTrends'

function HomeScreen() {

  return (
    <ScrollView  style={{ flex: 1, backgroundColor:'#141414' }}>

    {/* SOIL */}
    <View >
      <View style={{width:'100%', marginTop:20, borderBottomColor:"#444444",}}>
        <View>
          <Text style={{color:'white', paddingLeft:20}}>SOIL SENSOR TRENDS</Text>
        </View>
        <ContentSoilIpahTrends/>
      </View>
    </View>
    </ScrollView >
  );
}

export default function TrendsStackScreen() {
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
    </HomeStack.Navigator>
  );
}