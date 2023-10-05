import React from "react";
import Alert from "../Alert";
import { User } from "../store/dataInterfaces";

interface AIInteractorCardProps {
	CardHeader: JSX.Element;
	CardBody: JSX.Element;
	counter: number;
	user: User | undefined;
}

export default function AIInteractorCard({
	CardHeader,
	CardBody,
	counter,
	user,
}: AIInteractorCardProps) {
	return (
		<main className="-mt-[11rem] mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 block">
			<Alert user={user} counter={counter} />

			<div style={{ height: 20 }}></div>
			<div className="h-full w-full flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
				<div className="pl-4 pr-4 sm:h-20 py-5 sm:px-6">
					{CardHeader}
				</div>
				<div className="pl-4 sm:pr-4 py-5 h-full sm:p-6">
					{CardBody}
				</div>
			</div>
		</main>
	);
}
