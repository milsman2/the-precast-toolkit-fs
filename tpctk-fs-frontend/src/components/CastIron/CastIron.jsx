import React from "react";

const CastIron = ({ castIron,  showCastIronInfoModal }) => {
	return (
		castIron && (
			<>
				<div
					onClick={(e) => {showCastIronInfoModal() ; e.stopPropagation()}} 
					className="w-full transition duration-500 ease-in-out transform bg-black border-2 border-gray-600 rounded-lg hover:border-white mb-3"
				 />
				<div className='w-full py-[10rem] px-4 bg-white'>
					<div className='max-w-[1240px] mx-auto md:grid-cols-3 gap-8'>
						<div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale(105) text-teal-500'>
							<h2 className='text-2xl font-bold text-center py-8'>{castIron?.description}</h2>
							<p className='text-center text-4xl font-bold'>Industry Standard Code: {castIron.Vulcan_style_code}</p>
							<div className='text-center font-medium'>
								<p className='py-2 border-b mx-8 mt-8'>SIP Code: {castIron?.SIP_code}</p>
								<p className='py-2 border-b mx-8'>EJ Code: {castIron?.EJ_code}</p>
								<p className='py-2 border-b mx-8'>Accucast Code: {castIron?.Accucast_code}</p>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default CastIron