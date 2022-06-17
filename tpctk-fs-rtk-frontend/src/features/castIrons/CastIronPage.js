import { useSelector } from 'react-redux'
import { selectAllCastIrons } from './castIronSlice'
import { useGetCastIronsQuery } from './castIronSlice'
import CastIronCard from './CastIronCard'

const CastIronPage = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCastIronsQuery();

    const castIrons = useSelector(state => selectAllCastIrons(state))

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = castIrons.map(castIron => (
            <CastIronCard key={castIron?.id} castIron={castIron} />
        ))
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section className='bg-black text-white w-full relative flex flex-col items-center flex-1 overflow-y-scroll'>
            <h1 className='text-3xl font-medium p-4'>
                Cast Iron Database
            </h1>
            <div className='max-w-[1240px] mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                { content }
            </div>
        </section>
    )
}

export default CastIronPage