// import React from 'react';
import {Dimensions} from 'react-native'

export const createConstant = () => {
    let constant = {}
    constant.HEIGHT = Dimensions.get("window").height;
    constant.WIDTH = Dimensions.get("window").width;
    constant.WEB_CLIENT_ID = "334290680991-uc7nk64uor2oqk4sq68ajmibsakrco0u.apps.googleusercontent.com";
    constant.API_URL = "http://192.168.1.10/ReactNativeMp3/api/";

    //screen strings
    constant.WELCOME_SCREEN = "WELCOME_SCREEN";
    constant.LOGIN_SCREEN = "LOGIN_SCREEN";
    constant.SIGNUP_SCREEN = "SIGNUP_SCREEN";
    constant.HOME_SCREEN = "HOME_SCREEN";
    constant.INFO_SCREEN = "INFO_SCREEN";
    constant.SEARCH_SCREEN = "SEARCH_SCREEN";

    return constant;
} 

