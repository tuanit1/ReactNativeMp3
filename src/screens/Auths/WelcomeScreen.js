import React, { useContext } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { createConstant } from "../../utils/Constant"
import { bg_color, text_color } from "../../assets/colors";
import { AuthContext } from "../../auth/AuthProvider";

const Constant = createConstant();
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const WelcomeScreen = ({ navigation }) => {

    const { setSkip } = useContext(AuthContext)

    console.log("WelcomScreen re-render");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.img_container}>
                <Image
                    style={styles.image}
                    resizeMode='cover'
                    source={require('../../assets/icons/intro_3.jpg')}
                />
            </View>
            <View style={styles.title_container}>
                <View style={{
                    position: 'absolute',
                    top: (HEIGHT / 2) * 0.1,
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: text_color,
                        fontWeight: 'bold',
                        fontSize: HEIGHT * 0.038,
                        textAlign: 'center',
                        width: WIDTH * 0.7,
                        marginBottom: (HEIGHT / 2) * 0.05
                    }}>Discover your endless music world</Text>

                    <Text style={{
                        color: text_color,
                        fontSize: HEIGHT * 0.02,
                        textAlign: 'center',
                        width: WIDTH * 0.8
                    }}>Listen and feel the colorful world of music with a variety of genres. Let's start</Text>
                </View>


                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.btn_login}
                        onPress={() => navigation.navigate(Constant.LOGIN_SCREEN)}>
                        <Text style={{
                            color: bg_color,
                            fontWeight: 'bold',
                            fontSize: HEIGHT * 0.02,
                        }}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_skip}
                        onPress={() => setSkip(true)}>
                        <Text style={{
                            color: text_color,
                            fontWeight: 'bold',
                            fontSize: HEIGHT * 0.02,
                        }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bg_color
    },

    img_container: {
        flex: 1,
        marginHorizontal: WIDTH * 0.04,
        marginTop: WIDTH * 0.04
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: HEIGHT * 0.04,
    },

    title_container: {
        flex: 1,
        alignItems: 'center',
    },

    bottom: {
        position: 'absolute',
        flexDirection: 'row',
        top: (HEIGHT / 2) * 0.7,
        backgroundColor: '#221c27',
        width: WIDTH * 0.8,
        height: (HEIGHT / 2) * 0.15,
        borderWidth: HEIGHT * 0.0015,
        borderColor: text_color,
        borderRadius: HEIGHT * 0.022,
    },

    btn_login: {
        flex: 1,
        height: (HEIGHT / 2) * 0.145,
        backgroundColor: text_color,
        borderRadius: HEIGHT * 0.0205,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btn_skip: {
        flex: 1,
        borderBottomRightRadius: HEIGHT * 0.0205,
        borderTopRightRadius: HEIGHT * 0.0205,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default WelcomeScreen;