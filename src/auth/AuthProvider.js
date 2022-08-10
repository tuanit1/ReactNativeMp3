import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import MessageModal from '../components/MessageModal'

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [skip, setSkip] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Description' });

    const logout = async () => {

        console.log('Click Log out');

        if (skip) {
            setSkip(false);
        } else {


            GoogleSignin.isSignedIn()
                .then(isSignIn => {
                    if(isSignIn) {
                        GoogleSignin.signOut();
                    }
                })
            ;

            await auth().signOut()
                .then(() => {
                    console.log("Logout successfully!")
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }

    const login = async (email, password) => {
        console.log('Click Login');
        await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Login successfully!');
            })
            .catch(error => {
                console.log(error);
                switch (error.code) {
                    case 'auth/invalid-email':
                        setModalParam({
                            title: 'Alert',
                            message: 'The email address is not valid'
                        });
                        setModalVisible(true);
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        setModalParam({
                            title: 'Alert',
                            message: 'Incorrect email or password'
                        });
                        setModalVisible(true);
                        break;
                }
            });
    }

    const googleLogin = async () => {
        console.log('Click Google login');

        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential)
            .then(() => console.log('Google login successfully!'))
            .catch(error => {
                console.log(error);
                setModalParam({
                    title: 'Alert',
                    message: 'Something went wrong, Please try again!'
                });
                setModalVisible(true);
            })


    }

    const signup = async (email, password) => {
        console.log('Click Signup');
        await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                console.log(error);
                switch (error.code) {
                    case 'auth/invalid-email':
                        setModalParam({
                            title: 'Alert',
                            message: 'The email address is not valid'
                        });
                        setModalVisible(true);
                        break;
                    case 'auth/email-already-in-use':
                        setModalParam({
                            title: 'Alert',
                            message: ' There already exists an account with the given email address'
                        });
                        setModalVisible(true);
                        break;
                }
            });
    }

    { console.log('Re-render AuthProvider') }

    return (

        <AuthContext.Provider
            value={{
                user,
                skip,
                setUser,
                setSkip,
                login,
                googleLogin,
                logout,
                signup,
            }}>

            <MessageModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                param={modalParam}
            />
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider;