import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Alert from "./Alert";
import Settings from "./Settings";
import AIInteractor from "./AIInteractor";
import "./assets/index.css";
import ToastNotification, { ToastProps } from "./ToastNotification";
import { PromptOptions, User } from "./store/dataInterfaces";
import { getLocalCounter, setLocalCounter } from "./store/browser";
function App() {
	const [toast, setToast] = useState<ToastProps>();
	const [user, setUser] = useState<User>();
	const [promptOptions, setPromptOptions] = useState<PromptOptions>({
		fluency: undefined,
		tone: undefined,
		emotion: undefined,
		audience: undefined,
		length: undefined,
	});

	const [counter, setCounter] = useState<number>(getLocalCounter() || 0);

	useEffect(() => {
		setLocalCounter(counter);
	}, [counter]);

	return (
		<>
			<ToastNotification toast={toast} setToast={setToast} />
			<div className="h-screen flex flex-col flex-grow">
				<NavBar setToast={setToast} setUser={setUser} user={user} />
				<AIInteractorCard
					CardHeader={
						<Settings
							setUser={setUser}
							user={user}
							promptOptions={promptOptions}
							setPromptOptions={setPromptOptions}
							setToast={setToast}
						/>
					}
					CardBody={
						<AIInteractor
							promptOptions={promptOptions}
							setToast={setToast}
							counter={counter}
							setCounter={setCounter}
							user={user}
						/>
					}
					counter={counter}
					user={user}
				/>
			</div>
		</>
	);
}

export default App;

interface AIInteractorCardProps {
	CardHeader: JSX.Element;
	CardBody: JSX.Element;
	counter: number;
	user: User | undefined;
}
function AIInteractorCard({
	CardHeader,
	CardBody,
	counter,
	user,
}: AIInteractorCardProps) {
	return (
		<main className="-mt-48 h-3/5 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
			<Alert user={user} counter={counter} />

			<div className="h-full w-full flex flex-col mt-10 divide-y divide-gray-200 rounded-lg bg-white shadow">
				<div className="px-4 h-20 py-5 sm:px-6">{CardHeader}</div>
				<div className="px-4 py-5 h-full sm:p-6">{CardBody}</div>
			</div>
		</main>
	);
}
