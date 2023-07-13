import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Alert from "./Alert";
import Settings from "./Settings";
import AIInteractor from "./AIInteractor";
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
import CTA from "./CTA";
import FAQ from "./FAQ";
import Benefits from "./Benefits";
import Steps from "./Steps";
import Work from "./Work";
import WhyUse from "./WhyUse";
function App() {
	const [toast, setToast] = useState<ToastProps>();
	const [user, setUser] = useState<User>();
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
		process.env.REACT_APP_STRIPE_SECRET_KEY || ""
	);
	const mongo = new MongoDbClient();

	const fetchSubscriptionsAndSetUserToProIfRequired = async () => {
		try {
			if (user) {
				const subscriptions =
					await stripe.getCustomerSubscriptionsByEmail(user.email);
				const hasActiveSubscriptions =
					subscriptions.filter((sub) => sub.status === "active")
						.length > 0;
				if (!user.pro && hasActiveSubscriptions) {
					const updatedUser = await mongo.updateOne(
						USERS_COLLECTION,
						{
							email: user.email,
						},
						{
							$set: {
								pro: true,
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
			<div className="h-screen flex flex-col flex-grow">
				<NavBar setToast={setToast} setUser={setUser} user={user} />
				<CTA />
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
						/>
					}
					counter={counter}
					user={user}
				/>
			</div>

			<WhyUse />
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
	const mainClassName = `-mt-[11rem] ${
		user?.pro ? "-mt-[22rem] sm:-mt-[11rem]" : ""
	} h-3/5 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8`;
	return (
		<main className={mainClassName}>
			<Alert user={user} counter={counter} />

			<div className="md:h-full w-full flex flex-col mt-10 divide-y divide-gray-200 rounded-lg bg-white shadow">
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
