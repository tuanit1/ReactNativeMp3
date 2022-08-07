import React from 'react';
import { View, TextInput, StyleSheet, Button } from "react-native"
import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
const LoginScreen = () => {

    const { login, signup } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
        }}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                value={email}
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Password"
            />

            <Button
                title="Sign up"
                onPress={() => signup(email, password)}
            />
            <Button
                title="Login"
                onPress={() => login(email, password)}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '80%',
        margin: '2%',
        borderWidth: 1,
        padding: 10,
    },
});

export default LoginScreen;


