import React from 'react';
import BottomNavigation from './BottomNavigation';
import PlayerProvider from '../providers/PlayerProvider';

const AppNavigation = () => {

    return (
        <PlayerProvider>
            <BottomNavigation />
        </PlayerProvider>
    )
}

export default AppNavigation;