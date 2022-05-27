import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/outline';
import React,{useState,useRef,useEffect} from 'react'
import { useDataLayerValue } from './DataLayer';

function Footer() {

  const [{ current_song_id, isplaying,playlist_songs,song_num,songdetails},dispatch]=useDataLayerValue();
  // console.log("Playlist r gan gulo -->",playlist_songs);
  // console.log("onno bhbe aita->",current_song_id);
  // console.log("Song details are",songdetails);

  const handlePlayPause =()=>{
     
    dispatch(
      {
        type:"IS_PLAYING",
        isplaying: !isplaying,
      }
    );

  }

  const prevSongPlay=()=>{
    dispatch(
      {
        type:"IS_PLAYING",
        isplaying: !isplaying,
      }
    );
    
    dispatch(
      {
        type:"SET_CURRENT_SONG",
        current_song_id: song_num>0 ? playlist_songs.tracks.items[song_num-1].track : playlist_songs.tracks.items[playlist_songs.tracks.items.length-1].track,
      }
    )

    dispatch(
      {
        type:"SONG_NUMER",
        song_num:song_num>0 ? song_num-1 : playlist_songs.tracks.items.length-1,
      }
    )
    //console.log("Song number is",song_num);

  }

  const nextSongPlay=()=>{
    dispatch(
      {
        type:"IS_PLAYING",
        isplaying: !isplaying,
      }
    );

    
    dispatch(
      {
        type:"SET_CURRENT_SONG",
        current_song_id: song_num < playlist_songs?.tracks?.items?.length-1 ? playlist_songs.tracks.items[song_num+1].track : playlist_songs.tracks.items[0].track,
      }
    );

    dispatch(
      {
        type:"SONG_NUMER",
        song_num:song_num < playlist_songs?.tracks?.items?.length-1  ? song_num+1 : 0,
      }
    )
    //console.log("Song number is",song_num);

  }

  const playAgain=()=>{

    

    dispatch(
      {
        type:"IS_PLAYING",
        isplaying: !isplaying,
      }
    );
    dispatch(
      {
        type:"SET_CURRENT_SONG",
        current_song_id: current_song_id,
      }
    )

    dispatch(
      {
        type:"SONG_NUMER",
        song_num:song_num,
      }
    )
   
  }

  const randomPlay=()=>{
    dispatch(
      {
        type:"IS_PLAYING",
        isplaying: !isplaying,
      }
    );
    dispatch(
      {
        type:"SET_CURRENT_SONG",
        current_song_id: playlist_songs.tracks.items[Math.floor(Math.random()*(playlist_songs.tracks.items.length))].track,
      }
    )
  }

  //console.log("this song is",current_song_id);
  
  const [trackProgress,setTrackProgress]=useState(0);
  var audioSrc=current_song_id.preview_url;
  const audioRef = useRef(new Audio(current_song_id?.preview_url));
  const intervalRef=useRef();

  const isReady=useRef(false);

  // const {duration}=audioRef.current;
  //console.log("Current Song id ",current_song_id,isplaying);

  const startTimer=()=>{
    clearInterval(intervalRef.current);

    intervalRef.current=setInterval(()=>{
      if(audioRef.current.ended)
      {
         nextSongPlay();
      }
      else{
        setTrackProgress(audioRef.current.currentTime);
      }
    },[1000]);
  };

  useEffect(() => {

    if(audioRef.current.src )
    {
      if(isplaying )
      {
        audioRef.current.play();
        startTimer();
      }
      else{
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  
    else{
        if(isplaying)
        {
          audioRef.current=new Audio(audioSrc);
          audioRef.current.play();
          startTimer();
        }
        else{
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
    }
    
  }, [isplaying]);

  useEffect(()=> {
    audioRef.current.pause();
    audioRef.current=new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if(isReady.current)
    {
      try{
        audioSrc.current?.play();
      }
      catch{
        console.log("No Song Preview available");
        nextSongPlay();
      }
      
        dispatch(
        {
          type:"IS_PLAYING",
          isplaying: !isplaying,
        }
      );
      startTimer();
    }
    else{
      isReady.current=true;
    }
    
  },[current_song_id]);

  useEffect(()=>{
    return()=>{
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  },[]);


  return (
      <div className="h-20 p-2 bg-gradient-to-b from-black to-gray-900 text-white
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8">

        {/* Left part */}
        <div className="flex items-center space-x-4">
            <div>
              <img className="hidden md:block h-10 w-10"
              src={current_song_id?.album.images?.[0]?.url} alt="" />
           </div>
           <div>
              <h3 className="truncate">{current_song_id?.name}</h3>
              <p>{current_song_id?.artists?.[0]?.name}</p>
           </div>
        </div>

         {/* Center part */}
         <div className="flex items-center justify-evenly">
           <SwitchHorizontalIcon onClick={randomPlay} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         
         <RewindIcon onClick={prevSongPlay} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         
         {isplaying ? (
           <PauseIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         ):(
           <PlayIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         )}

         <FastForwardIcon onClick={nextSongPlay} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         
         <ReplyIcon onClick={playAgain} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         </div>

         {/*Right Part*/ }
         <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
           <VolumeOffIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
           <input className="w-14 md:w-28" type="range" value="" min={0} max={100} />
           <VolumeUpIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"/>
         </div>
      

    </div>
  );
}

export default Footer
