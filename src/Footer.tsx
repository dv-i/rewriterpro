import React from "react";
const navigation = {
	main: [
		{ name: "About", href: "#" },
		{ name: "Privacy & Terms", href: "#" },
		{ name: "Contact Us", href: "#" },
	],
};

export default function Example() {
	return (
		<footer className="bg-white">
			<div className="mx-auto max-w-7xl overflow-hidden px-3 py-10">
				<nav
					className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
					aria-label="Footer"
				>
					{navigation.main.map((item) => (
						<div key={item.name} className="pb-6">
							<a
								href={item.href}
								className="text-sm leading-6 text-gray-600 hover:text-gray-900"
							>
								{item.name}
							</a>
						</div>
					))}
				</nav>
				<p className="mt-10 text-center text-xs leading-5 text-gray-500">
					&copy; 2023 RewriterPro.ai, Inc. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
