import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import auth from '@react-native-firebase/auth'
import LoginScreen from "../screens/Auths/LoginScreen"
import WelcomeScreen from "../screens/Auths/WelcomeScreen"
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "../navigations/AuthStack"

const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    console.log("Component re-render");

    const onAuthStateChanged = (user) => {
        console.log("onAuthStateChange: ", user)
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        console.log("call useEffect()")
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (

        <NavigationContainer>
            {console.log("Mount component")}
            {user ? <AuthStack /> : <AuthStack />}
        </NavigationContainer>

    );
}

export default Routes;