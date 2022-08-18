const SET_DATA = (playlists, songs, genres, artists) => {
    return {
        type: 'SET_DATA',
        playlists,
        songs,
        genres,
        artists
    }
}

const SET_REFRESHING = (isRefreshing) => {
    return {
        type: 'SET_REFRESHING',
        refreshing: isRefreshing
    }
}

const SET_MODAL_VISIBLE = (title, message, visible) => {
    return {
        type: 'SET_MODAL_VISIBLE',
        title,
        message,
        visible
    }
}

const SET_SHOW_PROGRESS = (visible) => {
    return {
        type: 'SET_SHOW_PROGRESS',
        visible
    }
}

export {SET_DATA, SET_REFRESHING, SET_MODAL_VISIBLE, SET_SHOW_PROGRESS}