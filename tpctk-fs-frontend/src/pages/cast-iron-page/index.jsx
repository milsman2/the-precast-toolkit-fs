import React from 'react';
import CastIron from "../../components/CastIron";


const CastIronPage = () => {

     return (
          <>
               <section className="bg-black text-white w-full relative flex flex-col items-center flex-1 overflow-y-scroll">
                    <h1 className="mb-6 text-3xl font-medium p-4">
                         Cast Iron Database
                    </h1>
                    <CastIron />
               </section>
          </>
     )
}

export default CastIronPage