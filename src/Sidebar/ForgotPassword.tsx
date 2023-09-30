import React, { useState } from "react";
import { Loader } from "../Loader";
import MongoDbClient from "../store/MongoDbClient";
import { setAuthenticatedUser } from "../store/browser";
import { USERS_COLLECTION } from "../store/constants";
import { generateRandomSixDigitNumber, toHash } from "../utils/general";
import emailjs from "@emailjs/browser";
import logo from "../../src/assets/logo.png";
import { LogInAndSignUpProps } from "./SideBar";

export default function ForgotPassword({
	setSideBarMode,
	setToast,
	setUser,
}: LogInAndSignUpProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [resetCode, setResetCode] = useState<string>("");
	const [showLoader, setShowLoader] = useState(false);
	const [sentEmailSuccess, setSentEmailSuccess] = useState(false);

	const saveResetCodeToDb = async (resetCode: string) => {
		await mongo.updateOne(
			USERS_COLLECTION,
			{
				email: email,
			},
			{
				$set: {
					passwordResetCode: resetCode,
				},
			}
		);
	};

	const deleteResetCodeFromDb = async () => {
		await mongo.updateOne(
			USERS_COLLECTION,
			{
				email: email,
			},
			{
				$unset: {
					passwordResetCode: 1,
				},
			}
		);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setShowLoader(true);
		e.preventDefault();
		if (email) {
			const resetCode = generateRandomSixDigitNumber();
			await saveResetCodeToDb(resetCode);

			const user = await mongo.findOne(USERS_COLLECTION, {
				email: email,
			});
			const templateParams = {
				userFullName: user?.fullName,
				email: email,
				code: resetCode,
			};

			if (user) {
				emailjs
					.send(
						process.env.REACT_APP_APP_EMAILJS_SERVICE_ID || "",
						process.env.REACT_APP_APP_EMAILJS_TEMPLATE_ID || "",
						templateParams,
						process.env.REACT_APP_APP_EMAILJS_API_KEY || ""
					)
					.then(
						function () {
							setSentEmailSuccess(true);
							setShowLoader(false);
						},
						function () {
							setSentEmailSuccess(false);
							setShowLoader(false);
							setToast({
								visible: true,
								title: "Error",
								content: "Failed to send password reset email",
								type: "error",
							});
							deleteResetCodeFromDb();
						}
					);
			} else {
				setToast({
					visible: true,
					title: "Error",
					content: "User not found",
					type: "error",
				});
			}
		}
	};

	const mongo = new MongoDbClient();

	const handlePasswordResetSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setShowLoader(true);

		// const hrefPath = window.location.pathname;
		// const resetToken = hrefPath.split("/")[2];
		const user = await mongo.findOne(USERS_COLLECTION, {
			email,
		});
		const resetCodeInDb = user?.passwordResetCode;
		// const validToken = verifyResetToken(resetToken);
		if (password && resetCode === resetCodeInDb) {
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
						deleteResetCodeFromDb();
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
							<label
								htmlFor="reset-code"
								className="block text-md font-medium leading-6 text-gray-900"
							>
								Reset code
							</label>
							<div className="mt-2">
								<input
									id="reset-code"
									name="reset-code"
									type="text"
									onChange={(e) =>
										setResetCode(e.target.value)
									}
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
					<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
						<p className="mb-5">
							Please provide your email address, and we will send
							you detailed instructions on how to reset your
							password.
						</p>
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
							<p className="mt-10 text-center text-md text-gray-500">
								<button
									className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
									onClick={() => setSideBarMode("login")}
								>
									Back to login
								</button>
							</p>
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
					className="mx-auto h-20 w-auto"
					src={logo}
					alt="RewriterPro.ai"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Forgot Password
				</h2>
			</div>

			{renderPasswordResetForm()}
		</div>
	);
}
