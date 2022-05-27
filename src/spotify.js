// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";

//const redirectUri ="http://localhost:3000/";
const redirectUri="https://arijit-101.github.io/My-Spotify-Clone-App/";

  //Original my account
 const clientId="0f67a9d264814303a33d63f22b8d8bf1";  

  //Another Demo Account
//const clientId="e37e59df294344d69cd339cecdf49d6c";  

const scopes = [
  
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-read-private",
        "streaming",
        "user-read-private",
        "user-library-read",
        "user-top-read",
         "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-follow-read",
  ];

  export const getTokenFromUrl =()=>{
    return window.location.hash.substring(1).split('&').reduce((initial,item)=>{
      let parts=item.split('=');
      initial[parts[0]]=decodeURIComponent(parts[1]);
      return initial;
    },{});
  }

  export const loginUrl=`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

  //https://accounts.spotify.com/authorize?client_id=0f67a9d264814303a33d63f22b8d8bf1&redirect_uri=http://localhost:3000/&scope=user-read-email%20playlist-read-private%20playlist-read-collaborative%20playlist-read-private&response_type=token&show_dialog=true