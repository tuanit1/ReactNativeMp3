import React, { createContext, useState, useRef } from 'react';
import { View } from 'react-native';
import PlayerBottomSheet from '../components/PlayerBottomSheet';
import { createConstant } from '../utils/Constant';
import { main_color } from '../assets/colors';

const { HEIGHT, WIDTH } = createConstant();

export const PlayerContext = createContext({});

const PlayerProvider = ({ children }) => {

    const bottomSheet = useRef();
    const [isExpand, setIsExpand] = useState(true);


    return (
        <PlayerContext.Provider
            value={{
                bottomSheet,
                setIsExpand,
                isExpand,
            }}>
            <View style={{
                flex: 1,
                backgroundColor: 'black'
            }}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: HEIGHT * 0.09
                }}>
                    {children}
                </View>
                <PlayerBottomSheet />
            </View>

        </PlayerContext.Provider>
    )
}

export default PlayerProvider;