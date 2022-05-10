import React, { useEffect, useState } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';
import CastIronTable from "../../components/CastIronTable";
import Loader from '../../components/Loader';

const client = new FastAPIClient(config);


const Home = () => {

     const [loading, setLoading] = useState(true)
     const [castIrons, setCastIrons] = useState([])
     const [searchValue, setSearchValue] = useState("grate")

     useEffect(() => {
          // FETCH THE CAST IRON
          fetchCastIrons()
     }, [])


     const fetchCastIrons = (search) => {

          if (searchValue?.length <= 0 && search)
               return alert("Please Enter Search Text")

          // SET THE LOADER TO TRUE
          setLoading(true)

          // GET THE CAST IRON FROM THE API
          client.getCastIrons(searchValue).then((data) => {
               setLoading(false)

               // SET THE CAST IRON DATA
               setCastIrons(data?.results)
          });
     }


     if (loading)
          return <Loader />

     return (
          <>
               <section className="bg-black ">
                    <div className="container px-5 py-12 mx-auto lg:px-20">
                         <div className="pb-6 mb-12 text-white ">
                              <h1 className="mb-6 text-3xl font-medium text-white">
                                   The Full Stack Precast Toolkit - A React + FastAPI Kubernetes Project
                              </h1>
                              <div className="container flex justify-center items-center mb-6">
                                   <div className="relative w-full max-w-xs m-auto">
                                        <input
                                             type="text"
                                             onChange={(e) => setSearchValue(e.target.value)}
                                             className={`text-teal-500 hover:text-teal-700 h-14 w-full max-w-xs m-auto pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none`} placeholder="Search cast iron..." />
                                        <div className="absolute top-2 right-2">
                                             <button onClick={() => fetchCastIrons(true)} className="h-10 w-20 text-white rounded bg-teal-500 hover:bg-teal-600">Search</button>
                                        </div>
                                   </div>
                              </div>
                              <div>
                                   <CastIronTable
                                        castIrons={castIrons}
                                   />
                              </div>
                         </div>
                    </div>
               </section>
          </>
     )
}

export default Home;