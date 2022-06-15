import { useSelector } from 'react-redux'
import { selectCastIronById } from './castIronSlice'

import { useParams } from 'react-router-dom'

const SingleCastIron = () => {

    const { castIronID } = useParams()

    const castIron = useSelector((state) => selectCastIronById(state, Number(castIronID)))

    if (!castIron) {
        return (
            <section>
                <h2>No Cast Iron Found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2 className='ml-8 p-1 text-grey-darker'>
                <p>Vulcan Code: {castIron?.Vulcan_style_code}</p>
                <p>SIP Code: {castIron?.SIP_code}</p>
                <p>EJ Code: {castIron?.EJ_code}</p>
                <p>Accucast Code: {castIron?.Accucast_code}</p>
            </h2> 
        </article>
    )
}

export default SingleCastIron