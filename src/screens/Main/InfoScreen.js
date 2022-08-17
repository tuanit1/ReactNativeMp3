import React, {useContext} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { bg_color } from '../../assets/colors';
import { AuthContext } from '../../providers/AuthProvider';


const InfoScreen = () => {

    const { user, logout } = useContext(AuthContext);
    
    return(
        <View style={styles.container}>
            <Text>Info Screen</Text>
            <Button
                onPress={logout}
                title="Log out"
            />
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

export default InfoScreen;