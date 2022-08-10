import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createConstant } from "../utils/Constant";
import { main_color } from "../assets/colors"

const Constant = createConstant()

const MessageModal = ({ modalVisible, setModalVisible, param }) => {

    console.log("Render modal: ", param);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                <View style={styles.modal}>

                    <Text style={styles.title}>{param.title}</Text>
                    <Text style={styles.message}>{param.message}</Text>

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: Constant.HEIGHT * 0.02,
                        }}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modal: {
        width: Constant.WIDTH * 0.7,
        paddingVertical: Constant.HEIGHT * 0.02,
        paddingHorizontal: Constant.WIDTH * 0.06,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Constant.HEIGHT * 0.02
    },

    button: {
        height: Constant.HEIGHT * 0.08,
        width: Constant.WIDTH * 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: Constant.HEIGHT * 0.028,
        fontWeight: 'bold',
        color: '#282828'
    },

    message: {
        fontSize: Constant.HEIGHT * 0.02,
        color: 'black',
        textAlign: 'center',
        marginTop: Constant.HEIGHT * 0.01,
        marginBottom: Constant.HEIGHT * 0.03
    },

    button: {
        backgroundColor: main_color,
        height: Constant.HEIGHT * 0.047,
        width: Constant.WIDTH * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Constant.HEIGHT * 0.04
    }

})

export default MessageModal
