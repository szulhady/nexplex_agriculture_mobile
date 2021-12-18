import React, { useReducer,useMemo } from 'react';
import TabNavigator from './navigator/TabNavigator2'
import LoginNavigation from './navigator/LoginNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './component/Context'

export default function App() {

  const initialLoginState = {
    isLoading: true,
    user_id: null,
    username: null,
    station: null,
    station_name:null,
    topic_mqtt: null,
    get_schedule: null,
    get_schedule_nutrient: null,
    post_schedule: null,
    post_schedule_nutrient: null,
    delete_schedule: null,
    delete_schedule_nutrient: null,
    token: null,
    server_mqtt:null
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          user_id: action.user_id,
          username: action.username,
          station: action.station,
          station_name:action.station_name,
          topic_mqtt: action.topic_mqtt,
          get_schedule: action.get_schedule,
          get_schedule_nutrient: action.get_schedule_nutrient,
          post_schedule: action.post_schedule,
          post_schedule_nutrient: action.post_schedule_nutrient,
          delete_schedule: action.delete_schedule,
          delete_schedule_nutrient: action.delete_schedule_nutrient,
          token: action.token,
          isLoading: false,
          server_mqtt: action.server_mqtt
        };
      case 'LOGIN': 

        return {
          ...prevState,
          user_id: action.user_id,
          username: action.username,
          station: action.station,
          station_name:action.station_name,
          topic_mqtt: action.topic_mqtt,
          get_schedule: action.get_schedule,
          get_schedule_nutrient: action.get_schedule_nutrient,
          post_schedule: action.post_schedule,
          post_schedule_nutrient: action.post_schedule_nutrient,
          delete_schedule: action.delete_schedule,
          delete_schedule_nutrient: action.delete_schedule_nutrient,
          token: action.token,
          isLoading: false,
          server_mqtt:action.server_mqtt
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          user_id: null,
          username: null,
          station: null,
          station_name:null,
          topic_mqtt: null,
          get_schedule: null,
          get_schedule_nutrient: null,
          post_schedule: null,
          post_schedule_nutrient: null,
          delete_schedule: null,
          delete_schedule_nutrient: null,
          token: null,
          server_mqtt:null
        };
      case 'REGISTER': 
        return {
          ...prevState,
          username: action.id,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      console.log(foundUser)

      const { user_id, username, station,station_name, topic_mqtt, get_schedule,get_schedule_nutrient,post_schedule,post_schedule_nutrient,delete_schedule,delete_schedule_nutrient, token, server_mqtt } = foundUser
      if( token!=='error'){
        try {
         const items = {'user_id':user_id, 'username':username, 'station':station, 'station_name':station_name,'topic_mqtt': topic_mqtt, 'get_schedule': get_schedule,"get_schedule_nutrient":get_schedule_nutrient, "post_schedule":post_schedule,'post_schedule_nutrient':post_schedule_nutrient, 'delete_schedule':delete_schedule, 'delete_schedule_nutrient':delete_schedule_nutrient, 'token':token, 
        'server_mqtt':server_mqtt }
         await AsyncStorage.setItem('user', JSON.stringify(items)) 

         dispatch({ type: 'LOGIN', user_id:user_id, username:username, station:station, station_name:station_name,topic_mqtt:topic_mqtt, get_schedule: get_schedule,get_schedule_nutrient:get_schedule_nutrient,post_schedule:post_schedule,post_schedule_nutrient:post_schedule_nutrient,delete_schedule:delete_schedule,delete_schedule_nutrient:delete_schedule_nutrient,token: token, server_mqtt:server_mqtt});

        } catch(e) {
          console.log(e);
        }
      }
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('user');
      } catch(e) {
        console.log(e);
      }
      // client.end()
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
  }), []);

  return (
      
      <AuthContext.Provider value={authContext}>
      {loginState.token !== null  ?
      <TabNavigator/>
      :
        <LoginNavigation/>
    }  
    </AuthContext.Provider>

  );
}
