import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createConstant } from '../utils/Constant';
import { text_color } from '../assets/colors';
import Icon from 'react-native-vector-icons/Feather';
import { main_color } from '../assets/colors';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const SongItem = ({ url, song_name, artist_name, ...rest }) => {

    return (
        <TouchableOpacity style={styles.container} {...rest}>

            <Image
                style={styles.image}
                source={{ uri: url }}
                resizeMode='cover'
            />

            <View style={styles.view_text}>
                <Text style={{
                    color: 'white',
                    fontSize: HEIGHT * 0.023,
                    marginBottom: HEIGHT * 0.005,
                }}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >
                    {song_name}
                </Text>

                <Text style={{
                    color: '#999999',
                    fontSize: HEIGHT * 0.018,
                }}>
                    {artist_name}
                </Text>
            </View>

            <Icon name="play" color='white' size={HEIGHT * 0.027} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: HEIGHT * 0.08,
        marginBottom: HEIGHT * 0.02,
        marginHorizontal: WIDTH * 0.055
    },

    image: {
        height: HEIGHT * 0.08,
        width: HEIGHT * 0.08,
        borderRadius: HEIGHT * 0.015,
        borderWidth: 1,
        borderColor: text_color
    },

    view_text: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: WIDTH * 0.04,
        paddingRight: WIDTH * 0.06
    },

})

export default SongItem;