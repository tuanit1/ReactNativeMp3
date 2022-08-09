import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { main_color, text_color } from "../assets/colors";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;


const FormButton = ({ title, clickListener }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={clickListener}>
            <Text style={{
                color: '#081908',
                fontSize: HEIGHT * 0.025,
                fontWeight: 'bold'
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT * 0.08,
        width: WIDTH * 0.85,
        paddingHorizontal: WIDTH * 0.03,
        backgroundColor: main_color,
        borderRadius: HEIGHT * 0.022,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    }
})

export default FormButton;