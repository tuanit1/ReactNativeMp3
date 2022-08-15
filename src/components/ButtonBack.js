import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { createConstant } from '../utils/Constant';
import { text_color } from '../assets/colors'

const Constant = createConstant()


const ButtonBack = ({ navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.container}>
            <Image resizeMode='center' style={styles.image} source={require('../assets/icons/ic_back.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        top: Constant.HEIGHT * 0.03,
        left: Constant.HEIGHT * 0.03
    },

    image: {
        height: Constant.HEIGHT * 0.05,
        width: Constant.HEIGHT * 0.05,
        tintColor: text_color
    }
})

export default ButtonBack