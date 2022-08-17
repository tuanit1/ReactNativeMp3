import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import AuthProvider from './src/providers/AuthProvider'
import Routes from './src/navigations/Routes'


const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App