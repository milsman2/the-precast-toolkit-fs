import { Link } from 'react-router-dom';

const CastIronCard = ({castIron}) => {

    return (
        <article className='overflow-hidden rounded-lg shadow-lg bg-stone-500'>
            <header className='flex items-center justify-between leading-tight p-2 md:p-4'>
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
            <Link to={`${castIron?.id}`}>View Cast Iron</Link>
        </article>
  )
}


export default CastIronCard