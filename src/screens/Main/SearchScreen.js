import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { bg_color } from '../../assets/colors';

const SearchScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Search Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bg_color,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchScreen;