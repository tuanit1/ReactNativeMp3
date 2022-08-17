import React, { createContext, useState, memo } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import MessageModal from '../components/MessageModal';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [skip, setSkip] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Description' });
    const [showProgress, setShowProgress] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);

    const logout = async () => {

        console.log('Click Log out');

        if (skip) {
            setSkip(false);
        } else {


            GoogleSignin.isSignedIn()
                .then(isSignIn => {
                    if (isSignIn) {
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
        setShowProgress(true);
        await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setShowProgress(false);
                console.log('Login successfully!');
            })
            .catch(error => {
                setShowProgress(false);
                console.log(error.message);
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
                    default:
                        setModalParam({
                            title: 'Alert',
                            message: 'Something went wrong, Please try again!'
                        });
                        setModalVisible(true);
                }
            });
    }

    const googleLogin = async () => {

        console.log('Click Google login');

        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        setShowProgress(true);

        await auth().signInWithCredential(googleCredential)
            .then(() => {
                setShowProgress(false);
                console.log('Google login successfully!')
            })
            .catch(error => {
                setShowProgress(false);
                console.log(error.message);
                setModalParam({
                    title: 'Alert',
                    message: 'Something went wrong, Please try again!'
                });
                setModalVisible(true);
            })


    }

    const signup = async (email, password) => {
        console.log('Click Signup');
        setShowProgress(true);
        await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                setShowProgress(false);
                console.log('User account created & signed in!');
            })
            .catch(error => {

                setShowProgress(false);

                console.log(error.message);
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
                            message: 'There already exists an account with the given email address'
                        });
                        setModalVisible(true);
                        break;
                    case 'auth/weak-password':
                        setModalParam({
                            title: 'Alert',
                            message: 'Password should be at least 6 characters'
                        });
                        setModalVisible(true);
                        break;
                    default:
                        setModalParam({
                            title: 'Alert',
                            message: 'Something went wrong, Please try again!'
                        });
                        setModalVisible(true);

                }
            });
    }

    const initProfile = async (name, phone, age) => {
        console.log('Click initProfile');
        setShowProgress(true);

        firestore().collection('users').doc(user.uid)
            .set({ name, phone, age })
            .then(() => {

                console.log('Init profile successfully');

                setShowProgress(false);
                setCreateProfile(false);
            })
            .catch((error) => {
                setShowProgress(true);
                console.log(error);
            })

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                skip,
                setSkip,
                showProgress,
                setShowProgress,
                createProfile,
                setCreateProfile,
                login,
                googleLogin,
                logout,
                signup,
                initProfile
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
export default memo(AuthProvider);