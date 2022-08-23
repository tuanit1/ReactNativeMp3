import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createConstant } from '../utils/Constant';
import Icon from 'react-native-vector-icons/Feather';
import SearchScreen from '../screens/Main/SearchScreen';
import InfoScreen from '../screens/Main/InfoScreen';
import { main_color } from '../assets/colors';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

const Constant = createConstant();
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName={Constant.HOME_SCREEN}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: main_color,
                    borderTopWidth: HEIGHT * 0.0015,
                    height: HEIGHT * 0.07,
                    paddingHorizontal: HEIGHT * 0.05,
                    backgroundColor: 'black'
                },
                tabBarLabelPosition: 'below-icon',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {

                    let iconName;
                    const iconColor = focused ? main_color : '#195a19';
                    const iconSize = focused ? HEIGHT * 0.032 : HEIGHT * 0.025;

                    switch (route.name) {
                        case "HomeStack":
                            iconName = "home";
                            break;
                        case "SearchStack":
                            iconName = "search";
                            break;
                        case Constant.INFO_SCREEN:
                            iconName = "user";
                            break;
                    }

                    return <Icon name={iconName} color={iconColor} size={iconSize} />
                }
            })}>
            <Tab.Screen name={"HomeStack"} component={HomeStack} />
            <Tab.Screen name={"SearchStack"} component={SearchStack} />
            <Tab.Screen name={Constant.INFO_SCREEN} component={InfoScreen} />
        </Tab.Navigator>

    )
}

export default BottomNavigation