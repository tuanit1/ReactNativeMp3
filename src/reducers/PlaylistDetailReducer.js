const PlaylistDetailReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                songs: action.songs,
                artists: action.artists,
                refreshing: false,
                showProgress: false,
            }

        case 'SET_REFRESHING':
            return {
                ...state,
                refreshing: action.refreshing,
            }
        case 'SET_MODAL_VISIBLE':
            return {
                ...state,
                modalTitle: action.title,
                modalMessage: action.message,
                modalVisible: action.visible,
                refreshing: false,
            }
        case 'SET_SHOW_PROGRESS':
            return {
                ...state,
                showProgress: action.visible,
            }
    }
}

export default PlaylistDetailReducer