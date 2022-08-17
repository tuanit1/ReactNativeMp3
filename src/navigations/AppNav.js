import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createConstant } from '../utils/Constant';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/Main/HomeScreen';
import SearchScreen from '../screens/Main/SearchScreen';
import InfoScreen from '../screens/Main/InfoScreen';
import { main_color } from '../assets/colors';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Constant = createConstant();
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const AppNav = () => {
    return (
        <Tab.Navigator
            initialRouteName={Constant.HOME_SCREEN}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: main_color,
                    borderTopWidth: HEIGHT * 0.0015,
                    height: HEIGHT * 0.09,
                    paddingHorizontal: HEIGHT * 0.05,
                    backgroundColor: 'black'
                },
                tabBarLabelPosition: 'below-icon',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {

                    let iconName;
                    const iconColor = focused ? main_color : '#195a19';
                    const iconSize = focused ? HEIGHT * 0.035 : HEIGHT * 0.03;

                    switch (route.name) {
                        case Constant.HOME_SCREEN:
                            iconName = "home";
                            break;
                        case Constant.SEARCH_SCREEN:
                            iconName = "search";
                            break;
                        case Constant.INFO_SCREEN:
                            iconName = "user";
                            break;
                    }

                    return <Icon name={iconName} color={iconColor} size={iconSize} />
                }
            })}>
            <Tab.Screen name={Constant.HOME_SCREEN} component={HomeScreen} />
            <Tab.Screen name={Constant.SEARCH_SCREEN} component={SearchScreen} />
            <Tab.Screen name={Constant.INFO_SCREEN} component={InfoScreen} />
        </Tab.Navigator>

    )
}

export default AppNav;