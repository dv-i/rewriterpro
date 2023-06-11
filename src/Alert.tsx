import React from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function Alert() {
	return (
		<div className="invisible rounded-md bg-blue-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<InformationCircleIcon
						className="h-5 w-5 text-blue-400"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3 flex-1 md:flex md:justify-between">
					<p className="text-sm text-blue-700">
						You have <span className="font-semibold"> 20 </span>{" "}
						paraphrases left.{" "}
						<button className="font-medium text-blue-700 underline hover:text-blue-600">
							Upgrade your account to get unlimited paraphrasing
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
