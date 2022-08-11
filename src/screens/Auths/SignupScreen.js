import React, { useState, useCallback, useContext, memo } from "react"
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from "react-native"
import FormInput from '../../components/FormInput';
import { createConstant } from "../../utils/Constant";
import { main_color, bg_color, text_color } from '../../assets/colors'
import ButtonBack from "../../components/ButtonBack";
import FormButton from '../../components/FormButton';
import MessageModal from '../../components/MessageModal';
import { checkWifiConnection } from '../../utils/Methods'
import { AuthContext } from '../../auth/AuthProvider'
import Progressbar from "../../components/Progressbar";

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const SignupScreen = ({ navigation }) => {

    const { signup, showProgress, setShowProgress } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CFpassword, setCFPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Description' });

    const showMessageModal = (title, message) => {
        setModalParam({
            title,
            message
        });

        setModalVisible(true);
    }

    const handleSignUp = useCallback(() => {

        checkWifiConnection().then(isConnected => {
            if (isConnected === true) {

                if (email === "" || password === "" || CFpassword === "") {
                    showMessageModal("Alert", "Please enter all fields");
                    return;
                }

                if (password === CFpassword) {
                    signup(email, password);
                } else {

                    showMessageModal("Alert", "Confirmation password does not match");

                }


            } else {

                showMessageModal("Alert", "No internet connection");
            }
        })

    }, [email, password, CFpassword]);

    const onChangeEmail = useCallback((email) => {
        setEmail(email);
    }, [])

    const onChangePassword = useCallback((password) => {
        setPassword(password);
    }, [])

    const onChangeCFPassword = useCallback((password) => {
        setCFPassword(password);
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: bg_color,
            }}>

            {showProgress &&
                <Progressbar />
            }

            <ButtonBack navigation={navigation} />

            <MessageModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                param={modalParam}
            />

            <View style={styles.view_image}>
                <Image
                    style={styles.image}
                    source={require('../../assets/icons/img_signup.png')}
                    resizeMode='center'
                />

                <Text style={{
                    fontSize: HEIGHT * 0.04,
                    width: WIDTH * 0.75,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Create New Account</Text>
            </View>


            <View style={styles.view_input}>

                <FormInput
                    isPassword={false}
                    placeholder="Enter your email"
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                />
                <FormInput
                    isPassword={true}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                />

                <FormInput
                    isPassword={true}
                    placeholder="Confirm password"
                    onChangeText={onChangeCFPassword}
                />

            </View>

            <View style={styles.view_button}>
                <FormButton title={"Sign up"} clickListener={handleSignUp} />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    view_image: {
        position: 'absolute',
        alignItems: 'center',
        top: HEIGHT * 0.08,
        width: WIDTH
    },

    image: {
        height: HEIGHT * 0.3,
        width: WIDTH * 0.8
    },

    view_input: {
        position: 'absolute',
        top: HEIGHT * 0.5,
        width: WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },

    view_button: {
        position: 'absolute',
        top: HEIGHT * 0.84,
        alignItems: 'center',
        width: WIDTH,
    },
})

export default memo(SignupScreen)