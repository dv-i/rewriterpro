import React from "react";
import { useState, useEffect } from "react";
import AIInteractorSection from "./AIInteractor/AIInteractorSection";
import AIInteractorCard from "./AIInteractor/AIInteractorCard";
import Benefits from "./Benefits";
import { CTAv2 } from "./CTA";
import FAQ from "./FAQ";
import Settings from "./Settings";
import Steps from "./Steps";
import ToastNotification, { ToastProps } from "./ToastNotification";
import WhyUseV2 from "./WhyUseV2";
import Work from "./Work";
import MongoDbClient from "./store/MongoDbClient";
import {
	getLocalCounter,
	setLocalCounter,
	setAuthenticatedUser,
} from "./store/browser";
import { USERS_COLLECTION } from "./store/constants";
import { User, PromptOptions } from "./store/dataInterfaces";
import StripeUtil from "./utils/StripeUtil";

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

export default function MainApp({
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
		if (window.location.pathname.includes("/wp-redirect")) {
			const urlParams = new URLSearchParams(window.location.search);
			const question = urlParams.get("question");
			if (question) {
				setAiPrompt(question);
			}
		}
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
						<AIInteractorSection
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
