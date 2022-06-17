import video from '../../assets/video.mp4'

const Home = () => {
     return (
          <>
               <section className="bg-black text-white relative flex flex-col flex-1 overflow-hidden">
                    <h2 className='px-10 text-xl p-4 flex flex-1'>
                         A Kubernetes orchestrated React - FastAPI - PostgreSQL Stack
                    </h2>
                    <div className='flex flex-col object-center object-contain opacity-75'>
                         <video className='w-auto h-2/3' src={video} autoPlay loop muted />
                    </div>
               </section>
          </>
     )
}

export default Home