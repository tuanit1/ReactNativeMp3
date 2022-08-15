import React, { useCallback, useState, useContext } from 'react';
import {
    View, SafeAreaView, TouchableOpacity, Text, StyleSheet,
    PixelRatio, Image
} from "react-native"
import { AuthContext } from "../../providers/AuthProvider";
import { bg_color, text_color, main_color } from '../../assets/colors';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import { createConstant } from '../../utils/Constant';
import MessageModal from '../../components/MessageModal';
import { checkWifiConnection } from '../../utils/Methods'
import ButtonBack from '../../components/ButtonBack';
import Progressbar from '../../components/Progressbar';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const LoginScreen = ({ navigation }) => {

    const { login, googleLogin, showProgress, setShowProgress } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Description' });


    const showMessageModal = (title, message) => {
        setModalParam({
            title,
            message
        });

        setModalVisible(true);
    }

    const handleSignIn = useCallback(() => {

        checkWifiConnection().then(isConnected => {

            if (email === "" || password === "") {

                showMessageModal("Alert", "Please enter all fields")

                return;
            }

            if (isConnected === true) {
                login(email, password);
            } else {
                showMessageModal("Alert", "No internet connection")
            }
        })

    }, [email, password]);

    const onChangeEmail = useCallback((email) => {
        setEmail(email);
    }, [])

    const onChangePassword = useCallback((password) => {
        setPassword(password);
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: bg_color
        }}>

            {showProgress &&
                <Progressbar />
            }

            <MessageModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                param={modalParam}
            />

            <ButtonBack navigation={navigation} />

            <View style={styles.view_title}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: Math.round(PixelRatio.roundToNearestPixel(HEIGHT / 30)),
                    marginBottom: HEIGHT / 70,
                    color: 'white',
                }}>Hello Again!</Text>
                <Text style={{
                    fontSize: Math.round(PixelRatio.roundToNearestPixel(HEIGHT / 35)),
                    color: text_color,
                    textAlign: 'center',
                    marginHorizontal: WIDTH * 0.15
                }}>Welcome to the endless world of music!</Text>
            </View>

            <View style={styles.view_input}>

                <FormInput
                    isPassword={false}
                    placeholder="Enter email"
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                />
                <FormInput
                    isPassword={true}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                />

                <TouchableOpacity style={styles.view_forgot}>
                    <Text style={{ color: text_color, fontWeight: "bold", fontSize: HEIGHT * 0.018 }}>Forgot Password?</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.view_button}>
                <FormButton title={"Sign in"} clickListener={handleSignIn} />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: HEIGHT * 0.04
                }}>
                    <View style={{
                        height: HEIGHT * 0.002,
                        width: WIDTH * 0.1,
                        backgroundColor: text_color
                    }} />
                    <Text style={{
                        color: text_color,
                        fontWeight: "bold",
                        fontSize: HEIGHT * 0.017,
                        paddingHorizontal: WIDTH * 0.03
                    }}>Or continue with</Text>
                    <View style={{
                        height: HEIGHT * 0.002,
                        width: WIDTH * 0.1,
                        backgroundColor: text_color
                    }} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: WIDTH * 0.85,
                }}>
                    <TouchableOpacity style={styles.social_btn}
                        onPress={googleLogin}>
                        <Image resizeMode='center' style={styles.social_img} source={require('../../assets/icons/ic_google.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.social_btn}
                        onPress={() => setModalVisible(true)}>
                        <Image resizeMode='center' style={styles.social_img} source={require('../../assets/icons/ic_apple.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.social_btn}>
                        <Image resizeMode='center' style={styles.social_img} source={require('../../assets/icons/ic_facebook.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.view_bottom}>
                <Text style={{
                    color: text_color,
                    fontSize: HEIGHT * 0.017,
                    fontWeight: 'bold'
                }}>Not a member?</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate(Constant.SIGNUP_SCREEN)}>
                    <Text style={{
                        color: main_color,
                        fontSize: HEIGHT * 0.019,
                        marginLeft: WIDTH * 0.015,
                        fontWeight: 'bold'
                    }}>Register now</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    view_title: {
        position: 'absolute',
        top: HEIGHT * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH,
    },

    view_input: {
        position: 'absolute',
        top: HEIGHT * 0.27,
        width: WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },

    view_button: {
        position: 'absolute',
        top: HEIGHT * 0.54,
        alignItems: 'center',
        width: WIDTH,
    },

    view_bottom: {
        position: 'absolute',
        top: HEIGHT * 0.86,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: WIDTH,
    },

    input: {
        height: 0.05 * HEIGHT,
        width: 0.6 * WIDTH,
        margin: '2%',
        borderWidth: 1,
        padding: 10,
    },

    view_forgot: {
        marginTop: HEIGHT * 0.01,
        marginRight: WIDTH * 0.09,
        alignSelf: 'flex-end'
    },

    social_btn: {
        paddingHorizontal: WIDTH * 0.05,
        paddingVertical: HEIGHT * 0.013,
        borderWidth: HEIGHT * 0.0015,
        borderColor: text_color,
        borderRadius: HEIGHT * 0.022,
    },

    social_img: {
        width: HEIGHT * 0.035,
        height: HEIGHT * 0.035,
    }
});

export default LoginScreen;


