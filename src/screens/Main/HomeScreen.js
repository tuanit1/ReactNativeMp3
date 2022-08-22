import React, { useEffect, useContext, useReducer } from 'react'
import { SafeAreaView, ScrollView, View, FlatList, RefreshControl, Text, StyleSheet } from 'react-native';
import { bg_color, text_color, main_color } from '../../assets/colors';
import { createConstant } from '../../utils/Constant';
import { createRequest } from '../../utils/Methods';
import PlaylistItem from '../../components/PlaylistItem';
import GenreItem from '../../components/GenreItem';
import ArtistItem from '../../components/ArtistItem';
import SongItem from '../../components/SongItem';
import { AuthContext } from '../../providers/AuthProvider';
import { checkWifiConnection } from '../../utils/Methods';
import MessageModal from '../../components/MessageModal';
import Progressbar from '../../components/Progressbar';
import HomeReducer from '../../reducers/HomeReducer';
import TrackPlayer from 'react-native-track-player';
import { SET_DATA, SET_REFRESHING, SET_MODAL_VISIBLE, SET_SHOW_PROGRESS } from '../../actions/HomeAction'

const Constant = createConstant();
const HEIGHT = Constant.HEIGHT;
const WIDTH = Constant.WIDTH;

//init
const initState = {
    playlists: [],
    songs: [],
    genres: [],
    artists: [],
    refreshing: false,
    modalVisible: false,
    modalTitle: 'Title',
    modalMessage: 'Message',
    showProgress: true

}

const HomeScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext)
    const [state, dispatch] = useReducer(HomeReducer, initState)

    console.log('Re-render HomeScreen');
    console.log('Current state:', state)

    const onRefresh = () => {
        dispatch(SET_REFRESHING(true));
        fetchData();
    }

    const fetchData = async () => {

        const isConnected = await checkWifiConnection();

        if (!isConnected) {
            console.log("no wifi")
            dispatch(SET_MODAL_VISIBLE("Alert", "No internet connection", true));
            return;
        }

        console.log("Fetching...")

        const get_playlist_url = Constant.API_URL + 'playlist/getAll.php';
        const get_song_url = Constant.API_URL + 'song/getAll.php';
        const get_genre_url = Constant.API_URL + 'genre/getAll.php';
        const get_artist_url = Constant.API_URL + 'artist/getAll.php';

        console.log(get_song_url);

        const array_playlist = await createRequest(get_playlist_url, 'GET', {});
        const array_song = await createRequest(get_song_url, 'GET', {});
        const array_genre = await createRequest(get_genre_url, 'GET', {});
        const array_artist = await createRequest(get_artist_url, 'GET', {});

        dispatch(SET_DATA(
            array_playlist.data,
            array_song.data,
            array_genre.data,
            array_artist.data
        ));

    }

    const WelcomeText = () => {
        const current_time = new Date();
        const hour = current_time.getHours();
        let welcome1;
        let welcome2;

        if (hour >= 5 && hour < 12) {
            welcome1 = "Good morning"
        } else if (hour >= 12 && hour < 18) {
            welcome1 = "Good afternoon"
        } else {
            welcome1 = "Good evening"
        }

        if (user) {
            welcome2 = "Welcome back " + user.email
        } else {
            welcome2 = "Welcome anonymous user"
        }

        return (
            <View style={{
                marginTop: HEIGHT * 0.04,
                marginBottom: HEIGHT * 0.02,
            }}>
                <Text style={{
                    fontSize: HEIGHT * 0.033,
                    fontWeight: 'bold',
                    color: 'white',
                    marginLeft: WIDTH * 0.05
                }}>{welcome1}</Text>
                <Text style={{
                    color: '#999999',
                    fontSize: HEIGHT * 0.02,
                    marginLeft: WIDTH * 0.05
                }}>{welcome2}</Text>
            </View>
        )
    }

    const playSingleSong = async (song) => {

        await TrackPlayer.reset();

        const artist_name = state.artists.map(artist => {
            if (artist.artist_id === song.artist_id) {
                return artist.artist_name
            }
        })

        await TrackPlayer.add({
            url: song.song_url,
            title: song.song_name,
            artist: artist_name,
            artwork: song.song_thumb,

        })

        TrackPlayer.play();
    }

    const openPlaylistDetailScreen = (thumb, title, type, playlist_id) => {
        navigation.navigate(Constant.PLAYLISTDETAILS_SCREEN, {
            thumb,
            title,
            type,
            playlist_id,
        });
    }

    useEffect(() => {
        dispatch(SET_SHOW_PROGRESS(true));
        fetchData();
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                <MessageModal
                    modalVisible={state.modalVisible}
                    setModalVisible={() => {
                        dispatch(SET_MODAL_VISIBLE('', '', false));
                    }}
                    param={{ title: state.modalTitle, message: state.modalMessage }}
                />

                <WelcomeText />

                {state.playlists.length > 0 &&
                    <>
                        <Text style={styles.text_title}>Trending collections</Text>

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
                        <Text style={styles.text_title}>Weekly artists</Text>

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
                        <Text style={styles.text_title}>Music by genre</Text>

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

                {state.songs.length > 0 &&
                    <>
                        <Text style={{ ...styles.text_title, marginBottom: HEIGHT * 0.015 }}>Top hits</Text>
                        {state.songs.map((song, index) => {
                            return <SongItem
                                key={song.song_id}
                                url={song.song_thumb}
                                song_name={song.song_name}
                                onPress={() => { playSingleSong(song) }}
                                artist_name={state.artists.map(artist => {
                                    if (artist.artist_id === song.artist_id) {
                                        return artist.artist_name
                                    }
                                })} />
                        })}
                    </>
                }

            </ScrollView>


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
    },

    text_title: {
        fontSize: HEIGHT * 0.033,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: HEIGHT * 0.01,
        marginLeft: WIDTH * 0.05
    },

    flat_list: {
        marginBottom: HEIGHT * 0.02,
    }
})

export default HomeScreen;