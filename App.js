import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import AuthProvider from './src/providers/AuthProvider'
import Routes from './src/navigations/Routes'
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

// const tracks = [
//     {
//         id: 1,
//         url: 'https://tainhacmienphi.biz/get/song/api/349290',
//         title: 'Chung ta cua hien tai'
//     }
// ]

TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE]
})

const App = () => {

    const setUpTrackPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
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