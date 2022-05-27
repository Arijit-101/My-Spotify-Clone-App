import React, { useState } from 'react';
import { useDataLayerValue } from './DataLayer';
import { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import Songs from './Songs';
import {ChevronDownIcon} from "@heroicons/react/outline";


  const colors=[
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500",
    
];

function Center() {

  const[{user,playlist_id,token,playlist_songs},dispatch]=useDataLayerValue();
  
  const [color,setColor]=useState(null);


  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  useEffect(() => {
    const color=colors[Math.floor(Math.random()*colors.length)];
    setColor(color);
  }, [playlist_id]);

  useEffect(() =>{
    spotifyApi.getPlaylist(playlist_id).then((data) =>{

      dispatch({
        type :'SET_PLAYLIST_SONGS',
        playlist_songs: data,  
      });
      //console.log("Hereeeee:",data);
    }).catch((err) => console.log("Something Went Wrong !",err));

  },[playlist_id]);

  //console.log(user);

  function refreshPage() {
    window.location.reload(false);
  };
  const [Dropdownvalue,Setdropdownvalue]=useState(false);

  function Dropdown(){
    Setdropdownvalue(!Dropdownvalue);
  };
  function MouseLeave()
  {
    Setdropdownvalue(false);
  }
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide ">
        
        <div className="absolute top-5 right-8 cursor-pointer" onMouseLeave={MouseLeave} >
          <div className={`flex items-center bg-gray-900 space-x-3  opacity-90 hover:opacity-80 curson-pointer rounded-full p-1 pr-2 text-white`}>
            <img className="rounded-full w-10 h-10" src={user?.images[0]?.url} alt="User Image" />
              <h2 className="curson-pointer">{user?.display_name}</h2>
              <ChevronDownIcon className="h-5 w-5" onClick={Dropdown}/>
          </div>
         <div className="m-1 p-1">
            {Dropdownvalue ?(<div className="items-center bg-black space-x-3 opacity-90 hover:bg-gray-900 rounded-full  p-3 text-white" id="myDropdown"><p className="flex justify-center items-center" onClick={refreshPage}>Log out</p></div>):null}
          </div>
        </div>
       

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
          <img className="h-44 w-44" src={playlist_songs?.images?.[0]?.url} alt="" />
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist_songs?.name}</h1>
            {/* <p>PLAYLIST</p>
            <p>PLAYLIST</p>
            <p>PLAYLIST</p> */}
            
          </div>
        </section>

        <div>
          <Songs/>
        </div>

    </div>
  )
}

export default Center