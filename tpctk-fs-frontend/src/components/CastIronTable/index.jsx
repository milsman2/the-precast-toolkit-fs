import CastIron from '../CastIron/CastIron';
import React, {useState} from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";

const CastIronTable = ({castIrons}) => {

  const [castIronInfoModal, setCastIronInfoModal] = useState(false)

    return (
      <>
        <div>
          {castIrons.length && (
			castIrons.map((castIron) => (
                <CastIron showCastIronInfoModal={() => castIronInfoModal(castIron)} key={castIron.id} castIron={castIron}  />
              ))
          )}
          {!castIrons.length && (
              <p>No cast iron found!</p>
          )}
        </div>
        {castIronInfoModal && <PopupModal
						modalTitle={"Cast Iron Info"}
						onCloseBtnPress={() => {
							setCastIronInfoModal(false);
						}}
					>
						<div className="mt-4 text-left">
							<form className="mt-5">
								<FormInput
									disabled
									type={"text"}
									name={"label"}
									label={"Label"}
									value={castIronInfoModal?.label}
								/>
								<FormInput
									type={"text"}
									name={"Vulcan_style_code"}
									label={"Vulcan Style Code"}
									value={castIronInfoModal?.Vulcan_style_code}
								/>
								<FormInput
									type={"text"}
									name={"SIP_code"}
									label={"SIP Code"}
									value={castIronInfoModal?.SIP_code}
								/>
								<FormInput
									type={"text"}
									name={"EJ_code"}
									label={"EJ code"}
									value={castIronInfoModal?.EJ_code}
								/>
								<FormInput
									type={"text"}
									name={"Accucast_code"}
									label={"Accucast_code"}
									value={castIronInfoModal?.Accucast_code}
								/>
								<FormInput
									type={"text"}
									name={"description"}
									label={"Description"}
									value={castIronInfoModal?.description}
								/>
							</form>
						</div>
					</PopupModal>}
      </>
    )
}

export default CastIronTable;