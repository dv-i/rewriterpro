import { Transition, Dialog } from "@headlessui/react";
import { PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { ToastProps } from "./ToastNotification";
import MongoDbClient from "./store/MongoDbClient";
import { setAuthenticatedUser } from "./store/browser";
import { USERS_COLLECTION } from "./store/constants";
import { User } from "./store/dataInterfaces";
import { classNames } from "./utils/general";
import StripeUtil from "./utils/StripeUtil";
const mongo = new MongoDbClient();
interface UserProfileModalProps {
	isUserProfileModalOpen: boolean;
	setIsUserProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	user: User;
}
function UserProfileModal({
	isUserProfileModalOpen,
	setIsUserProfileModalOpen,
	user,
	setToast,
}: UserProfileModalProps) {
	const tabs = [
		{ name: "Profile", href: "#", current: true },
		{ name: "Billing", href: "#", current: false },
		// { name: "Plans", href: "#", current: false },
	];

	const [currentTab, setCurrentTab] = useState("Profile");
	const [isEditingFullName, setIsEditingFullName] = useState(false);
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [fullName, setFullName] = useState(user.fullName);
	const [email, setEmail] = useState(user.email);
	const [subscription, setSubscription] = useState<any>();

	const handleEmailUpdate = async () => {
		const mongo = new MongoDbClient();
		try {
			const updatedUser = await mongo.updateOne(
				USERS_COLLECTION,
				{
					email: user.email,
				},
				{
					$set: {
						email: email,
					},
				}
			);
			if (updatedUser) {
				const newUser = await mongo.findOne(USERS_COLLECTION, {
					email: email,
				});
				if (newUser) {
					setAuthenticatedUser(newUser);
					setToast({
						visible: true,
						title: "Updated email",
						type: "success",
					});
					setIsEditingEmail(false);
				} else {
					setToast({
						visible: true,
						title: "Could not update email",
						type: "error",
					});
				}
			} else {
				setToast({
					visible: true,
					title: "Could not update email",
					type: "error",
				});
			}
		} catch (e) {
			setToast({
				visible: true,
				title: "Could not update email",
				type: "error",
			});
		}
	};

	const handleNameUpdate = async () => {
		const mongo = new MongoDbClient();
		try {
			const updatedUser = await mongo.updateOne(
				USERS_COLLECTION,
				{
					email: user.email,
				},
				{
					$set: {
						fullName: fullName,
					},
				}
			);
			if (updatedUser) {
				const newUser = await mongo.findOne(USERS_COLLECTION, {
					email: email,
				});
				if (newUser) {
					setAuthenticatedUser(newUser);
					setToast({
						visible: true,
						title: "Updated name",
						type: "success",
					});
					setIsEditingFullName(false);
				} else {
					setToast({
						visible: true,
						title: "Could not update name",
						type: "error",
					});
				}
			} else {
				setToast({
					visible: true,
					title: "Could not update name",
					type: "error",
				});
			}
		} catch (e) {
			setToast({
				visible: true,
				title: "Could not update name",
				type: "error",
			});
		}
	};

	const stripe = new StripeUtil(
		process.env.REACT_APP_STRIPE_SECRET_KEY || ""
	);

	useEffect(() => {
		stripe.getCustomerSubscriptionsByEmail(user.email).then((res) => {
			if (res.length > 0) {
				setSubscription(res[0]);
			}
		});
	}, []);

	function formatDate(timestamp: number): string {
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	const handleCancelSubscription = () => {
		if (subscription && subscription.status === "active") {
			stripe
				.cancelSubscription(subscription.id)
				.then(async (res) => {
					if (res.status === "canceled") {
						setToast({
							visible: true,
							title: "Succesfully Cancelled",
							content: "Your subscription has been cancelled",
						});
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
							const newUser = await mongo.findOne(
								USERS_COLLECTION,
								{
									email: user.email,
								}
							);
							if (newUser) {
								setAuthenticatedUser(newUser);
							}
						}
						setIsUserProfileModalOpen(false);
					} else {
						setToast({
							visible: true,
							title: "Could not cancel",
							content:
								"Could not cancel your subscription, please try again...",
							type: "warning",
						});
					}
				})
				.catch((error) => {
					console.error(error);
					setToast({
						visible: true,
						title: "Could not cancel",
						content:
							"Could not cancel your subscription, please try again...",
						type: "warning",
					});
				});
		} else {
			return <p>Your subscription has been cancelled</p>;
		}
	};

	const getSubscriptionInformationPanel = () => {
		if (
			subscription !== undefined &&
			subscription.status === "active" &&
			!subscription.cancel_at_period_end
		) {
			return (
				<div className="bg-gray-100 rounded-lg p-4">
					<div className="text-gray-600 mb-2">
						Subscription Information:
					</div>
					<div className="flex items-center mb-2">
						<div className="font-bold mr-2">Amount:</div>
						<div>${subscription.plan.amount / 100} </div>
					</div>
					<div className="flex items-center mb-2">
						<div className="font-bold mr-2">Interval:</div>
						<div>
							{subscription.plan.interval}
							ly
						</div>
					</div>
					<div className="flex items-center">
						<div className="font-bold mr-2">Next Billing Date:</div>
						<div>{formatDate(subscription.current_period_end)}</div>
					</div>
					<button
						type="submit"
						className={
							"mt-2 inline-flex justify-center items-center rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500"
						}
						onClick={() => {
							handleCancelSubscription();
						}}
					>
						Cancel subscription
					</button>
				</div>
			);
		} else if (
			subscription !== undefined &&
			subscription.cancel_at_period_end
		) {
			return (
				<div className="bg-gray-100 rounded-lg p-4">
					<div className="text-gray-600 mb-2">
						Subscription Information:
					</div>
					<div className="flex items-center mb-2">
						<div className="font-bold mr-2">Amount:</div>
						<div>${subscription.plan.amount / 100} </div>
					</div>
					<div className="flex items-center mb-2">
						<div className="font-bold mr-2">Interval:</div>
						<div>
							{subscription.plan.interval}
							ly
						</div>
					</div>
					<div className="flex items-center">
						<div className="font-bold mr-2">
							Your subscription will be cancelled on:
						</div>
						<div>{formatDate(subscription.current_period_end)}</div>
					</div>
				</div>
			);
		} else {
			return <p>You do not have an active subscription</p>;
		}
	};

	return (
		<Transition.Root show={isUserProfileModalOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={setIsUserProfileModalOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end items-center  justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full max-w-xs sm:max-w-6xl sm:p-6">
								<nav
									className="flex space-x-4"
									aria-label="Tabs"
								>
									{tabs.map((tab) => (
										<div
											key={tab.name}
											className={classNames(
												tab.name === currentTab
													? "bg-indigo-100 text-indigo-700"
													: "text-gray-500 hover:text-gray-700",
												"rounded-md px-3 py-2 text-md font-medium cursor-pointer"
											)}
											aria-current={
												tab.name === currentTab
													? "page"
													: undefined
											}
											onClick={() =>
												setCurrentTab(tab.name)
											}
										>
											{tab.name}
										</div>
									))}
								</nav>
								{currentTab === "Profile" ? (
									<div className="pt-5">
										<div>
											<div>
												<label
													htmlFor="email"
													className="block text-md font-medium leading-6 text-gray-900"
												>
													Email address
												</label>
												<div className="text-md flex">
													<div className="flex items-center justify-center">
														<PencilSquareIcon
															onClick={() =>
																setIsEditingEmail(
																	true
																)
															}
															className="h-5 w-5 text-gray-400 cursor-pointer"
															aria-hidden="true"
														/>
													</div>
													<input
														id="email"
														name="email"
														type="email"
														required
														disabled={
															!isEditingEmail
														}
														value={email}
														onChange={(e) =>
															setEmail(
																e.target.value
															)
														}
														className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
													/>
													{isEditingEmail && (
														<div className="flex items-center justify-center ml-2">
															<CheckCircleIcon
																className="h-5 w-5 text-green-400 cursor-pointer"
																aria-hidden="true"
																onClick={async () => {
																	await handleEmailUpdate();
																}}
															/>
														</div>
													)}
												</div>
											</div>

											<div>
												<div className="flex items-center justify-between mt-5">
													<label
														htmlFor=""
														className="block text-md font-medium leading-6 text-gray-900"
													>
														Name
													</label>
												</div>
												<div className="text-md flex">
													<div className="flex items-center justify-center">
														<PencilSquareIcon
															onClick={() =>
																setIsEditingFullName(
																	true
																)
															}
															className="h-5 w-5 text-gray-400 cursor-pointer"
															aria-hidden="true"
														/>
													</div>

													<input
														id="name"
														name="name"
														type="text"
														required
														disabled={
															!isEditingFullName
														}
														onChange={(e) =>
															setFullName(
																e.target.value
															)
														}
														value={fullName}
														className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
													/>
													{isEditingFullName && (
														<div className="flex items-center justify-center ml-2">
															<CheckCircleIcon
																className="h-5 w-5 text-green-400 cursor-pointer"
																aria-hidden="true"
																onClick={async () => {
																	await handleNameUpdate();
																}}
															/>
														</div>
													)}
												</div>
											</div>

											<div>
												<div className="flex items-center justify-between mt-5">
													<label
														htmlFor=""
														className="block text-md font-medium leading-6 text-gray-900"
													>
														User
													</label>
												</div>
												<div className="text-md">
													{user.pro ? (
														<span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
															Premium User
														</span>
													) : (
														<span className="inline-flex items-center rounded-md bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
															Free User
														</span>
													)}
												</div>
											</div>
										</div>
									</div>
								) : (
									<div className="pt-5">
										<div className="pt-5">
											<div className="font-bold text-lg mb-2">
												Billing
											</div>
											{getSubscriptionInformationPanel()}
										</div>
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default UserProfileModal;
