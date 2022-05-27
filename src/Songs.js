import React from 'react';
import { useDataLayerValue } from './DataLayer';
import Eachsong from './Eachsong';

function Songs() {
    const[{playlist_songs},dispatch]=useDataLayerValue();
  return (
    <div className="flex flex-col space-y-1 pb-28 text-white p-8">
        {
            playlist_songs?.tracks.items.map((track,i) => (
                <Eachsong key={track.track.id} track={track} order={i} />

            ))}
        
    </div>
  );
}

export default Songs