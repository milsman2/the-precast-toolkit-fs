import React from 'react';
import SETForm from '../../components/SETForm'

const Calculations = () => {
    return (
        <section className="bg-black text-white h-screen w-full relative">
            <div className="absolute top-0 w-full h-full p-4">
                <h1 className="mb-6 text-3xl font-medium flex items-center justify-center">
                    SET Form Calculations
                </h1>
                <div className='flex items-center justify-center'>
                    <SETForm />
                </div>
            </div>
        </section>
    )
}

export default Calculations