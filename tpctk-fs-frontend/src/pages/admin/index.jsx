import React, { useEffect, useState } from "react";
import FastAPIClient from "../../client";
import config from "../../config";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import CastIronTable from '../../components/CastIronTable';
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { NotLoggedIn } from "./NotLoggedIn";
import Loader from "../../components/Loader";
import PopupModal from "../../components/Modal/PopupModal";

const client = new FastAPIClient(config);

const ProfileView = ({ castIrons }) => {
	return (
		<>
			<CastIronTable
				castIrons={castIrons}
				
				showUpdate={true}
			/>
			
		</>
	);
};

const AdminDashboard = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState({ label: "", Vulcan_style_code: "", Accucast_code: "", EJ_code: "", SIP_code: "", description: "" });
	const [castIronForm, setCastIronForm] = useState({
		label: "",
		Vulcan_style_code: "",
		Accucast_code: "",
		EJ_code: "",
		SIP_code: "",
		description: ""
	});

	const [showForm, setShowForm] = useState(false);
	const [castIrons, setCastIrons] = useState([]);

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(true);

	useEffect(() => {
		fetchCastIrons();
	}, []);

	const fetchCastIrons = () => {
		client.getAllCastIron().then((data) => {
			setRefreshing(false);
			setCastIrons(data?.results);
		});
	};

	const onCreateCastIron = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);

		if (castIronForm.label.length <= 0) {
			setLoading(false);
			return setError({ label: "Please Enter Cast Iron Label" });
		}
		if (castIronForm.Vulcan_style_code.length <= 0) {
			setLoading(false);
			return setError({ Vulcan_style_code: "Please Enter Vulcan Style Code" });
		}
		if (castIronForm.SIP_code.length <= 0) {
			setLoading(false);
			return setError({ SIP_code: "Please Enter SIP Code" });
		}
		if (castIronForm.EJ_code.length <= 0) {
			setLoading(false);
			return setError({ EJ_code: "Please Enter EJ Code" });
		}
		if (castIronForm.Accucast_code.length <= 0) {
			setLoading(false);
			return setError({ Accucast_code: "Please Enter Accucast Code" });
		}
		if (castIronForm.description.length <= 0) {
			setLoading(false);
			return setError({ description: "Please Enter description" });
		}


		client.fetchUser().then((user) => {
			client
				.createCastIron(
					castIronForm.label,
					castIronForm.Vulcan_style_code,
					castIronForm.SIP_code,
					castIronForm.EJ_code,
					castIronForm.Accucast_code,
					castIronForm.description	,
					user?.id
				)
				// eslint-disable-next-line no-unused-vars
				.then((data) => {  // eslint:ignore
					fetchCastIrons();
					setLoading(false);
					setShowForm(false);
				});
		});
	};

	useEffect(() => {
		const tokenString = localStorage.getItem("token");
		if (tokenString) {
			const token = JSON.parse(tokenString);
			const decodedAccessToken = jwtDecode(token.access_token);
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
				setIsLoggedIn(true);
			}
		}
	}, []);

	if (refreshing) return !isLoggedIn ? <NotLoggedIn /> : <Loader />;

	return (
		<>
			<section
				className="flex flex-col bg-black text-center"
				style={{ minHeight: "100vh" }}
			>
				<div className="container px-5 pt-6 text-center mx-auto lg:px-20">
						{/*TODO - move to component*/}
					<h1 className="mb-12 text-3xl font-medium text-white">
						Full Stack Inventory
					</h1>

					<button
						className="my-5 text-white bg-teal-500 p-3 rounded"
						onClick={() => {
							setShowForm(!showForm);
						}}
					>
						Create Cast Iron
					</button>

					<p className="text-base leading-relaxed text-white">Latest cast iron</p>
					<div className="mainViewport text-white">
						{castIrons.length && (
							<ProfileView
								castIrons={castIrons}
							/>
						)}
					</div>
				</div>

			</section>
			{showForm && (
				<PopupModal
					modalTitle={"Create Cast Iron"}
					onCloseBtnPress={() => {
						setShowForm(false);
						setError({ fullName: "", email: "", password: "" });
					}}
				>
					<div className="mt-4 text-left">
						<form className="mt-5" onSubmit={(e) => onCreateCastIron(e)}>
							<FormInput
								type={"text"}
								name={"label"}
								label={"Label"}
								error={error.label}
								value={castIronForm.label}
								onChange={(e) =>
									setCastIronForm({ ...castIronForm, label: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"Vulcan_style_code"}
								label={"Vulcan Style Code"}
								error={error.Vulcan_style_code}
								value={castIronForm.Vulcan_style_code}
								onChange={(e) =>
									setCastIronForm({ ...castIronForm, Vulcan_style_code: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"SIP_code"}
								label={"SIP Code"}
								error={error.SIP_code}
								value={castIronForm.SIP_code}
								onChange={(e) =>
									setCastIronForm({ ...castIronForm, SIP_code: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"EJ_code"}
								label={"EJ Code"}
								error={error.EJ_code}
								value={castIronForm.EJ_code}
								onChange={(e) =>
									setCastIronForm({ ...castIronForm, EJ_code: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"Accucast_code"}
								label={"Accucast_code"}
								error={error.Accucast_code}
								value={castIronForm.Accucast_code}
								onChange={(e) =>
									setCastIronForm({ ...castIronForm, Accucast_code: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"description"}
								label={"Description"}
								error={error.description}
								value={castIronForm.description}
								onChange={(e) =>
									setCastIronForm({ ...castIronForm, description: e.target.value })
								}
							/>
							<Button
								loading={loading}
								error={error.source}
								title={"Create Cast Iron"}
							/>
						</form>
					</div>
				</PopupModal>
			)}
		</>
	);
};

export default AdminDashboard;