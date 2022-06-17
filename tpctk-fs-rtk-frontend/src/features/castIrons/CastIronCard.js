import { Link } from 'react-router-dom'
import V4880 from '../../assets/V4880.PNG'

const CastIronCard = ({castIron}) => {

    return (
        <div className='card bg-gray-500'>
            <figure>
                <img src={V4880} alt="4880-3"/>
            </figure>
            <div className='card-body items-center text-center'>
                <h2 className='card-title'>{castIron?.description}</h2>
                <p>Vulcan Code: {castIron?.Vulcan_style_code}</p>
                <p>SIP Code: {castIron?.SIP_code}</p>
                <p>EJ Code: {castIron?.EJ_code}</p>
                <p>Accucast Code: {castIron?.Accucast_code}</p>
                <div className='card-actions justify-center'>
                    <button className='btn glass'>
                        <Link to={`${castIron?.id}`}>View Cast Iron</Link>
                    </button>
                </div>
            </div>
        </div>
  )
}


export default CastIronCard