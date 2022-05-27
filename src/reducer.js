export const initialState={
    user:null,
    playlists:[],
    playing:false,
    item:null,
    token :null,
    playlist_id:"2B7o0M0WgBlNx87AKaUYWm",
    playlist_songs:null,
    current_song_id :null,
    isplaying: true,
    songdetails:null,
    song_num:0,

    //token: 'BQBHiXyUkOmRuib00hqoA5xIB1r_cm3zoSnUoJHRr_HVjSrL7IH4BTORF7naftoZrsMrz0BP6Rh4wiIa9i09eZ3vd-72XwKEXUzLfmrivyrSNJ3vIq5EoSOjNOEYFcIKrlgRyfh6t5peq3uiGnFHWcq3SCHCheKWhfa_Ixrgdq6jrzmZ'
}

const reducer=(state,action) =>{
    console.log(action);

    switch(action.type)
    {
        case "SET_USER":
            return {
                ...state,
                user:action.user,
            };
        case "SET_TOKEN":
            return{
                ...state,
                token: action.token,
            };
        case "SET_PLAYLISTS":
            return{
                ...state,
                playlists: action.playlists,
            };
        case "SET_PLAYING_ID":
            return{
                ...state,
                playlist_id: action.playlist_id,
            };
        
        case "SET_PLAYLIST_SONGS":
            return{
                ...state,
                playlist_songs: action.playlist_songs,
            };

        case "SET_CURRENT_SONG":
            return{
                ...state,
                current_song_id: action.current_song_id,
            };

        case "IS_PLAYING":
            return{
                ...state,
                isplaying: action.isplaying,
            }
        case "SONG_DETAILS":
            return{
                ...state,
                songdetails:action.songdetails,
            }

        case "SONG_NUMER":
            return{
                ...state,
                song_num: action.song_num,
            }

        default:
            return state;
    }
}

export default reducer;
