import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface CustomToastProps {
	message: string;
}

export const CustomToast = ({ message }: CustomToastProps) => {
	return (
		<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
			<div className="p-4">
				<div className="flex items-start">
					<div className="flex-shrink-0">
						<XCircleIcon
							className="h-6 w-6 text-red-400"
							aria-hidden="true"
						/>
					</div>
					<div className="ml-3 w-0 flex-1 pt-0.5">
						<p className="text-sm font-medium text-gray-900">
							{message}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
