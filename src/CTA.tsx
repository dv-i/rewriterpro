import React from "react";
export default function CTA() {
	return (
		<div className="bg-indigo-600 pb-40">
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-16">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-[2.8rem] leading-[2.8rem] font-bold tracking-tight text-white text-center">
						Experience the Power of <br /> AI Rewriting with
						<span className="text-indigo-600">RewriterPro.ai</span>
					</h2>
					<p className="pt-10 mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
						ReWriter Pro integrates cutting-edge artificial
						technology to create far superior, error-free, and
						human-like content in far less time.
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
			<div className="px-6 pt-0 pb-24 sm:px-6 sm:pt-0 sm:pb-30 lg:px-8">
				<div className="mx-auto max-w-4xl text-center mt-5">
					<h2 className="text-[2.8rem] leading-[2.8rem] font-bold tracking-tight text-indigo-200 text-center">
						<span className="text-white">
							Rewrite AI Text to{" "}
							<span className="yellowtxt">
								Sound Unmistakably Human
							</span>{" "}
							and Bypass AI Detection
						</span>
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-6 text-indigo-200 pb-5">
						Remove AI content and bypass AI detectors. The AI text
						humanizer improves AI-written content to match the
						quality of human writing. Zero plagiarism!
					</p>
				</div>
			</div>
			<div style={{ height: 100 }}></div>
		</div>
	);
}
