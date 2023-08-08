import React from "react";
export default function CTA() {
	return (
		<div className="bg-white pb-40">
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-16">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl text-black font-bold tracking-tight sm:text-5xl">
						Boost Your Content Productivity
						<br />
						Using{" "}
						<span className="text-indigo-600">RewriterPro.ai</span>
					</h2>
					<p className="pt-10 mx-auto mt-6 max-w-xl text-xl leading-8 text-black">
						RewriterPro.ai integrates cutting-edge artificial
						intelligence technology to create far superior,
						error-free, and easy-to-read content in far less time.
					</p>
					{/* <div className="mt-10 flex items-center justify-center gap-x-6">
						<a
							href="#"
							className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							Try for free
						</a>
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-white"
						>
							Subscribe to Pro <span aria-hidden="true">→</span>
						</a>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export function CTAv2() {
	return (
		<div className="bg-indigo-600">
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-indigo-200 sm:text-4xl">
						Boost Your Content Productivity
						<br />
						Using <span className="text-white">RewriterPro.ai</span>
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
						RewriterPro.ai integrates cutting-edge artificial
						intelligence technology to create far superior,
						error-free, and easy-to-read content in far less time.
					</p>
				</div>
			</div>
			<div style={{ height: 100 }}></div>
		</div>
	);
}
