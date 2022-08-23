const SearchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                playlists: action.playlists,
                songs: action.songs,
                genres: action.genres,
                artists: action.artists,
                refreshing: false,
                showProgress: false,
                searchText: '',
                isFirst: false
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

        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText,
            }
    }
}

export default SearchReducer