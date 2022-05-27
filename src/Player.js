import React from 'react'
import Sidebar from './Sidebar';
import Center from './Center';
import Footer from './Footer';
import { useDataLayerValue } from './DataLayer';

function Player() {

  const [{ current_song_id}]=useDataLayerValue();
  return (

    <div>
        <div className="bg-black h-screen overflow-hidden">
          <main className="flex ">
            <Sidebar />
           <Center/>  
          </main>

        {
          current_song_id && <div className="sticky bottom-0"><Footer/></div> 
        }
          {/* <div className="sticky bottom-0"><Footer/></div> */}
        </div>
        
        
    </div>
    
  );
}

export default Player