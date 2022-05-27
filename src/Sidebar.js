import React, { useState } from 'react'

import{
    HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon, HeartIcon, RssIcon,
} from "@heroicons/react/outline";
import { useDataLayerValue } from './DataLayer';
function Sidebar() {

    const[{playlists},dispatch]=useDataLayerValue();
    const[playlistid,setPlaylistid]=useState(null);
    // console.log(playlists.items);
    // console.log("You picked ->",playlists.id);


  return (
    <div className="text-gray-500 p-5 pb-36 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem]
    hidden md:block">
      
          <div className="space-y-4 cursor-pointer">
            <div><img className="h-20" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" /></div>
            
        <div className="flex items-center space-x-3 hover:text-white transition transform duration-200 ease-out">
            <HomeIcon className="h-7 w-7"/>
            <p>Home</p>
        </div>
        <div className="flex items-center space-x-3 hover:text-white transition transform duration-200 ease-out">
            <SearchIcon className="h-7 w-7"/>
            <p>Search</p>
        </div>
        <div className="flex items-center space-x-3 hover:text-white transition transform duration-200 ease-out">
            <LibraryIcon className="h-7 w-7"/>
            <p>Library</p>
        </div>
        <hr className="border-t-[0.1px] border-gray-900"/>
        
        
        <div className="flex items-center space-x-3 hover:text-white transition transform duration-200 ease-out">
            <PlusCircleIcon className="h-7 w-7"/>
            <p>Create Playlist</p>
        </div>
        <div className="flex items-center space-x-3 hover:text-white transition transform duration-200 ease-out">
            <HeartIcon className="h-7 w-7"/>
            <p>Liked Songs</p>
        </div>
        <div className="flex items-center space-x-3 hover:text-white transition transform duration-200 ease-out">
            <RssIcon className="h-7 w-7"/>
            <p>Your episodes</p>
        </div>
        <hr className="border-t-[0.1px] border-gray-900"/>

        {playlists?.items?.map((playlist) => (
            <p key={playlist.id} onClick={ ()=> {
                dispatch({
                    type :'SET_PLAYING_ID',
                    playlist_id: playlist.id,  
                    // setPlaylistid(playlist.id),
                  })
                  console.log(playlist.id);
            }} className="cursor-pointer hover:text-white  transition transform duration-400 ease-out pb-2"> {playlist.name}</p>
        ))}
        
         
        </div>
        
    </div>
  )
}

export default Sidebar