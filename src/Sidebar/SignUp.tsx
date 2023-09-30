import React, { useState } from "react";
import { Loader } from "../Loader";
import { LogInAndSignUpProps } from "./SideBar";
import { signUp } from "../api";
import { setAuthenticatedUser } from "../store/browser";
import logo from "../../src/assets/logo.png";

export default function SignUp({
	setSideBarMode,
	setToast,
}: LogInAndSignUpProps) {
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
					className="mx-auto h-20 w-auto"
					src={logo}
					alt="RewriterPro.ai"
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
				<p className="mt-2 text-center text-md text-gray-500">
					By signing up, you agree to the{" "}
					<a className="underline" href="/terms">
						Terms and Service
					</a>{" "}
					and{" "}
					<a className="underline" href="/privacy">
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	);
}
