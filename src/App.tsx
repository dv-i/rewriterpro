import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Alert from "./Alert";
import Settings from "./Settings";
import AIInteractor from "./AiInteractor/AIInteractor";
import "./assets/index.css";
import ToastNotification, { ToastProps } from "./ToastNotification";
import { PromptOptions, User } from "./store/dataInterfaces";
import {
	getLocalCounter,
	setAuthenticatedUser,
	setLocalCounter,
} from "./store/browser";
import StripeUtil from "./utils/StripeUtil";
import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
import { CTAv2 } from "./CTA";
import FAQ from "./FAQ";
import Benefits from "./Benefits";
import Steps from "./Steps";
import Work from "./Work";
import WhyUseV2 from "./WhyUseV2";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

interface MainAppProps {
	toast: ToastProps | undefined;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	showProfileLoader: boolean;
	setShowProfileLoader: React.Dispatch<React.SetStateAction<boolean>>;
	aiPrompt: string;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	aiResult: string;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<
			"login" | "signup" | "forgot-password" | "history" | undefined
		>
	>;
}

function App(): JSX.Element {
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

function MainApp({
	showProfileLoader,
	user,
	setToast,
	setUser,
	setShowProfileLoader,
	toast,
	aiPrompt,
	aiResult,
	setAiPrompt,
	setAiResult,
	setSideBarMode,
}: MainAppProps) {
	const [promptOptions, setPromptOptions] = useState<PromptOptions>({
		fluency: undefined,
		tone: undefined,
		emotion: undefined,
		audience: undefined,
		length: undefined,
	});

	const [counter, setCounter] = useState<number>(getLocalCounter() || 0);

	useEffect(() => {
		setLocalCounter(counter);
	}, [counter]);

	const stripe = new StripeUtil(
		process.env.REACT_APP_STRIPE_SECRET_KEY_PROD || ""
	);
	const mongo = new MongoDbClient();

	const fetchSubscriptionsAndSetUserToProIfRequired = async () => {
		setShowProfileLoader(true);
		try {
			if (user) {
				const subscriptions =
					await stripe.getCustomerSubscriptionsByEmail(user.email);
				const activeSubscriptions = subscriptions.filter(
					(sub) => sub.status === "active"
				);
				const hasActiveSubscriptions = activeSubscriptions.length > 0;
				if (!user.pro && hasActiveSubscriptions) {
					const updatedUser = await mongo.updateOne(
						USERS_COLLECTION,
						{
							email: user.email,
						},
						{
							$set: {
								pro: true,
								subscriptionPeriodEndDateEpochSeconds:
									activeSubscriptions[0].current_period_end,
							},
						}
					);
					if (updatedUser) {
						const newUser = await mongo.findOne(USERS_COLLECTION, {
							email: user.email,
						});
						if (newUser) {
							setAuthenticatedUser(newUser);
							setUser(newUser);
						}
					}
				} else if (user.pro && !hasActiveSubscriptions) {
					const updatedUser = await mongo.updateOne(
						USERS_COLLECTION,
						{
							email: user.email,
						},
						{
							$set: {
								pro: false,
							},
						}
					);
					if (updatedUser) {
						const newUser = await mongo.findOne(USERS_COLLECTION, {
							email: user.email,
						});
						if (newUser) {
							setAuthenticatedUser(newUser);
							setUser(newUser);
						}
					}
				}
			}
		} catch (error) {
			// Handle error here
			console.error("Error fetching subscriptions:", error);
		}
		setShowProfileLoader(false);
	};

	useEffect(() => {
		fetchSubscriptionsAndSetUserToProIfRequired();
	}, []);

	useEffect(() => {
		if (user) {
			fetchSubscriptionsAndSetUserToProIfRequired();
		}
	}, [user]);

	return (
		<>
			<ToastNotification toast={toast} setToast={setToast} />
			<div className=" bg-gray-100 flex flex-col flex-grow">
				<CTAv2 />
				<AIInteractorCard
					CardHeader={
						<Settings
							setUser={setUser}
							user={user}
							promptOptions={promptOptions}
							setPromptOptions={setPromptOptions}
							setToast={setToast}
						/>
					}
					CardBody={
						<AIInteractor
							promptOptions={promptOptions}
							setToast={setToast}
							counter={counter}
							setCounter={setCounter}
							user={user}
							aiPrompt={aiPrompt}
							setAiPrompt={setAiPrompt}
							aiResult={aiResult}
							setAiResult={setAiResult}
							setSideBarMode={setSideBarMode}
						/>
					}
					counter={counter}
					user={user}
				/>
			</div>

			<WhyUseV2 />
			<Benefits />
			<Work />
			<Steps />
			<FAQ />
		</>
	);
}

export default App;

interface AIInteractorCardProps {
	CardHeader: JSX.Element;
	CardBody: JSX.Element;
	counter: number;
	user: User | undefined;
}
function AIInteractorCard({
	CardHeader,
	CardBody,
	counter,
	user,
}: AIInteractorCardProps) {
	return (
		<main className="-mt-[11rem] mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 block">
			<Alert user={user} counter={counter} />

			<div style={{ height: 20 }}></div>
			<div className="h-full w-full flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
				<div className="pl-4 pr-4 sm:h-20 py-5 sm:px-6">
					{CardHeader}
				</div>
				<div className="pl-4 sm:pr-4 py-5 h-full sm:p-6">
					{CardBody}
				</div>
			</div>
		</main>
	);
}
