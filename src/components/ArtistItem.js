import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createConstant } from '../utils/Constant';
import { text_color } from '../assets/colors';
import Icon from 'react-native-vector-icons/Feather';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const ArtistItem = ({ item, isLast }) => {

    return (
        <TouchableOpacity style={{
            ...styles.container,
            marginEnd: isLast ? WIDTH * 0.05 : 0,
        }}>


            <Image
                style={styles.image}
                source={{ uri: item.url }}
                resizeMode='cover'

            />

            <Text style={styles.title}
                ellipsizeMode='tail'
                numberOfLines={1}>
                {item.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: HEIGHT * 0.19,
        marginLeft: WIDTH * 0.05,
        alignItems: 'center'
    },

    image: {
        height: HEIGHT * 0.19,
        width: HEIGHT * 0.19,
        borderRadius: HEIGHT * 0.4,
    },

    title: {
        color: 'white',
        fontSize: HEIGHT * 0.02,
        marginTop: HEIGHT * 0.007
    }
})

export default ArtistItem