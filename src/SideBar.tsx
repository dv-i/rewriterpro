import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./assets/logo.png";
import { login, signUp } from "./api";
import { setAuthenticatedUser } from "./store/browser";
import { ToastProps } from "./ToastNotification";

export interface SideBarProps {
	sideBarMode: "login" | "signup" | undefined;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<"login" | "signup" | undefined>
	>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
}

export default function SideBar({
	sideBarMode,
	setSideBarMode,
	setToast,
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
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
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
										<div className="relative mt-6 flex-1 px-4 sm:px-6">
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
		React.SetStateAction<"login" | "signup" | undefined>
	>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
}

function LogIn({ setSideBarMode, setToast }: LogInAndSignUpProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email && password) {
			const authedUser = await login(email, password);
			if (authedUser) {
				setAuthenticatedUser(authedUser);
				setSideBarMode(undefined);
			} else {
				setToast({
					visible: true,
					title: "Unauthorized",
					content: "Email ID or Password doesn't match",
					type: "error",
				});
			}
		}
	};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-20 w-auto"
					src={logo}
					alt="Rewriter Pro"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Log in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					onSubmit={(e) => handleFormSubmit(e)}
				>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
								required
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Log in
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<button
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						onClick={() => setSideBarMode("signup")}
					>
						Sign Up
					</button>
				</p>
			</div>
		</div>
	);
}

function SignUp({ setSideBarMode, setToast }: LogInAndSignUpProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [fullName, setFullName] = useState<string>("");
	// const [lastName, setLastName] = useState<string>("");

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email && password && fullName) {
			const createdUser = await signUp({
				email,
				password,
				fullName,
			});
			if (createdUser) {
				setAuthenticatedUser(createdUser);
				setSideBarMode(undefined);
			} else {
				setToast({
					visible: true,
					title: "Error",
					content: "Please try again after some time",
					type: "error",
				});
			}
		}
	};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Create a new account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					onSubmit={(e) => handleFormSubmit(e)}
				>
					<div>
						<label
							htmlFor="fullName"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Full name
						</label>
						<div className="mt-2">
							<input
								id="fullName"
								name="fullName"
								type="text"
								autoComplete="fullName"
								onChange={(e) => setFullName(e.target.value)}
								required
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					{/* <div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Last name
						</label>
						<div className="mt-2">
							<input
								id="lastName"
								name="lastName"
								type="text"
								autoComplete="lastName"
								onChange={(e) => setLastName(e.target.value)}
								required
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div> */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
								required
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
								required
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign up
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Already a member?{" "}
					<button
						onClick={() => setSideBarMode("login")}
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Sign In
					</button>
				</p>
			</div>
		</div>
	);
}
