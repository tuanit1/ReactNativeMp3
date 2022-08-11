import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/Auths/LoginScreen';
import WelcomeScreen from '../screens/Auths/WelcomeScreen';
import SignupScreen from '../screens/Auths/SignupScreen';
import { createConstant } from '../utils/Constant'

const Stack = createNativeStackNavigator()
const Constant = createConstant()

const AuthStack = () => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Constant.WEB_CLIENT_ID
        });
    }, [])

    return (
        <Stack.Navigator
            initialRouteName={Constant.WELCOME_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={Constant.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={Constant.WELCOME_SCREEN} component={WelcomeScreen} />
            <Stack.Screen name={Constant.SIGNUP_SCREEN} component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;