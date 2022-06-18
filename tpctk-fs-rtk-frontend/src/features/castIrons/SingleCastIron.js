import { useSelector } from 'react-redux'
import { selectCastIronById } from './castIronSlice'

import { useParams } from 'react-router-dom'

const SingleCastIron = () => {

    const { castIronId } = useParams()

    const castIron = useSelector((state) => selectCastIronById(state, Number(castIronId)))

    if (!castIron) {
        return (
            <section>
                <h2>No Cast Iron Found!</h2>
            </section>
        )
    }

    return (
        <div className='bg-black hero min-h-screen text-white'>
            <div className='hero-content flex-col bg-gray-400 lg:flex-row'>
                <img className='max-w-sm rounded-lg' src={require(`../../assets/${castIron?.TPCTK_Code}.PNG`)} alt="4880-3"/>
                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl font-bold'>
                        <div>{castIron?.description}</div>
                    </h1>
                    <h2 className='py-6'>
                        <p>Vulcan Code: {castIron?.Vulcan_style_code}</p>
                        <p>SIP Code: {castIron?.SIP_code}</p>
                        <p>EJ Code: {castIron?.EJ_code}</p>
                        <p>Accucast Code: {castIron?.Accucast_code}</p>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default SingleCastIron