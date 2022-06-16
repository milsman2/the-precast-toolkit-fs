import { useSelector } from 'react-redux'
import { selectCastIronById } from './castIronSlice'
import V4880 from '../../assets/V4880.PNG'

import { useParams } from 'react-router-dom'

const SingleCastIron = () => {

    const { castIronId } = useParams()

    const castIron = useSelector((state) => selectCastIronById(state, Number(castIronId)))

    console.log(castIronId)

    if (!castIron) {
        return (
            <section>
                <h2>No Cast Iron Found!</h2>
            </section>
        )
    }

    return (
        <div className='bg-black text-white flex-col p-6 flex-1 content-center justify-center items-center'>
            <article className='bg-gradient-to-t from-stone-400 overflow-hidden rounded-lg shadow-lg h-full flex flex-row items-center justify-center'>
                <div className='flex flex-col items-center'>
                    <header className='p-4 md:p-4'>
                        <h1 className="text-lg">
                            <div>{castIron?.description}</div>
                        </h1>
                    </header>
                    <h2 className='ml-8 p-1 text-grey-darker'>
                        <p>Vulcan Code: {castIron?.Vulcan_style_code}</p>
                        <p>SIP Code: {castIron?.SIP_code}</p>
                        <p>EJ Code: {castIron?.EJ_code}</p>
                        <p>Accucast Code: {castIron?.Accucast_code}</p>
                    </h2>
                </div>
                <img className='h-96 object-cover' src={V4880} alt="4880-3"/>
            </article>
        </div>
    )
}

export default SingleCastIron