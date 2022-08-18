import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Main/HomeScreen';
import PlaylistDetailScreen from '../screens/Main/PlaylistDetailScreen';
import { createConstant } from '../utils/Constant';

const Constant = createConstant();

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={Constant.HOME_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={Constant.HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen name={Constant.PLAYLISTDETAILS_SCREEN} component={PlaylistDetailScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack