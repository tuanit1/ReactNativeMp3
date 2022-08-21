import React, { useEffect, useReducer } from 'react'
import {
    SafeAreaView, ScrollView, View, Image,
    RefreshControl, Text, StyleSheet,
    TouchableOpacity
} from 'react-native';
import { bg_color, text_color, main_color } from '../../assets/colors';
import { createConstant } from '../../utils/Constant';
import { createRequest } from '../../utils/Methods';
import LinearGradient from 'react-native-linear-gradient';
import { SET_REFRESHING, SET_MODAL_VISIBLE, SET_DATA, SET_SHOW_PROGRESS } from '../../actions/PlaylistDetailAction';
import PlaylistDetailReducer from '../../reducers/PlaylistDetailReducer';
import MessageModal from '../../components/MessageModal';
import Progressbar from '../../components/Progressbar';
import { checkWifiConnection } from '../../utils/Methods';
import SongItem from '../../components/SongItem';
import ButtonBack from '../../components/ButtonBack';
import TrackPlayer from 'react-native-track-player';

const Constant = createConstant();
const { HEIGHT, WIDTH } = Constant;

const initState = {
    songs: [],
    artists: [],
    refreshing: false,
    modalVisible: false,
    modalTitle: 'Title',
    modalMessage: 'Message',
    showProgress: true
}

const PlaylistDetailScreen = ({ route, navigation }) => {

    const { thumb, title, type, playlist_id } = route.params;
    const [state, dispatch] = useReducer(PlaylistDetailReducer, initState)

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

        let get_song_url = '';

        switch (type) {
            case Constant.TYPE_PLAYLIST:

                get_song_url = Constant.API_URL + 'song/getByPlaylistID.php?id=' + playlist_id;

                break;
            case Constant.TYPE_ARTIST:

                get_song_url = Constant.API_URL + 'song/getByArtistID.php?id=' + playlist_id;

                break;
            case Constant.TYPE_GENRE:

                get_song_url = Constant.API_URL + 'song/getByGenreID.php?id=' + playlist_id;

                break;
        }

        const get_artist_url = Constant.API_URL + 'artist/getAll.php';

        const array_song = await createRequest(get_song_url, 'GET', {});
        const array_artist = await createRequest(get_artist_url, 'GET', {});

        dispatch(SET_DATA(
            array_song.data,
            array_artist.data
        ));

    }

    useEffect(() => {
        dispatch(SET_SHOW_PROGRESS(true));
        fetchData();
    }, []);

    const playAllSong = () => {


        const tracks = [];

        state.songs.map(song => {

            const artist_name = state.artists.map(artist => {
                if (artist.artist_id === song.artist_id) {
                    return artist.artist_name
                }
            });

            const track_obj = {
                url: song.song_url,
                title: song.song_name,
                artwork: song.song_thumb,
                artist: artist_name,
            }

            tracks.push(track_obj);
        })

        TrackPlayer.reset();
        TrackPlayer.add(tracks)
        TrackPlayer.play();

    }

    const playWithSelectedSong = (selected_song) => {

        let filter_songs = state.songs.filter(song => {
            return song.song_id !== selected_song.song_id;
        });

        filter_songs.splice(0, 0, selected_song);

        const tracks = [];

        filter_songs.map(song => {

            const artist_name = state.artists.map(artist => {
                if (artist.artist_id === song.artist_id) {
                    return artist.artist_name
                }
            });

            const track_obj = {
                url: song.song_url,
                title: song.song_name,
                artwork: song.song_thumb,
                artist: artist_name,
            }

            tracks.push(track_obj);
        })

        TrackPlayer.reset();
        TrackPlayer.add(tracks)
        TrackPlayer.play();

        


    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView}
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

                <View style={styles.view_image}>
                    <Image
                        style={styles.image}
                        source={{ uri: thumb }}
                        resizeMode='cover'
                    />
                    <LinearGradient
                        colors={[
                            'rgba(20, 20, 20, 0)',
                            'rgba(20, 20, 20, 0.4)',
                            'rgba(20, 20, 20, 0.7)',
                            'rgba(20, 20, 20, 0.9)',
                            'rgba(20, 20, 20, 1)']}
                        style={{
                            position: 'absolute',
                            height: HEIGHT * 0.4,
                            width: '100%'
                        }}
                    />

                    <View style={styles.view_title}>
                        <Text style={styles.title}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >{title}</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={playAllSong} style={{
                                marginVertical: HEIGHT * 0.015,
                                marginRight: WIDTH * 0.03
                            }}>
                                <Image source={require('../../assets/icons/ic_playcirle.png')}
                                    style={{
                                        width: HEIGHT * 0.06,
                                        height: HEIGHT * 0.06,
                                        tintColor: main_color,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                color: text_color,
                                fontSize: HEIGHT * 0.02,
                            }}>Play</Text>
                        </View>
                    </View>


                    <ButtonBack navigation={navigation} />

                </View>

                {state.songs.length > 0 &&
                    <>
                        {state.songs.map((song, index) => {
                            return <SongItem
                                key={song.song_id}
                                url={song.song_thumb}
                                song_name={song.song_name}
                                onPress={() => playWithSelectedSong(song)}
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
    scrollView: {
        backgroundColor: bg_color
    },

    view_image: {
        height: HEIGHT * 0.4,
        marginBottom: HEIGHT * 0.03
    },

    view_title: {
        position: 'absolute',
        height: HEIGHT * 0.4,
        width: WIDTH,
        justifyContent: 'flex-end',
        paddingHorizontal: WIDTH * 0.06
    },

    title: {
        color: 'white',
        fontSize: HEIGHT * 0.045,
        fontWeight: 'bold',
    },

    image: {
        height: '100%',
        width: '100%',
    }
})

export default PlaylistDetailScreen