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
import { clear, getAuthenticatedUser } from "./store/browser";
import { User } from "./store/dataInterfaces";
const user = {
	name: "Tom Cook",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
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

export default function NavBar() {
	const [sideBarMode, setSideBarMode] = useState<
		"login" | "signup" | undefined
	>();
	const [isGetPremiumModalOpen, setIsGetPremiumModalOpen] = useState(false);
	const [storedAutheduser, setStoredAuthedUser] = useState<User | null>();
	const userNavigation = [
		{
			name: "Your Profile",
			onClick: () => {
				return;
			},
		},
		{
			name: "Sign out",
			onClick: () => {
				clear();
				setStoredAuthedUser(null);
			},
		},
	];

	useEffect(() => {
		if (!sideBarMode) {
			const authedUser = getAuthenticatedUser();
			if (authedUser) {
				setStoredAuthedUser(authedUser);
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
											{!storedAutheduser && (
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
											{storedAutheduser && (
												<Menu
													as="div"
													className="relative ml-3 flex-shrink-0"
												>
													<div>
														<Menu.Button className="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
															<span className="sr-only">
																Open user menu
															</span>
															<img
																className="h-8 w-8 rounded-full"
																src={
																	user.imageUrl
																}
																alt=""
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
											)}

											{/* Buy Premium Butotn */}
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
