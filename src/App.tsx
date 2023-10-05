import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./assets/index.css";
import { ToastProps } from "./ToastNotification";
import { User } from "./store/dataInterfaces";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MainApp from "./MainApp";

export default function App(): JSX.Element {
	const [toast, setToast] = useState<ToastProps>();
	const [user, setUser] = useState<User>();
	const [showProfileLoader, setShowProfileLoader] = useState<boolean>(false);
	const [aiPrompt, setAiPrompt] = useState<string>("");
	const [aiResult, setAiResult] = useState<string>("");
	const [sideBarMode, setSideBarMode] = useState<
		"login" | "signup" | "forgot-password" | "history" | undefined
	>();
	const [isGetPremiumModalOpen, setIsGetPremiumModalOpen] = useState(false);
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
								showProfileLoader={showProfileLoader}
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
								showProfileLoader={showProfileLoader}
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
								showProfileLoader={showProfileLoader}
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
					<Route path="/contact" element={<Contact />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/terms" element={<Terms />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
