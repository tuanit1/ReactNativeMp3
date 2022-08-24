import React, { useContext, useState, useCallback, useEffect, memo } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { AuthContext } from '../../providers/AuthProvider';
import { bg_color, text_color } from '../../assets/colors';
import { createConstant } from '../../utils/Constant';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Progressbar from '../../components/Progressbar';
import ButtonBack from '../../components/ButtonBack';
import MessageModal from '../../components/MessageModal';
import { checkWifiConnection } from '../../utils/Methods';
import firestore from '@react-native-firebase/firestore';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const InitScreen = () => {

    const { user, logout, updateProfile, showProgress } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Description' });
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');

    console.log(user);

    const handleSubmit = useCallback(() => {

        checkWifiConnection().then(isConnected => {
            if (isConnected) {
                if (name === "" || phone === "" || age === "") {
                    showMessageModal("Alert", "Please enter all fields");
                    return;
                }

                if (!(+phone)) {
                    showMessageModal("Alert", "Phone must be a number");
                    return;
                }

                if (!(+age)) {
                    showMessageModal("Alert", "Age must be a number");
                    return;
                }

                updateProfile(name, phone, +age);

            } else {
                showMessageModal("Alert", "No internet connection");
            }
        })


    }, [name, phone, age]);


    const showMessageModal = (title, message) => {
        setModalParam({
            title,
            message
        });

        setModalVisible(true);
    }



    console.log({ name, phone, age })

    const onChangeName = useCallback((name) => {
        setName(name);
    }, [])

    const onChangePhone = useCallback((phone) => {
        setPhone(phone);
    }, [])

    const onChangeAge = useCallback((age) => {
        setAge(age);
    }, [])

    useEffect(() => {

        if (user) {
            firestore().collection('users').doc(user.uid).get()
                .then(userDoc => {
                    console.log(userDoc.data());

                    setName(userDoc.data().name);
                    setAge("" + userDoc.data().age);
                    setPhone(userDoc.data().phone);
                })
        }

    }, [])


    return (
        <SafeAreaView style={styles.container}>

            {user ?
                <>
                    {showProgress &&
                        <Progressbar />
                    }

                    <MessageModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        param={modalParam}
                    />

                    <View style={styles.view_input}>
                        <Text style={{
                            fontSize: HEIGHT * 0.04,
                            color: 'white',
                            fontWeight: 'bold',
                            width: WIDTH * 0.8,
                            textAlign: 'center',
                            marginBottom: HEIGHT * 0.04
                        }}
                        >Update your profile</Text>

                        <FormInput
                            isPassword={false}
                            value={name}
                            placeholder="What's your name?"
                            onChangeText={onChangeName}
                        />

                        <FormInput
                            isPassword={false}
                            value={phone}
                            placeholder="What's your phone number?"
                            onChangeText={onChangePhone}
                            keyboardType="numeric"
                        />

                        <FormInput
                            isPassword={false}
                            value={age}
                            placeholder="How old are you?"
                            onChangeText={onChangeAge}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.view_button}>
                        <FormButton title={"Submit"} clickListener={handleSubmit} />

                    </View>

                    <View style={{
                        position: 'absolute',
                        top: HEIGHT * 0.68,
                        alignItems: 'center',
                        width: WIDTH,
                    }}>
                        <FormButton title={"Log out"} clickListener={logout} />

                    </View>
                </>
                :
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <FormButton title={"Sign in to continue"} clickListener={logout} />
                </View>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bg_color,
    },

    view_input: {
        position: 'absolute',
        top: HEIGHT * 0.1,
        width: WIDTH,
        alignItems: 'center',
    },

    view_button: {
        position: 'absolute',
        top: HEIGHT * 0.58,
        alignItems: 'center',
        width: WIDTH,
    },
})

export default memo(InitScreen)