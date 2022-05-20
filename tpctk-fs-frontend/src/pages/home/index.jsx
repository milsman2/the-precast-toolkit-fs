import React from 'react';
import CastIron from "../../components/CastIron";


const Home = () => {

     return (
          <>
               <section className="bg-black text-white w-full relative flex flex-col">
                    <h1 className="mb-6 text-3xl font-medium">
                         The Precast Toolkit - A Kubernetes orchestrated React - FastAPI - PostgreSQL Stack
                    </h1>
                    <CastIron />
               </section>
          </>
     )
}

export default Home;