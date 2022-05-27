import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function Eachsong({ order, track }) {
	const [{ current_song_id, isplaying, _token, songdetails }, dispatch] =
		useDataLayerValue();

	const spotifyApi = new SpotifyWebApi();

	const clickedsong = () => {

        //console.log("Clickedsong is clicked");
		dispatch({
			type: "SET_CURRENT_SONG",
			current_song_id: track?.track,	
		});
		dispatch({
			type: "IS_PLAYING",
			isplaying: true,
		});
        dispatch(
            {
                type:"SONG_DETAILS",
                songdetails:track,
            }
        );
        dispatch(
            {
                type:"SONG_NUMER",
                song_num:order,
            }
        );

        //console.log("Current Song aita ->",track?.track?.id);    
	}
 
	return (
		<div
			className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer'
			onClick={clickedsong}
		>
			<div className='flex items-center space-x-4'>
				<p>{order + 1}</p>
				<img
					className='h-10 w-10'
					src={track.track.album.images[0].url}
					alt=''
				/>
				<div>
					<p className='w-36 lg:w-64 truncate text-white'>{track.track.name}</p>
					<p className='w-40'>{track.track.artists[0].name}</p>
				</div>
			</div>

			<div className='flex item-center justify-between ml-auto md:ml-0'>
				<p className='w-40 hidden md:inline '>{track.track.album.name}</p>
				<p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
			</div>
		</div>
	)
}

export default Eachsong;
