import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/Login2'
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function LoginNavigation() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          headerShown: false
          // headerLeft:()=>(
            //   <View>
            //       <TouchableOpacity onPress={() => {navigation.openDrawer()} }>
            //       <MaterialIcons name='menu' size={28}  style={styles.menuIcon}/>
            //       </TouchableOpacity>
            //     </View>   
            // )
          }}
          
          />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
