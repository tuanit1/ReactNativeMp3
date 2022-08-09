import React, { useState } from 'react';
import {
    View, StyleSheet, TextInput, Dimensions,
    Image, TouchableOpacity
} from 'react-native';

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const FormInput = ({ isPassword, placeholder, ...rest }) => {

    const [showPass, setShowPass] = useState(!isPassword);

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder= {placeholder}
                placeholderTextColor="#5C5A59"
                selectionColor="#5C5A59"
                secureTextEntry={ showPass ? false : true}
                {...rest}
            />

            {isPassword &&
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <Image style={styles.toggle}
                        source={showPass ? require('../assets/icons/ic_show.png') : require('../assets/icons/ic_hide.png')}
                        resizeMode="center"
                        tintColor="#595959" />
                </TouchableOpacity>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: HEIGHT * 0.08,
        width: WIDTH * 0.85,
        paddingHorizontal: WIDTH * 0.035,
        marginVertical: HEIGHT * 0.01,
        backgroundColor: '#E7E7E7',
        borderRadius: HEIGHT * 0.022,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },

    input: {
        flex: 1,
        fontSize: HEIGHT * 0.022,
        color: 'black'
    },

    toggle: {
        height: HEIGHT * 0.03,
        width: HEIGHT * 0.03,
    }


})

export default FormInput;