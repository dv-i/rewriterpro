import React from "react";
import NavBar from "./NavBar";
import Alert from "./Alert";
import Settings from "./Settings";
import AIInteractor from "./AIInteractor";
import { FEATURE_FLAGS } from "./constants";

function App() {
	return (
		<div className="h-screen flex flex-col flex-grow">
			<NavBar />
			<AIInteractorCard
				CardHeader={<Settings />}
				CardBody={<AIInteractor />}
			/>
		</div>
	);
}

export default App;

interface AIInteractorCardProps {
	CardHeader: JSX.Element;
	CardBody: JSX.Element;
}
function AIInteractorCard({ CardHeader, CardBody }: AIInteractorCardProps) {
	return (
		<main className="-mt-48 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
			{FEATURE_FLAGS.PARAPHRASE_LIMIT_BANNER && <Alert />}


			<div className="h-full w-full flex flex-col mt-10 divide-y divide-gray-200 rounded-lg bg-white shadow">
				<div className="px-4 h-20 py-5 sm:px-6">{CardHeader}</div>
				<div className="px-4 py-5 h-full sm:p-6">{CardBody}</div>
			</div>
		</main>
	);
}
