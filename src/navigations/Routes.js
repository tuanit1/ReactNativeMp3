import React, { useState, useEffect, useContext, memo } from "react"
import { AuthContext } from "../providers/AuthProvider"
import auth from '@react-native-firebase/auth'
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "../navigations/AuthStack"
import { View, Text, Button } from "react-native"
import firestore from '@react-native-firebase/firestore';

import InitProfileScreen from "../screens/Auths/InitProfileScreen"


const Welcome = () => {
    const { user, logout } = useContext(AuthContext);

    console.log("main screen re-render")

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
        }}>
            <Text style={{ color: 'black' }}>Welcome {user ? user.email : "anonymous user"}</Text>
            <Button
                onPress={logout}
                title="Log out"
            />
        </View>
    )
}

const Routes = () => {

    const { user, setUser, skip, createProfile, setCreateProfile } = useContext(AuthContext);

    const [initializing, setInitializing] = useState(true);

    const checkFirstSignin = async (uid) => {
        const fsUser = await firestore().collection('users').doc(uid).get();
        return fsUser.exists;
    }

    const onAuthStateChanged = (user) => {

        if (user) {

            console.log("onAuthStateChanged", user.uid)
            console.log("createProfile:", createProfile)

            checkFirstSignin(user.uid).then((isExist) => {
                console.log("Is first login: ", !isExist);

                if (!isExist) {
                    setCreateProfile(true);
                }

                setUser(user);
            })

        } else {
            setUser(user);
        }

        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        console.log("call useEffect()")
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;


    console.log("Routes re-render: ", user)

    return (


        <NavigationContainer>

            {user && createProfile ? <InitProfileScreen />
                : user || skip ? <Welcome /> : <AuthStack />
            }

        </NavigationContainer>

    );
}

export default memo(Routes);