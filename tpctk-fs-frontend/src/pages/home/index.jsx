import React from 'react';
import CastIron from "../../components/CastIron";
import useToggle from '../../hooks/useToggle'


const Home = () => {

     const [isTextChanged, setIsTextChanged] = useToggle('');


     return (
          <>
               <section className="bg-black text-white h-screen w-full relative">
                    <div className="absolute top-0 w-full h-full flex flex-col p-4">
                         <h1 className="mb-6 text-3xl font-medium">
                              The Precast Toolkit - A Kubernetes orchestrated React - FastAPI - PostgreSQL Stack
                         </h1>
                         <button className='bg-stone-800 text-grey' onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
                         <CastIron />
                    </div>
               </section>
          </>
     )
}

export default Home;