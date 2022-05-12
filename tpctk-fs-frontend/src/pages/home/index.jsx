import React, { useEffect, useState } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';
import CastIron from "../../components/CastIron";
import Loader from '../../components/Loader';

const client = new FastAPIClient(config);


const Home = () => {

     const [loading, setLoading] = useState(true)
     const [castIrons, setCastIrons] = useState([])

     useEffect(() => {
          // FETCH THE CAST IRON
          fetchCastIrons()
     }, [])

     const fetchCastIrons = () => {

          setLoading(true)

          // GET THE CAST IRON FROM THE API
          client.getAllCastIron().then((data) => {
               setLoading(false)

               // SET THE CAST IRON DATA
               setCastIrons(data?.results)
          });
     }

     if (loading)
          return <Loader />

     return (
          <>
               <section className="flex flex-col flex-wrap py-6 lg:px-10 bg-black">
                    <div className="text-white mb-6">
                         <h1 className="text-3xl font-medium">
                              The Precast Toolkit - A Kubernetes orchestrated React - FastAPI - PostgreSQL Stack
                         </h1>
                         <div className='container mx-auto'>
                              <CastIron castIrons = {castIrons} />
                         </div>
                    </div>
               </section>
          </>
     )
}

export default Home;