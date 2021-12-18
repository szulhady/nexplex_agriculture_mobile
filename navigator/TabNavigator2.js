import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT SCREEN FOR TAB NAVIGATOR
import HomeStackScreen from '../screen/HomeScreen';
import TrendsStackScreen from '../screen/TrendsScreen';
import ControlStackScreen from '../screen/ControlScreen';
import ScheduleStackScreen from '../screen/ScheduleScreen';
import TableStackScreen from '../screen/TableScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator   
      tabBarOptions={{
        labelStyle: {
          padding: 1,       
        },
        style:{
          backgroundColor:'#141414',
          elevation:10
        },
        activeTintColor:'#19A78B',
        inactiveTintColor:'#A0A0A0',
      }}
      screenOptions={({route})=>({
        tabBarIcon:({focused,color, size})=>{
         let iconName;
         if (route.name=='Home') { 
          iconName='ios-home' 
         }else if(route.name=='Trends'){
          // iconName='heart'
          iconName='ios-trending-up'
         }else if(route.name=="Control"){
           iconName="ios-apps"
         }
         else if(route.name=="Dripping"){
          iconName="ios-water"
        }
         else if(route.name=="Dosing"){
          iconName="ios-beaker"
        }
    
        return <Ionicons name={iconName} size={size} color={color} />
        }
       }
       )}
   
      >
        <Tab.Screen name="Home" component={HomeStackScreen} 
        />
        {/* <Tab.Screen name="Trends" component={TrendsStackScreen} /> */}
        <Tab.Screen name="Control" component={ControlStackScreen} />
        <Tab.Screen name="Dripping" component={ScheduleStackScreen} />
        <Tab.Screen name="Dosing" component={TableStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
