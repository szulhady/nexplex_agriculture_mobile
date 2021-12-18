import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { TapGestureHandler} from 'react-native-gesture-handler'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'

import React, {useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext  from '../component/Context';

import axios from 'axios'

const { width, height } = Dimensions.get('window')

const Login =(props)=>{
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
});

const [secure, setSecure] = React.useState(true);
const [secure1, setSecure1] = React.useState(true);
const [secure2, setSecure2] = React.useState(true);

const { signIn } = React.useContext(AuthContext);

const textInputChange = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            email: val,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            email: val,
            check_textInputChange: false,
            isValidUser: false
        });
    }
}
const handlePasswordChange = (val) => {
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            password: val,
            isValidPassword: true
        });
    } else {
        setData({
            ...data,
            password: val,
            isValidPassword: false
        });
    }
}
const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}
const handleValidUser = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            isValidUser: false
        });
    }
}

const loginHandle = (email, password) => {
  let user
 const getDataAxios = async () =>{
   // const token = await axios.post('http://172.20.10.3:5000/api/auth/login',{
      // const token = await axios.post('http://192.168.0.20:5000/api/auth/mobile/login',{
      const token = await axios.post('http://159.223.55.150/api/auth/mobile/login',{
      // const token = await axios.post('http://172.20.10.3:5000/api/auth/mobile/login',{
      email:email,
      password:password
    }).then(response => {
       return response.data.token
    })
    .catch(err=>'error')
    // console.log(data1)
    if(token !=='error'){
      // user = await axios.get('http://192.168.0.20:5000/api/auth/mobile/me',{
      user = await axios.get('http://159.223.55.150/api/auth/mobile/me',{
      // user = await axios.get('http://192.168.0.20:5000/api/auth/mobile/me',{
      // user = await axios.get('http://172.20.10.3:5000/api/auth/mobile/me',{
        headers: {
          Authorization: "Bearer " + token
      }
      }).then(response=>response.data)
    }
    if(user==='error'){
      alert("Contact admin to activate product")
      return
    }
    // console.log(user)
    const foundUser = {token,...user}
    // const foundUser = {token,...user.user_id}

    if ( email.length == 0 || password.length == 0 ) {
        Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
            {text: 'Okay'}
        ]);
        return;
    }
    if ( foundUser.token === 'error'  ) {
        Alert.alert('Invalid User!', 'Username or password is incorrect.', [
            {text: 'Okay'}
        ]);
        return;
    }
    // console.log(foundUser)
    signIn(foundUser);
  }
  getDataAxios()

}

const registerHandle = (username,email, password, password2) => {
//  console.log(username,email,password,password2)
  let user
 const getDataAxios = async () =>{
    const token = await axios.post('http://159.223.55.150/api/user/mobile/register',{
    // const token = await axios.post('http://192.168.0.20:5000/api/user/mobile/register',{
    // const token = await axios.post('http://172.20.10.3:5000/api/auth/login',{
    username:username,  
    email:email,
      password:password,
      password2:password2,
      role:null
    }).then(response => {
      // alert(response.msg)
      alert(response.data[0].msg)
      if(response.data[0].msg== "Success. You can log in now"){
        setUsername("")
        setEmailRegister("")
        setPasswordRegister("")
        setPasswordRegister2("")
      }
    })
    .catch(err=>{
      alert(err.response.data.message)
  })
    // console.log(data1)
  }
  getDataAxios()

}
const opacity = useSharedValue(1);
const offset = useSharedValue(0);

const zIndexSignIn = useSharedValue(-1);
const opacitySignInForm = useSharedValue(0);

const zIndexSignUp = useSharedValue(-1);
const opacitySignUpForm = useSharedValue(0);

const space2 = useSharedValue(2);

const config = {
  duration: 1000,
  // easing: Easing.bezier(0.5, 0.01, 0, 1),
  easing: Easing.inOut(Easing.ease)
};

const buttonSignIn = useAnimatedStyle(() => {
  return {
    opacity: withTiming(opacity.value, config),
    transform: [{ translateY: withTiming(offset.value, config) }],
  };
});

const buttonSignUp = useAnimatedStyle(() => {
  return {
    opacity: withTiming(opacity.value, config),
    transform: [{ translateY: withTiming(offset.value, config) }],
  };
});

const bgY = useAnimatedStyle(() => {
  const translate = interpolate(
    opacity.value,
    [0, 1],
    [-height / space2.value - 50, 0],
    Extrapolate.CLAMP
  )
  return {
    transform: [{ translateY: withTiming(translate, config) }],
  }
})


const formSignInView = useAnimatedStyle(() => {
  const translate = interpolate(
    opacity.value,
    [0, 1],
    [0, 100],
    Extrapolate.CLAMP
  )
  return {
    zIndex: withTiming(zIndexSignIn.value, config),
    opacity: withTiming(opacitySignInForm.value, config),
    transform: [{ translateY: withTiming(translate, config) }],
  }
})

const formSignUpView = useAnimatedStyle(() => {
  const translate = interpolate(
    opacity.value,
    [0, 1],
    [0, 100],
    Extrapolate.CLAMP
  )
  return {
    zIndex: withTiming(zIndexSignUp.value, config),
    opacity: withTiming(opacitySignUpForm.value, config),
    transform: [{ translateY: withTiming(translate, config) }],
  }
})

