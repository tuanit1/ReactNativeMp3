import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createConstant } from '../utils/Constant';
import { text_color } from '../assets/colors';
import Icon from 'react-native-vector-icons/Feather';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const GenreItem = ({ item, isLast, clickListener }) => {

    return (
        <TouchableOpacity

            onPress={clickListener}

            style={{
                ...styles.container,
                marginEnd: isLast ? WIDTH * 0.05 : 0,
            }}>

            <Image
                style={styles.image}
                source={{ uri: item.url }}
                resizeMode='cover'

            />

            <View style={styles.foreground}>
                <Text style={styles.title}
                    ellipsizeMode='tail'
                    numberOfLines={2}>
                    {item.title}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: HEIGHT * 0.2,
        marginLeft: WIDTH * 0.05,
    },

    foreground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        borderRadius: HEIGHT * 0.022,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        height: HEIGHT * 0.13,
        width: '100%',
        borderRadius: HEIGHT * 0.022,
    },

    title: {
        color: 'white',
        fontSize: HEIGHT * 0.027,
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: WIDTH * 0.04
    }
})

export default GenreItem