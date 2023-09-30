import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ToastProps } from "../ToastNotification";
import { User } from "../store/dataInterfaces";
import ForgotPassword from "./ForgotPassword";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import History from "./History";
import HistoryV2 from "./HistoryV2";

export interface SideBarProps {
	sideBarMode: "login" | "signup" | "forgot-password" | "history" | undefined;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<
			"login" | "signup" | "forgot-password" | "history" | undefined
		>
	>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideBar({
	sideBarMode,
	setSideBarMode,
	setToast,
	setUser,
	setAiPrompt,
	setAiResult,
}: SideBarProps) {
	return (
		<Transition.Root show={Boolean(sideBarMode)} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => setSideBarMode(undefined)}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-indigo-100 py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
														onClick={() =>
															setSideBarMode(
																undefined
															)
														}
													>
														<span className="sr-only">
															Close panel
														</span>
														<XMarkIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													</button>
												</div>
											</div>
										</div>
										<div className="relative flex-1 px-4 sm:px-6">
											{sideBarMode === "login" && (
												<LogIn
													setSideBarMode={
														setSideBarMode
													}
													setToast={setToast}
												/>
											)}
											{sideBarMode === "signup" && (
												<SignUp
													setSideBarMode={
														setSideBarMode
													}
													setToast={setToast}
												/>
											)}

											{sideBarMode ===
												"forgot-password" && (
												<ForgotPassword
													setSideBarMode={
														setSideBarMode
													}
													setToast={setToast}
													setUser={setUser}
												/>
											)}

											{sideBarMode === "history" && (
												// <History
												// />
												<HistoryV2
													setSideBarMode={
														setSideBarMode
													}
													setAiPrompt={setAiPrompt}
													setAiResult={setAiResult}
												/>
											)}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export interface LogInAndSignUpProps {
	setSideBarMode: React.Dispatch<
		React.SetStateAction<
			"login" | "signup" | "forgot-password" | "history" | undefined
		>
	>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}
