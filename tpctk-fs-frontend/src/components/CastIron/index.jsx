import { useEffect } from 'react'
import axios from '../../apis/tpctk-fs-api';
import useAxiosFunction from "../../hooks/useAxiosFunction";
import CastIronCard from '../../components/CastIronCard'

const CastIron = () => {

    const [castIrons, error, loading, axiosFetch] = useAxiosFunction();

    const getData = () => {
      axiosFetch({
        axiosInstance: axios,
        method: 'get',
        url: '/cast_iron/all-cast-iron/'
      });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <article>
          {loading && <p>Loading...</p>}
          {!loading && error && <p className="errMsg">{error}</p>}
          {!loading && !error && 
          <>
              <div className='max-w-[1240px] mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {castIrons.length && (
                  castIrons.map((castIron) => (
                      <CastIronCard key={castIron.id} castIron={castIron}  />
                    ))
                )}
                {!castIrons.length && (
                    <p>No cast iron found!</p>
                )}
              </div>
          </>
          }
        </article>
    );
}

export default CastIron;