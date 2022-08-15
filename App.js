import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import AuthProvider from './src/providers/AuthProvider'
import Routes from './src/navigations/Routes'

// test
import TestProvider from './src/providers/TestProvider'
import TestComponent from './src/components/TestComponent'


const App = () => {
    return (
        // <AuthProvider>
        //     <Routes />
        // </AuthProvider>

        <TestProvider>
            <TestComponent/>
        </TestProvider>
    )
}

export default App