import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import auth from '@react-native-firebase/auth'
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "../navigations/AuthStack"
import { View, Text, Button } from "react-native"

const Welcome = () => {
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
            <Text>Welcome {user ? user.email : "anonymous user"}</Text>
            <Button
                onPress={logout}
                title="Log out"
            />
        </View>
    )
}

const Routes = () => {
    const { user, setUser, skip } = useContext(AuthContext);

    console.log('skip: ', skip)

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
            {user || skip ?  <Welcome/> : <AuthStack />}
        </NavigationContainer>

    );
}

export default Routes;