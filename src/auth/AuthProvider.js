import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth'

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = async () => {
        console.log('Click Log out');
        await auth().signOut()
            .then(() => {
                console.log("Logout successfully!")
            })
            .catch(error => {
                console.error(error);
            });
    }

    const login = async (email, password) => {
        console.log('Click Login');
        await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Login successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    }

    const signup = async (email, password) => {
        console.log('Click Signup');
        await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                // if (error.code === 'auth/email-already-in-use') {
                //     console.log('That email address is already in use!');
                // }

                // if (error.code === 'auth/invalid-email') {
                //     console.log('That email address is invalid!');
                // }
                console.error(error);
            });
    }

    { console.log('Re-render AuthProvider') }

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                signup,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider;