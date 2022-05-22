import React from 'react';
import video from '../../assets/video.mp4'

const Home = () => {
     return (
          <>
               <section className="bg-black text-white relative flex flex-col justify-centern flex-1 overflow-y-scroll">
                    <h2 className='px-10 text-xl p-4 flex'>
                         A Kubernetes orchestrated React - FastAPI - PostgreSQL Stack
                    </h2>
                    <video className='flex flex-1' src={video} autoPlay loop muted />
               </section>
          </>
     )
}

export default Home;