import React, { useContext } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { createConstant } from '../utils/Constant';
import MusicScreen from '../screens/Main/MusicScreen';
import { PlayerContext } from '../providers/PlayerProvider';

const { HEIGHT, WIDTH } = createConstant()

const PlayerBottomSheet = () => {

    const { bottomSheet, setIsExpand } = useContext(PlayerContext);

    return (
        <BottomSheet
            ref={bottomSheet}
            initialSnap={1}
            snapPoints={[HEIGHT * 0.97, HEIGHT * 0.09]}
            renderContent={() => {
                return <MusicScreen/>
            }}
            enabledGestureInteraction={false}
            onOpenEnd={() => setIsExpand(false)}
            onCloseEnd={() => setIsExpand(true)}
        />
    );
}

export default PlayerBottomSheet