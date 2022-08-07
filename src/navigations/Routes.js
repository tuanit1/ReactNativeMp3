import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import auth from '@react-native-firebase/auth'
import { View, Button, Text } from "react-native"
import LoginScreen from "../screens/LoginScreen"

const WelcomeScreen = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
        }}>
            <Text>Welcome { user.email }</Text>
            <Button
                onPress={logout}
                title="Log out"
            />
        </View>
    )
}

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
        <>
            {console.log("Mount component")}
            {user ? <WelcomeScreen /> : <LoginScreen />}
        </>

    );
}

export default Routes;