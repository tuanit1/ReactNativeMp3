// import React from 'react';
import {Dimensions} from 'react-native'

export const createConstant = () => {
    let constant = {}
    constant.HEIGHT = Dimensions.get("window").height;
    constant.WIDTH = Dimensions.get("window").width;
    constant.WELCOME_SCREEN = "WELCOME_SCREEN";
    constant.LOGIN_SCREEN = "LOGIN_SCREEN";


    return constant;
} 

