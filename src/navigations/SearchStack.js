import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../screens/Main/SearchScreen';
import PlaylistDetailScreen from '../screens/Main/PlaylistDetailScreen';
import { createConstant } from '../utils/Constant';

const Constant = createConstant();

const Stack = createNativeStackNavigator()

const SearchStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={Constant.SEARCH_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={Constant.SEARCH_SCREEN} component={SearchScreen} />
            <Stack.Screen name={Constant.PLAYLISTDETAILS_SCREEN} component={PlaylistDetailScreen} />
        </Stack.Navigator>
    )
}

export default SearchStack;