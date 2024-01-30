import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { Loader } from "../Loader";
import { LogInAndSignUpProps } from "./SideBar";
import { signUp, login } from "../api";
import {
	removeQuestionsAndResponses,
	setAuthenticatedUser,
} from "../store/browser";
import logo from "../../src/assets/logo.png";

export default function LogIn({
	setSideBarMode,
	setToast,
}: LogInAndSignUpProps) {
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
			removeQuestionsAndResponses();
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
				removeQuestionsAndResponses();
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
						onReject={() => {
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
