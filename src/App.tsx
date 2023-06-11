import React, { useState } from "react";
import NavBar from "./NavBar";
import Alert from "./Alert";
import Settings from "./Settings";
import AIInteractor from "./AIInteractor";
import { FEATURE_FLAGS } from "./constants";
import "./assets/index.css";
import ToastNotification, { ToastProps } from "./ToastNotification";
function App() {
	const [toast, setToast] = useState<ToastProps>();
	return (
		<>
			<ToastNotification toast={toast} setToast={setToast} />
			<div className="h-screen flex flex-col flex-grow">
				<NavBar setToast={setToast} />
				<AIInteractorCard
					CardHeader={<Settings />}
					CardBody={<AIInteractor setToast={setToast} />}
				/>
			</div>
		</>
	);
}

export default App;

interface AIInteractorCardProps {
	CardHeader: JSX.Element;
	CardBody: JSX.Element;
}
function AIInteractorCard({ CardHeader, CardBody }: AIInteractorCardProps) {
	return (
		<main className="-mt-48 h-3/5 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
			<Alert />

			<div className="h-full w-full flex flex-col mt-10 divide-y divide-gray-200 rounded-lg bg-white shadow">
				<div className="px-4 h-20 py-5 sm:px-6">{CardHeader}</div>
				<div className="px-4 py-5 h-full sm:p-6">{CardBody}</div>
			</div>
		</main>
	);
}
