import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import AuthProvider from './src/providers/AuthProvider'
import Routes from './src/navigations/Routes'
import TrackPlayer, { RepeatMode } from 'react-native-track-player';


TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE]
})

const App = () => {

    const setUpTrackPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setUpTrackPlayer();
        return () => TrackPlayer.destroy();
    }, [])

    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App