const rotateX = useAnimatedStyle(() => {
  const rotation = interpolate(
    opacity.value,
    [0, 1],
    [180, 360],
    Extrapolate.CLAMP
  )
  return {
    transform: [{ rotate: withTiming(`${rotation}deg`, config) }],
  }
})

 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

 const [username, setUsername] = useState("")
 const [emailRegister, setEmailRegister] = useState("")
 const [passwordRegister, setPasswordRegister] = useState("")
 const [passwordRegister2, setPasswordRegister2] = useState("")

return (

  <View style={{
    ...StyleSheet.absoluteFill,
    // backgroundColor:'blue'

  }}>

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: height, justifyContent: 'flex-end', }}
    >
      <Animated.View style={[{
        ...StyleSheet.absoluteFill,
        flex: 1
      }, bgY]}>
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require('../assets/1.png')}
            height={height + 50}
            width={width}
            preserveAspectRatio='xMidyMid slice'
            clipPath='url(#clip)'
          />
        </Svg>
      </Animated.View>
      <View style={{ position: 'absolute', top: height / 12 }}>
        <Svg height={200} width={width} >
          <Image
            href={require('../assets/Nex-plex-logo-final.png')}
            height={150}
            width={width}
          />
        </Svg>
      </View>

      <View style={{ height: height / 3, justifyContent: 'center' }}>
        <TapGestureHandler onHandlerStateChange={() => {
          opacity.value = 0;
          offset.value = 200
          zIndexSignIn.value = 1
          opacitySignInForm.value = 1
          space2.value = 3
        }}>
          <Animated.View style={[styles.button, buttonSignIn]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              SIGN IN
            </Text>
          </Animated.View>
        </TapGestureHandler>
        <TapGestureHandler onHandlerStateChange={() => {
          opacity.value = 0;
          offset.value = 200
          zIndexSignUp.value = 1
          opacitySignUpForm.value = 1
          space2.value = 2
        }}>
          <Animated.View style={[{ ...styles.button, backgroundColor: '#2E71DC' }, buttonSignUp]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              SIGN UP
            </Text>
          </Animated.View>
        </TapGestureHandler>
        {/*  */}
        <Animated.View style={[{ ...StyleSheet.absoluteFill, top: null, justifyContent: 'center', height: height / 3 }, formSignInView]}>
          <TapGestureHandler onHandlerStateChange={() => {
            opacity.value = 1;
            offset.value = 0;
            zIndexSignIn.value = -1
            opacitySignInForm.value = 0
          }}>
            <Animated.View style={styles.closedButton}>
              <Animated.Text style={[{ fontSize: 15 }, rotateX]}>
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput} />
          <View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              style={styles.textInput} />
            <Icon style={{ position: 'absolute',top: 20,
              right: 40}}
              name={secure ? "eye-slash" : 'eye'}
              size={20}
              color='gray'
              onPress={() => setSecure(!secure)}
            />   
          </View>
            <TouchableOpacity onPress={()=>{
              // alert(`${email},${password}`)
              loginHandle(email,password)
            }}>
          <Animated.View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              SIGN IN
            </Text>
          </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        
        {/*  */}
        <Animated.View style={[{ ...StyleSheet.absoluteFill, top: null, justifyContent: 'center', height: height / 2 }, formSignUpView]}>
          <TapGestureHandler onHandlerStateChange={() => {
            opacity.value = 1;
            offset.value = 0;
            zIndexSignUp.value = -1
            opacitySignUpForm.value = 0
          }}>
            <Animated.View style={styles.closedButton}>
              <Animated.Text style={[{ fontSize: 15 }, rotateX]}>
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
          <TextInput
            placeholder="Username"
            placeholderTextColor="black"
            value={username}
            onChangeText={setUsername}
            style={styles.textInput} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            value={emailRegister}
            onChangeText={setEmailRegister}
            style={styles.textInput} />
            <View>
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            value={passwordRegister}
            secureTextEntry={secure1}
            onChangeText={setPasswordRegister}
            style={styles.textInput} />
            <Icon style={{ position: 'absolute',top: 20,
              right: 40}}
              name={secure1 ? "eye-slash" : 'eye'}
              size={20}
              color='gray'
              onPress={() => setSecure1(!secure1)}
            />   
            </View>
            <View>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="black"
            value={passwordRegister2}
            secureTextEntry={secure2}
            onChangeText={setPasswordRegister2}
            style={styles.textInput} />
          <Icon style={{ position: 'absolute',top: 20,
              right: 40}}
              name={secure2 ? "eye-slash" : 'eye'}
              size={20}
              color='gray'
              onPress={() => setSecure2(!secure2)}
            />   
            </View>
            <TouchableOpacity onPress={()=>registerHandle(username, emailRegister, passwordRegister, passwordRegister2)}>
          <Animated.View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              SIGN UP
            </Text>
          </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        {/*  */}
      </View>
    </KeyboardAvoidingView>
  </View >

);
}

const SignInScreen = ({navigation}) => {

    return (
<Login/>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    button: {
      backgroundColor: 'white',
      height: 50,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height: 1 },
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    closedButton: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
      left: width / 2 - 20,
      shadowOffset: { width: 2, height: 1 },
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    textInput: {
      height: 50,
      borderRadius: 25,
      borderWidth: 0.5,
      marginHorizontal: 20,
      paddingLeft: 10,
      marginVertical: 5,
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor: 'white'
    },
  });
