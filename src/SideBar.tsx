import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./assets/logo.png";
import { login, signUp } from "./api";
import { getAuthenticatedUser, setAuthenticatedUser } from "./store/browser";
import { ToastProps } from "./ToastNotification";
import { Loader } from "./Loader";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import GoogleButton from "react-google-button";
import emailjs from "@emailjs/browser";
import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
import { generateResetToken, toHash, verifyResetToken } from "./utils/general";
import { User } from "./store/dataInterfaces";

export interface SideBarProps {
	sideBarMode: "login" | "signup" | "forgot-password" | undefined;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<"login" | "signup" | "forgot-password" | undefined>
	>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default function SideBar({
	sideBarMode,
	setSideBarMode,
	setToast,
	setUser,
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
		React.SetStateAction<"login" | "signup" | "forgot-password" | undefined>
	>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}

function LogIn({ setSideBarMode, setToast }: LogInAndSignUpProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showLoader, setShowLoader] = useState(false);

	const gAuthLogin = async ({
		email,
		firstName,
		lastName,
	}: {
		email: string;
		firstName: string;
		lastName: string;
	}): Promise<void> => {
		setShowLoader(true);

		//Add user/sign up
		const createdUser = await signUp({
			email,
			fullName: `${firstName} ${lastName}`,
			password,
			passwordHash: undefined,
			authType: "google",
		});
		if (createdUser) {
			setAuthenticatedUser(createdUser);
			setSideBarMode(undefined);
			setShowLoader(false);
		} else {
			setToast({
				visible: true,
				title: "Error",
				content: "Please try again after some time",
				type: "error",
			});
			setShowLoader(false);
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setShowLoader(true);
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
		setShowLoader(false);
	};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-20 w-auto"
					src={logo}
					alt="RewriterPro.ai"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Log in to your account
				</h2>
			</div>

			{showLoader ? (
				<div className="flex justify-center pt-10">
					<Loader
						width="w-8"
						height="h-8"
						color={"text-black"}
						visible={showLoader}
					/>
				</div>
			) : (
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<LoginSocialGoogle
						client_id={
							"1068841889733-k1olne1s3pl50ifbo36l3rsp4hmctn05.apps.googleusercontent.com" ||
							""
						}
						// onLoginStart={onGAuthLoginStart}
						// redirect_uri={undefined}
						scope="openid profile email"
						discoveryDocs="claims_supported"
						access_type="offline"
						onResolve={({ data }: IResolveParams) => {
							if (data) {
								gAuthLogin({
									email: data.email,
									firstName: data.given_name,
									lastName: data.family_name,
								});
							}
						}}
						onReject={(err) => {
							setShowLoader(false);
						}}
					>
						<GoogleButton
							label="Continue with Google"
							style={{ width: "100%" }}
						/>
					</LoginSocialGoogle>
					<div className="text-center py-4">OR</div>
					<form
						className="space-y-6"
						onSubmit={(e) => handleFormSubmit(e)}
					>
						<div>
							<label
								htmlFor="email"
								className="block text-md font-medium leading-6 text-gray-900"
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
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-md font-medium leading-6 text-gray-900"
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
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className=" w-full inline-flex items-center align-baseline gap-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Log in
								<Loader visible={showLoader} />
							</button>
						</div>
						<></>
					</form>

					<p className="mt-10 text-center text-md text-gray-500">
						<button
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							onClick={() => setSideBarMode("forgot-password")}
						>
							Forgot Password?
						</button>
					</p>
					<p className="text-center text-md text-gray-500">
						Not a member?{" "}
						<button
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							onClick={() => setSideBarMode("signup")}
						>
							Sign Up
						</button>
					</p>
				</div>
			)}
		</div>
	);
}

function SignUp({ setSideBarMode, setToast }: LogInAndSignUpProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [fullName, setFullName] = useState<string>("");
	const [showLoader, setShowLoader] = useState(false);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setShowLoader(true);
		e.preventDefault();
		if (email && password && fullName) {
			const createdUser = await signUp({
				email,
				fullName,
				password,
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
		setShowLoader(false);
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
							className="block text-md font-medium leading-6 text-gray-900"
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
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-md font-medium leading-6 text-gray-900"
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
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-md font-medium leading-6 text-gray-900"
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
								className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="inline-flex w-full justify-center align-baseline gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign up
							<Loader visible={showLoader} />
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-md text-gray-500">
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

function ForgotPassword({
	setSideBarMode,
	setToast,
	setUser,
}: LogInAndSignUpProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showLoader, setShowLoader] = useState(false);
	const [sentEmailSuccess, setSentEmailSuccess] = useState(false);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setShowLoader(true);
		e.preventDefault();
		if (email) {
			const resetToken = generateResetToken();
			const authedUser = getAuthenticatedUser();
			const templateParams = {
				userFullName: authedUser?.fullName,
				email: email,
				token: resetToken,
			};

			emailjs
				.send(
					process.env.REACT_APP_APP_EMAILJS_SERVICE_ID || "",
					process.env.REACT_APP_APP_EMAILJS_TEMPLATE_ID || "",
					templateParams,
					process.env.REACT_APP_APP_EMAILJS_API_KEY || ""
				)
				.then(
					function (response) {
						setSentEmailSuccess(true);
						setShowLoader(false);
					},
					function (error) {
						setSentEmailSuccess(false);
						setShowLoader(false);
						setToast({
							visible: true,
							title: "Error",
							content: "Failed to send password reset email",
							type: "error",
						});
					}
				);
		}
	};

	const mongo = new MongoDbClient();

	const handlePasswordResetSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setShowLoader(true);
		const hrefPath = window.location.pathname;
		const resetToken = hrefPath.split("/")[2];
		const validToken = verifyResetToken(resetToken);
		if (password && validToken) {
			const passwordHash = await toHash(password || "");
			if (passwordHash) {
				const updatedUser = await mongo.updateOne(
					USERS_COLLECTION,
					{
						email: email,
					},
					{
						$set: {
							passwordHash: passwordHash,
						},
					}
				);
				if (updatedUser) {
					const newUser = await mongo.findOne(USERS_COLLECTION, {
						email: email,
					});
					if (newUser) {
						setAuthenticatedUser(newUser);
						if (setUser) {
							setUser(newUser);
						}
						setSideBarMode(undefined);
						window.location.pathname = "/";
						setToast({
							visible: true,
							title: "Success",
							content: "Successfully reset password",
							type: "success",
						});
					}
				}
			}
		} else {
			setToast({
				visible: true,
				title: "Error",
				content: "Could not reset password",
				type: "error",
			});
		}
		setShowLoader(false);
	};

	const renderPasswordResetForm = () => {
		if (window.location.pathname.includes("/reset-password")) {
			return (
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={(e) => handlePasswordResetSubmit(e)}
					>
						<div>
							<label
								htmlFor="email"
								className="block text-md font-medium leading-6 text-gray-900"
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
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-md font-medium leading-6 text-gray-900"
								>
									New Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="w-full inline-flex items-center align-baseline gap-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Submit
								<Loader visible={showLoader} />
							</button>
						</div>
					</form>
				</div>
			);
		} else {
			if (sentEmailSuccess) {
				return (
					<p className="text-center">
						Check your email for instructions
					</p>
				);
			} else {
				return (
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form
							className="space-y-6"
							onSubmit={(e) => handleFormSubmit(e)}
						>
							<div>
								<label
									htmlFor="email"
									className="block text-md font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
										className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="w-full inline-flex items-center align-baseline gap-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Submit
									<Loader visible={showLoader} />
								</button>
							</div>
						</form>
					</div>
				);
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
					Forgot Password
				</h2>
			</div>

			{renderPasswordResetForm()}
		</div>
	);
}
