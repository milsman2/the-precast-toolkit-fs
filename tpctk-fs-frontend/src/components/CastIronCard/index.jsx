import React from 'react'

const CastIronCard = ({castIron}) => {

    return (
        <div className='flex flex-wrap'>
            <article className='overflow-hidden rounded-lg shadow-lg bg-stone-500'>
                <header className='leading-tight p-2 md:p-4'>
                    <h1 className="text-lg">
                        <div>{castIron?.description}</div>
                    </h1>
                </header>
                <h2 className='ml-8 p-1 text-grey-darker text-sm'>
                    <p>Vulc an Code: {castIron?.Vulcan_style_code}</p>
                    <p>SIP Code: {castIron?.SIP_code}</p>
                    <p>EJ Code: {castIron?.EJ_code}</p>
                    <p>Accucast Code: {castIron?.Accucast_code}</p>
                </h2>
            </article>
        </div>
  )
}


export default CastIronCard