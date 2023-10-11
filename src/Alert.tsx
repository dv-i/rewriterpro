import React from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { User } from "./store/dataInterfaces";
import { MAX_TRIES } from "./store/constants";

interface AlertProps {
	counter: number;
	user: User | undefined;
}
export default function Alert({ counter, user }: AlertProps) {
	return (
		<div
			className={`${
				user?.pro ? "invisible" : ""
			} rounded-md bg-blue-50 p-4`}
		>
			<div className="flex">
				<div className="flex-shrink-0">
					<InformationCircleIcon
						className="h-5 w-5 text-blue-400"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3 flex-1 md:flex md:justify-between">
					<p className="text-md text-blue-700">
						You have{" "}
						<span className="font-semibold">
							{" "}
							{MAX_TRIES - counter}{" "}
						</span>{" "}
						rewrites left for the day.{" "}
						<button className="text-left font-medium text-blue-700 underline hover:text-blue-600">
							Upgrade your account to get unlimited rewriting
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
