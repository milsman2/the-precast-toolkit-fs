import React from "react";

const CastIron = ({ castIron,  showCastIronInfoModal }) => {
	return (
		castIron && (
			<>
				<div
					onClick={(e) => {showCastIronInfoModal() ; e.stopPropagation()}} 
					className="flex flex-wrap items-end justify-between w-full transition duration-500 ease-in-out transform bg-black border-2 border-gray-600 rounded-lg hover:border-white mb-3"
				>
					<div className="w-full xl:w-1/4 md:w-1/4">
						<div className="h-full p-8 ">
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								Description: {castIron?.description}
							</h2>
							<h2 className="items-center mb-2 text-lg font-normal tracking-wide text-white">
								Label: {castIron?.label}
							</h2>
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								Vulcan Product Number: {castIron?.Vulcan_style_code}
							</h2>
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								SIP Product Number: {castIron?.SIP_code}
							</h2>
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								EJ Product Number: {castIron?.EJ_code}
							</h2>
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								Accucast Product Number: {castIron?.Accucast_code}
							</h2>
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default CastIron;