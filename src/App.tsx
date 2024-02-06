import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./assets/index.css";
import { ToastProps } from "./ToastNotification";
import { SideBarMode, User } from "./store/dataInterfaces";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MainApp from "./MainApp";
import { PER_TOKEN_PRICE_INPUT, PER_TOKEN_PRICE_OUTPUT } from "./constants";
import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";

export default function App(): JSX.Element {
	const [toast, setToast] = useState<ToastProps>();
	const [user, setUser] = useState<User>();
	const [showProfileLoader, setShowProfileLoader] = useState<boolean>(false);
	const [aiPrompt, setAiPrompt] = useState<string>("");
	const [aiResult, setAiResult] = useState<string>("");
	const [sideBarMode, setSideBarMode] = useState<SideBarMode>();
	const [isGetPremiumModalOpen, setIsGetPremiumModalOpen] = useState(false);

	useEffect(() => {
		const mongo = new MongoDbClient();
		if (user?.pro || user?.subscriptionPeriodEndDateEpochSeconds) {
			if (aiPrompt && aiResult) {
				const totalCharsInQues = aiPrompt.length;
				const totalCharsInResponses = aiResult.length;
				const totalInputCost = totalCharsInQues * PER_TOKEN_PRICE_INPUT;
				const totalOutputCost =
					totalCharsInResponses * PER_TOKEN_PRICE_OUTPUT;
				const totalCost = totalInputCost + totalOutputCost;
				mongo
					.findOne(USERS_COLLECTION, {
						email: user.email,
					})
					.then((res) => {
						if (res) {
							const updatedCost = res.totalCost
								? res.totalCost + totalCost
								: totalCost;
							mongo
								.updateOne(
									USERS_COLLECTION,
									{
										email: user.email,
									},
									{
										$set: {
											totalCost: updatedCost,
										},
									}
								)
								.then((res) => {
									//res
								});
						}
					});
			}
		}
	}, [aiPrompt, aiResult]);
	return (
		<>
			<BrowserRouter>
				<NavBar
					setToast={setToast}
					showProfileLoader={showProfileLoader}
					setUser={setUser}
					user={user}
					setAiPrompt={setAiPrompt}
					setAiResult={setAiResult}
					aiResult={aiResult}
					aiPrompt={aiPrompt}
					setSideBarMode={setSideBarMode}
					sideBarMode={sideBarMode}
					isGetPremiumModalOpen={isGetPremiumModalOpen}
					setIsGetPremiumModalOpen={setIsGetPremiumModalOpen}
				/>
				<Routes>
					<Route
						path="/"
						index
						element={
							<MainApp
								user={user}
								setUser={setUser}
								toast={toast}
								setToast={setToast}
								setShowProfileLoader={setShowProfileLoader}
								aiPrompt={aiPrompt}
								setAiPrompt={setAiPrompt}
								aiResult={aiResult}
								setAiResult={setAiResult}
								setSideBarMode={setSideBarMode}
							/>
						}
					/>
					<Route
						path="/reset-password/*"
						element={
							<MainApp
								user={user}
								setUser={setUser}
								toast={toast}
								setToast={setToast}
								setShowProfileLoader={setShowProfileLoader}
								aiPrompt={aiPrompt}
								setAiPrompt={setAiPrompt}
								aiResult={aiResult}
								setAiResult={setAiResult}
								setSideBarMode={setSideBarMode}
							/>
						}
					/>
					<Route
						path="/wp-redirect/*"
						element={
							<MainApp
								user={user}
								setUser={setUser}
								toast={toast}
								setToast={setToast}
								setShowProfileLoader={setShowProfileLoader}
								aiPrompt={aiPrompt}
								setAiPrompt={setAiPrompt}
								aiResult={aiResult}
								setAiResult={setAiResult}
								setSideBarMode={setSideBarMode}
							/>
						}
					/>
					<Route path="/about" element={<About />} />
					<Route
						path="/contact"
						element={<Contact setToast={setToast} toast={toast} />}
					/>
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/terms" element={<Terms />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
