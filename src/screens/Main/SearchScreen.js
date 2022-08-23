import React, { useReducer } from 'react'
import { Keyboard, View, SafeAreaView, Text, FlatList, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { bg_color, main_color, text_color, } from '../../assets/colors';
import PlaylistItem from '../../components/PlaylistItem';
import GenreItem from '../../components/GenreItem';
import ArtistItem from '../../components/ArtistItem';
import SongItem from '../../components/SongItem';
import { createRequest } from '../../utils/Methods';
import { createConstant } from '../../utils/Constant';
import Icon from 'react-native-vector-icons/Feather';
import { SET_DATA, SET_REFRESHING, SET_SEARCH_TEXT, SET_MODAL_VISIBLE, SET_SHOW_PROGRESS } from '../../actions/SearchAction'
import { checkWifiConnection } from '../../utils/Methods';
import MessageModal from '../../components/MessageModal';
import Progressbar from '../../components/Progressbar';
import SearchReducer from '../../reducers/SearchReducer';
import TrackPlayer from 'react-native-track-player';

const { HEIGHT, WIDTH } = createConstant();
const Constant = createConstant();

const initState = {
    searchText: '',
    playlists: [],
    songs: [],
    genres: [],
    artists: [],
    refreshing: false,
    modalVisible: false,
    modalTitle: 'Title',
    modalMessage: 'Message',
    showProgress: false,
    isFirst: true

}

const SearchScreen = ({ navigation }) => {

    const [state, dispatch] = useReducer(SearchReducer, initState)

    console.log('Re-render Search');
    // console.log('Current state:', state)

    const fetchData = async () => {

        const isConnected = await checkWifiConnection();

        if (!isConnected) {
            console.log("no wifi")
            dispatch(SET_MODAL_VISIBLE("Alert", "No internet connection", true));
            return;
        }

        if (!state.searchText) {
            return;
        }

        dispatch(SET_SHOW_PROGRESS(true));

        console.log("Fetching...")

        const get_playlist_url = Constant.API_URL + 'playlist/getByName.php?name=' + state.searchText;
        const get_song_url = Constant.API_URL + 'song/getByName.php?name=' + state.searchText;
        const get_genre_url = Constant.API_URL + 'genre/getByName.php?name=' + state.searchText;
        const get_artist_url = Constant.API_URL + 'artist/getByName.php?name=' + state.searchText;

        console.log(get_song_url);

        const array_playlist = await createRequest(get_playlist_url, 'GET', {});
        const array_song = await createRequest(get_song_url, 'GET', {});
        const array_genre = await createRequest(get_genre_url, 'GET', {});
        const array_artist = await createRequest(get_artist_url, 'GET', {});

        console.log(array_song.data)

        dispatch(SET_DATA(
            array_playlist.data ? array_playlist.data : [],
            array_song.data ? array_song.data : [],
            array_genre.data ? array_genre.data : [],
            array_artist.data ? array_artist.data : []
        ));

    }

    const openPlaylistDetailScreen = (thumb, title, type, playlist_id) => {
        navigation.navigate(Constant.PLAYLISTDETAILS_SCREEN, {
            thumb,
            title,
            type,
            playlist_id,
        });
    }

    const playSingleSong = async (song) => {

        await TrackPlayer.reset();

        await TrackPlayer.add({
            url: song.song_url,
            title: song.song_name,
            artist: song.artist_name,
            artwork: song.song_thumb,

        })

        TrackPlayer.play();
    }

    return (
        <SafeAreaView style={styles.container}>

            <MessageModal
                modalVisible={state.modalVisible}
                setModalVisible={() => {
                    dispatch(SET_MODAL_VISIBLE('', '', false));
                }}
                param={{ title: state.modalTitle, message: state.modalMessage }}
            />

            <View style={{
                flex: 1,
                width: WIDTH,
            }}>
                {state.isFirst ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: WIDTH * 0.1
                    }}>
                        <Text style={{
                            ...styles.text_title,
                            textAlign: 'center',
                            fontWeight: 'normal',
                        }}>Search for songs, albums, artists, genres</Text>
                    </View>

                    : state.playlists.length == 0 && state.songs.length == 0 &&
                        state.artists.length == 0 && state.genres.length == 0
                        ?
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: WIDTH * 0.1
                        }}>
                            <Text style={{
                                ...styles.text_title,
                                textAlign: 'center',
                                fontWeight: 'normal',
                            }}>No result match</Text>
                        </View>
                        :

                        <ScrollView style={styles.list_view}>

                            <Text style={{
                                fontSize: HEIGHT * 0.035,
                                fontWeight: 'bold',
                                color: main_color,
                                marginTop: HEIGHT * 0.035,
                                marginLeft: WIDTH * 0.05
                            }}>Best match</Text>

                            {state.songs.length > 0 &&
                                <>
                                    <Text style={{ ...styles.text_title, marginBottom: HEIGHT * 0.015 }}>Songs</Text>
                                    {state.songs.map((song, index) => {
                                        return <SongItem
                                            key={song.song_id}
                                            url={song.song_thumb}
                                            song_name={song.song_name}
                                            onPress={() => { playSingleSong(song) }}
                                            artist_name={song.artist_name} />
                                    })}
                                </>
                            }

                            {state.playlists.length > 0 &&
                                <>
                                    <Text style={styles.text_title}>Playlists</Text>

                                    <FlatList
                                        style={styles.flat_list}
                                        data={state.playlists}
                                        renderItem={({ item, index }) => {

                                            const isLast = index + 1 === state.playlists.length;

                                            const param = {
                                                title: item.playlist_name,
                                                url: item.playlist_thumb,
                                            }

                                            return <PlaylistItem
                                                clickListener={() =>
                                                    openPlaylistDetailScreen(item.playlist_thumb, item.playlist_name, Constant.TYPE_PLAYLIST, item.playlist_id)
                                                }
                                                item={param}
                                                isLast={isLast} />
                                        }}
                                        keyExtractor={item => item.playlist_id}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </>
                            }

                            {state.artists.length > 0 &&
                                <>
                                    <Text style={styles.text_title}>Artists</Text>

                                    <FlatList
                                        style={styles.flat_list}
                                        data={state.artists}
                                        renderItem={({ item, index }) => {

                                            const isLast = index + 1 === state.artists.length;

                                            const param = {
                                                title: item.artist_name,
                                                url: item.artist_thumb,
                                            }

                                            return <ArtistItem
                                                clickListener={() =>
                                                    openPlaylistDetailScreen(item.artist_thumb, item.artist_name, Constant.TYPE_ARTIST, item.artist_id)
                                                }
                                                item={param}
                                                isLast={isLast} />
                                        }}
                                        keyExtractor={item => item.artist_id}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </>
                            }

                            {state.genres.length > 0 &&
                                <>
                                    <Text style={styles.text_title}>Genres</Text>

                                    <FlatList
                                        style={styles.flat_list}
                                        data={state.genres}
                                        renderItem={({ item, index }) => {

                                            const isLast = index + 1 === state.genres.length;
                                            const param = {
                                                title: item.genre_name,
                                                url: item.genre_thumb,
                                            }

                                            return <GenreItem
                                                clickListener={() =>
                                                    openPlaylistDetailScreen(item.genre_thumb, item.genre_name, Constant.TYPE_GENRE, item.genre_id)
                                                }
                                                item={param}
                                                isLast={isLast} />
                                        }}
                                        keyExtractor={item => item.genre_id}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </>
                            }

                        </ScrollView>
                }
            </View>

            <View style={styles.search_view}>
                <View style={styles.search_input}>
                    <TextInput style={styles.input}
                        onChangeText={text => dispatch(SET_SEARCH_TEXT(text))}
                        placeholder="Search..."
                        placeholderTextColor="#5C5A59"
                        selectionColor="#5C5A59"
                        value={state.searchText} />
                    <TouchableOpacity onPress={() => {
                        Keyboard.dismiss();
                        fetchData();
                    }}>
                        <Icon name="search" color={main_color} size={HEIGHT * 0.04}
                            style={{
                                marginRight: WIDTH * 0.03
                            }} />
                    </TouchableOpacity>
                </View>
            </View>

            {state.showProgress &&
                <Progressbar />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bg_color,
        justifyContent: 'center',
        alignItems: 'center'
    },

    search_view: {
        width: WIDTH,
        height: HEIGHT * 0.08,
    },

    list_view: {
        flex: 1,
        width: WIDTH,
    },

    search_input: {
        flex: 1,
        flexDirection: 'row',
        borderColor: main_color,
        borderLeftWidth: HEIGHT * 0.002,
        borderRightWidth: HEIGHT * 0.002,
        borderTopWidth: HEIGHT * 0.002,
        borderTopLeftRadius: HEIGHT * 0.04,
        borderTopRightRadius: HEIGHT * 0.04,
        alignItems: 'center',
    },

    input: {
        flex: 1,
        color: text_color,
        marginHorizontal: WIDTH * 0.05,
        fontSize: HEIGHT * 0.025,
    },

    text_title: {
        fontSize: HEIGHT * 0.03,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: HEIGHT * 0.01,
        marginLeft: WIDTH * 0.05
    },

    flat_list: {
        marginBottom: HEIGHT * 0.02,
    }


})

export default SearchScreen;