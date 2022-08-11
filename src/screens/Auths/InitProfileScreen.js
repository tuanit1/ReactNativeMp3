import React, { useContext, useState, useCallback, memo } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { AuthContext } from '../../auth/AuthProvider';
import { bg_color, text_color } from '../../assets/colors';
import { createConstant } from '../../utils/Constant';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Progressbar from '../../components/Progressbar';
import ButtonBack from '../../components/ButtonBack';
import MessageModal from '../../components/MessageModal';
import { checkWifiConnection } from '../../utils/Methods';

const Constant = createConstant()
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

const InitProfileScreen = () => {

    const { initProfile, showProgress } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Description' });
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');

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

                initProfile(name, phone, +age);

            } else {
                showMessageModal("Alert", "No internet connection");
            }
        })


    }, [name, phone, age]);

    const handleSkip = useCallback(() => {
        checkWifiConnection().then(isConnected => {
            if (isConnected) {
              
                initProfile('', '', 0)

            } else {
                showMessageModal("Alert", "No internet connection");
            }
        })
    })

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


    return (
        <SafeAreaView style={styles.container}>

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
                >Let's set up your profile</Text>

                <FormInput
                    isPassword={false}
                    placeholder="What's your name?"
                    onChangeText={onChangeName}
                />

                <FormInput
                    isPassword={false}
                    placeholder="What's your phone number?"
                    onChangeText={onChangePhone}
                    keyboardType="numeric"
                />

                <FormInput
                    isPassword={false}
                    placeholder="How old are you?"
                    onChangeText={onChangeAge}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.view_button}>
                <FormButton title={"Submit"} clickListener={handleSubmit} />

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
                    }}>Let's another time</Text>
                    <View style={{
                        height: HEIGHT * 0.002,
                        width: WIDTH * 0.1,
                        backgroundColor: text_color
                    }} />
                </View>

                <TouchableOpacity
                    onPress={handleSkip}>
                    <Image
                        style={{
                            height: HEIGHT * 0.06,
                            width: HEIGHT * 0.06,
                            tintColor: text_color
                        }}
                        source={require('../../assets/icons/ic_next.png')}
                    />
                </TouchableOpacity>

            </View>


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
        top: HEIGHT * 0.15,
        width: WIDTH,
        alignItems: 'center',
    },

    view_button: {
        position: 'absolute',
        top: HEIGHT * 0.65,
        alignItems: 'center',
        width: WIDTH,
    },
})

export default memo(InitProfileScreen)