import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { createConstant } from '../utils/Constant'
import { main_color } from '../assets/colors';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;

const Progressbar = () => {
    return (
        <View style={styles.view_progress}>
            <ActivityIndicator
                size={HEIGHT * 0.06}
                color={main_color}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view_progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Progressbar;