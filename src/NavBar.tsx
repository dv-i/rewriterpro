import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
	Disclosure,
	Menu,
	Switch,
	Transition,
	Dialog,
} from "@headlessui/react";
import SideBar from "./SideBar";
import logo from "./assets/logo.png";
import { FEATURE_FLAGS } from "./constants";
import {
	clear,
	getAuthenticatedUser,
	setAuthenticatedUser,
} from "./store/browser";
import { User } from "./store/dataInterfaces";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { ToastProps } from "./ToastNotification";
import { PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
const navigation = [
	{ name: "Rewriter", href: "#", current: true },
	// { name: "Team", href: "#", current: false },
	// { name: "Projects", href: "#", current: false },
	// { name: "Calendar", href: "#", current: false },
	// { name: "Reports", href: "#", current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface NavBarProps {
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	user: User | undefined;
}
export default function NavBar({ setToast, setUser, user }: NavBarProps) {
	const [sideBarMode, setSideBarMode] = useState<
		"login" | "signup" | undefined
	>();
	const [isGetPremiumModalOpen, setIsGetPremiumModalOpen] = useState(false);
	const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
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
			},
		},
	];

	useEffect(() => {
		if (!sideBarMode) {
			const authedUser = getAuthenticatedUser();
			if (authedUser) {
				setUser(authedUser);
			}
		}
	}, [sideBarMode]);
	return (
		<>
			<div className="bg-indigo-600 pb-40">
				<Disclosure
					as="nav"
					className="pb-20 border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
				>
					{() => (
						<>
							<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
								<div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
									<div className="flex items-center px-2 lg:px-0">
										<div className="flex-shrink-0">
											<img
												className="block h-10 w-10"
												src={logo}
												alt="Rewriter pro"
											/>
										</div>
										<div className="hidden lg:ml-10 lg:block">
											<div className="flex space-x-4">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(
															item.current
																? "bg-indigo-700 text-white"
																: "text-white hover:bg-indigo-500 hover:bg-opacity-75",
															"rounded-md py-2 px-3 text-sm font-medium"
														)}
														aria-current={
															item.current
																? "page"
																: undefined
														}
													>
														{item.name}
													</a>
												))}
											</div>
										</div>
									</div>

									<div className="hidden lg:ml-4 lg:block">
										<div className="flex items-center">
											{/* Log In Button */}
											{!user && (
												<button
													type="button"
													className="rounded-md py-2 px-3 text-sm font-medium ml-4 bg-indigo-500 text-white shadow-sm hover:bg-indigo-400"
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
															<Menu.Button className="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
																<span className="sr-only">
																	Open user
																	menu
																</span>
																<UserCircleIcon
																	className={`h-8 w-8 ${
																		user.pro
																			? "border-4 rounded-3xl border-yellow-300"
																			: ""
																	}`}
																/>
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
																						"block px-4 py-2 text-sm text-gray-700"
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

											{/* Buy Premium Butotn */}
											{user?.pro !== true && (
												<button
													type="button"
													className="rounded-md py-2 px-3 text-sm font-medium ml-4 bg-indigo-700 text-white shadow-sm hover:bg-indigo-500"
													onClick={() =>
														setIsGetPremiumModalOpen(
															true
														)
													}
												>
													Buy Premium
												</button>
											)}

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
				sideBarMode={sideBarMode}
				setSideBarMode={setSideBarMode}
				setToast={setToast}
			/>
			<PremiumPricingInfoModal
				setIsGetPremiumModalOpen={setIsGetPremiumModalOpen}
				isGetPremiumModalOpen={isGetPremiumModalOpen}
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

interface PremiumPricingInfoModalProps {
	isGetPremiumModalOpen: boolean;
	setIsGetPremiumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function PremiumPricingInfoModal({
	isGetPremiumModalOpen,
	setIsGetPremiumModalOpen,
}: PremiumPricingInfoModalProps) {
	return (
		<Transition.Root show={isGetPremiumModalOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={setIsGetPremiumModalOpen}
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
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								{/* TODO: Add Pricing Info */}
								Premium Pricing Info
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

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
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
												"rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
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
								<div className="pt-5">
									<div>
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Email address
											</label>
											<div className="text-sm flex">
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
													disabled={!isEditingEmail}
													value={email}
													onChange={(e) =>
														setEmail(e.target.value)
													}
													className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Name
												</label>
											</div>
											<div className="text-sm flex">
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
													className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													User
												</label>
											</div>
											<div className="text-sm">
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
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
