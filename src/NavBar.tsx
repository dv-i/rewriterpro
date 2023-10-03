import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import SideBar from "./Sidebar/SideBar";
import logo from "./assets/logo.png";
import { BASE_URL, FEATURE_FLAGS } from "./constants";
import {
	clear,
	getAuthenticatedUser,
	setAuthenticatedUser,
} from "./store/browser";
import { User } from "./store/dataInterfaces";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { ToastProps } from "./ToastNotification";
import { PremiumPricingInfoModal } from "./PremiumPricingInfo";
import UserProfileModal from "./UserProfileModal";
import { classNames } from "./utils/general";
import { Loader } from "./Loader";
import StripeUtil from "./utils/StripeUtil";
import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
import Stripe from "stripe";

interface NavBarProps {
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	showProfileLoader: boolean;
	user: User | undefined;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
	sideBarMode: "login" | "signup" | "forgot-password" | "history" | undefined;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<
			"login" | "signup" | "forgot-password" | "history" | undefined
		>
	>;
	isGetPremiumModalOpen: boolean;
	setIsGetPremiumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function NavBar({
	setToast,
	setUser,
	user,
	showProfileLoader,
	setAiPrompt,
	setAiResult,
	setSideBarMode,
	sideBarMode,
	isGetPremiumModalOpen,
	setIsGetPremiumModalOpen,
}: NavBarProps) {
	const mongo = new MongoDbClient();
	const stripe = new StripeUtil(
		process.env.REACT_APP_STRIPE_SECRET_KEY_PROD || ""
	);

	const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
	const [userHasActiveSubscriptions, setUserHasActiveSubscriptions] =
		useState(false);
	const [subscriptions, setSubscriptions] = useState<Stripe.Subscription[]>(
		[]
	);

	const navigation = [
		{
			name: "History",
			onClick: () => {
				setSideBarMode("history");
			},
			current: false,
		},
	];

	const userNavigation = [
		{
			name: "Your Profile",
			onClick: () => {
				setIsUserProfileModalOpen(true);
			},
		},
		{
			name: "Sign out",
			onClick: () => {
				clear();
				setUser(undefined);
				window.location.pathname = "/";
			},
		},
	];

	const hasActiveSubscriptions = async () => {
		const authedUser = getAuthenticatedUser();
		if (authedUser) {
			const subscriptions = await stripe.getCustomerSubscriptionsByEmail(
				authedUser.email
			);
			setSubscriptions(subscriptions);
		}
	};

	useEffect(() => {
		if (subscriptions.length > 0) {
			const hasActiveSubscriptions =
				subscriptions.filter((sub) => sub.status === "active").length >
				0;
			setUserHasActiveSubscriptions(hasActiveSubscriptions);
		}
	}, [subscriptions]);

	const setUserProStatus = async () => {
		const authedUser = getAuthenticatedUser();

		if (
			authedUser &&
			userHasActiveSubscriptions &&
			!authedUser.subscriptionPeriodEndDateEpochSeconds
		) {
			const activeSubscriptions = subscriptions.filter(
				(sub) => sub.status === "active"
			);
			const updatedUser = await mongo.updateOne(
				USERS_COLLECTION,
				{
					email: authedUser.email,
				},
				{
					$set: {
						pro: true,
						subscriptionPeriodEndDateEpochSeconds:
							activeSubscriptions[0].current_period_end,
					},
				}
			);
			const newUser = await mongo.findOne(USERS_COLLECTION, {
				email: authedUser.email,
			});
			if (newUser) {
				setUser(newUser);
				setAuthenticatedUser(newUser);
			}
		}
		if (authedUser) {
			if (
				authedUser.subscriptionPeriodEndDateEpochSeconds !==
					undefined &&
				authedUser.subscriptionPeriodEndDateEpochSeconds > Date.now()
			) {
				mongo
					.updateOne(
						USERS_COLLECTION,
						{
							email: authedUser.email,
						},
						{
							$set: {
								pro: false,
							},
						}
					)
					.then(async (res) => {
						const newUser = await mongo.findOne(USERS_COLLECTION, {
							email: authedUser.email,
						});

						if (newUser) {
							setUser(newUser);
							setAuthenticatedUser(newUser);
						}
						clear();
						setUser(undefined);
						window.location.pathname = "/";
					})
					.catch((err) => {
						//Error
					});
			}
		}
	};

	useEffect(() => {
		setUserProStatus();
	}, [userHasActiveSubscriptions]);
	useEffect(() => {
		hasActiveSubscriptions();
		if (window.location.pathname.includes("/reset-password")) {
			setSideBarMode("forgot-password");
		}
	}, []);

	useEffect(() => {
		if (!isUserProfileModalOpen) {
			const authedUser = getAuthenticatedUser();
			if (authedUser) {
				setUser(authedUser);
			}
			hasActiveSubscriptions();
		}
	}, [isUserProfileModalOpen]);

	useEffect(() => {
		if (!sideBarMode) {
			const authedUser = getAuthenticatedUser();
			if (authedUser) {
				setUser(authedUser);
			}
			hasActiveSubscriptions();
		}
	}, [sideBarMode]);

	const getBuyNowButton = () => (
		<button
			type="button"
			className="rounded-md py-2 px-3 text-md font-medium ml-4 bg-indigo-700 text-white shadow-sm hover:bg-indigo-500"
			onClick={() => setIsGetPremiumModalOpen(true)}
		>
			Buy Pro
		</button>
	);
	return (
		<>
			<div className="bg-indigo-600">
				<Disclosure as="nav" className="bg-indigo-600 lg:border-none">
					{() => (
						<>
							<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
								<div className="relative flex h-16 items-center justify-between">
									<div className="flex items-center px-2 lg:px-0">
										<div className="flex-shrink-0">
											<a href={BASE_URL}>
												<img
													className="block h-9"
													src={logo}
													alt="RewriterPro.ai"
												/>
											</a>
										</div>
										<div className="hidden lg:ml-10 lg:block">
											<div className="flex space-x-4">
												{/* {navigation.map((item) => (
													<p
														key={item.name}
														onClick={() =>
															item.onClick()
														}
														className={classNames(
															item.current
																? "bg-indigo-700 text-white "
																: "text-white hover:bg-indigo-500 hover:bg-opacity-75",
															"rounded-md py-2 px-3 text-sm font-medium cursor-pointer"
														)}
														aria-current={
															item.current
																? "page"
																: undefined
														}
													>
														{item.name}
													</p>
												))} */}
											</div>
										</div>
									</div>

									<div className="lg:ml-4 lg:block">
										<div className="flex items-center">
											{/* Log In Button */}
											{!user && (
												<button
													type="button"
													className="rounded-md py-2 px-3 text-md font-medium ml-4 bg-indigo-700 text-white shadow-sm hover:bg-indigo-500"
													onClick={() => {
														setSideBarMode("login");
													}}
												>
													Log in{" "}
													<span aria-hidden="true">
														&rarr;
													</span>
												</button>
											)}

											{/* Profile dropdown */}
											{user && (
												<div>
													<Menu
														as="div"
														className="relative ml-3 flex-shrink-0"
													>
														<div>
															<Menu.Button className="flex rounded-full bg-indigo-600 text-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
																<span className="sr-only">
																	Open user
																	menu
																</span>
																{showProfileLoader ? (
																	<Loader
																		visible={
																			showProfileLoader
																		}
																	/>
																) : (
																	<UserCircleIcon
																		className={`h-8 w-8 ${
																			user.pro
																				? "border-4 rounded-3xl border-yellow-300"
																				: ""
																		}`}
																	/>
																)}
															</Menu.Button>
														</div>
														<Transition
															as={Fragment}
															enter="transition ease-out duration-100"
															enterFrom="transform opacity-0 scale-95"
															enterTo="transform opacity-100 scale-100"
															leave="transition ease-in duration-75"
															leaveFrom="transform opacity-100 scale-100"
															leaveTo="transform opacity-0 scale-95"
														>
															<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
																{userNavigation.map(
																	(item) => (
																		<Menu.Item
																			key={
																				item.name
																			}
																		>
																			{({
																				active,
																			}) => (
																				<div
																					onClick={
																						item.onClick
																					}
																					className={classNames(
																						active
																							? "bg-gray-100"
																							: "",
																						"block px-4 py-2 text-md text-gray-700"
																					)}
																				>
																					{
																						item.name
																					}
																				</div>
																			)}
																		</Menu.Item>
																	)
																)}
															</Menu.Items>
														</Transition>
													</Menu>
													<UserProfileModal
														isUserProfileModalOpen={
															isUserProfileModalOpen
														}
														setIsUserProfileModalOpen={
															setIsUserProfileModalOpen
														}
														user={user}
														setToast={setToast}
													/>
												</div>
											)}

											{/* Buy Premium Button */}
											{user?.pro !== true &&
												userHasActiveSubscriptions ===
													false &&
												getBuyNowButton()}

											<div className="ml-4 pt-1.5">
												{FEATURE_FLAGS.DEV_TOGGLE_SWITCH && (
													<PremiumToggle />
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</Disclosure>
			</div>
			<SideBar
				setIsGetPremiumModalOpen={setIsGetPremiumModalOpen}
				sideBarMode={sideBarMode}
				setSideBarMode={setSideBarMode}
				setToast={setToast}
				setUser={setUser}
				setAiPrompt={setAiPrompt}
				setAiResult={setAiResult}
			/>
			<PremiumPricingInfoModal
				setIsGetPremiumModalOpen={setIsGetPremiumModalOpen}
				isGetPremiumModalOpen={isGetPremiumModalOpen}
				setSideBarMode={setSideBarMode}
			/>
		</>
	);
}

// TODO: Remove this in the final version
function PremiumToggle() {
	const [enabled, setEnabled] = useState(false);
	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={classNames(
				enabled ? "bg-green-500" : "bg-gray-200",
				"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
			)}
		>
			<span className="sr-only">Use setting</span>
			<span
				className={classNames(
					enabled ? "translate-x-5" : "translate-x-0",
					"pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
				)}
			>
				<span
					className={classNames(
						enabled
							? "opacity-0 duration-100 ease-out"
							: "opacity-100 duration-200 ease-in",
						"absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
					)}
					aria-hidden="true"
				>
					<svg
						className="h-3 w-3 text-gray-400"
						fill="none"
						viewBox="0 0 12 12"
					>
						<path
							d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				<span
					className={classNames(
						enabled
							? "opacity-100 duration-200 ease-in"
							: "opacity-0 duration-100 ease-out",
						"absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
					)}
					aria-hidden="true"
				>
					<svg
						className="h-3 w-3 text-green-500"
						fill="currentColor"
						viewBox="0 0 12 12"
					>
						<path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
					</svg>
				</span>
			</span>
		</Switch>
	);
}
