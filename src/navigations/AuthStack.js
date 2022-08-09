import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/Auths/LoginScreen';
import WelcomeScreen from '../screens/Auths/WelcomeScreen';
import { createConstant } from '../utils/Constant'

const Stack = createNativeStackNavigator()
const Constant = createConstant()

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={Constant.WELCOME_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
            >
            <Stack.Screen name={Constant.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={Constant.WELCOME_SCREEN} component={WelcomeScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;