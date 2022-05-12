import CastIronCard from '../CastIronCard';

const CastIron = ({castIrons}) => {

    return (
      <>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4'>
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
    )
}

export default CastIron;