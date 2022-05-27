import React,{useEffect , useState} from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify=new SpotifyWebApi();

function App() {

const [{user,token},dispatch]=useDataLayerValue();

  useEffect(() => {
      const token_object =getTokenFromUrl();
      window.location.hash="";
  
      const _token=token_object.access_token;

      console.log("Token is",_token);

      if(_token)
      {
        dispatch({
          type :'SET_TOKEN',
          token: _token,
        });
        
        spotify.setAccessToken(_token);

        spotify.getMe().then(user=>{
         console.log("Hi",user);

          dispatch({
            type :'SET_USER',
            user: user,
          })
        });

        spotify.getUserPlaylists().then((playlists)=>{

          console.log("PLAYLISTS GENERATED");

          dispatch({
              type:"SET_PLAYLISTS",
              playlists:playlists,
          });
        });

        // const data=spotify.getPlaylist('2B7o0M0WgBlNx87AKaUYWm');
        // console.log("Pls dekhbhai",data);
      }
    
  }, []);

  // console.log("Hi",user);
  // console.log("bye",token);

	return (
    <div className='app'>
      {/* Spotify Login */}
      
      {!token && <Login />}
      {token && <Player/>}

  </div>

  
  );
}

export default App;
