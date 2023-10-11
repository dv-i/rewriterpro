import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
	{
		question: "What is RewriterPro.ai",
		answer: "RewriterPro.ai is a rewriting tool that helps you rewrite your existing content through artificial intelligence ",
	},
	{
		question: "How does RewriterPro.ai Work?",
		answer: "RewriterPro.ai features proprietary AI technology (that took 2 months to develop) to generate brilliant, and amazing content for your brand, business, or work. ",
	},
	{
		question: "Does RewriterPro.ai create Plagiairsm-Free content?",
		answer: "Indeed. With the help of Artificial Intelligence, RewriterPro.ai produces exceptional, error-free, and plagiarism-free content. However, just to be safe, you can run the final content through any available plagiarism-checker tool to check for any possible plagiarism.",
	},
	{
		question: "Is RewriterPro.ai available for Free?",
		answer: "Unfortunately, RewriterPro.ai is a paid tool. But it comes with insanely low price packages. However, You can get 15 FREE rewrites for one day. This can help you get a good idea of what this tool is capable of.",
	},
	{
		question: "What are the subscription plans?",
		answer: "You get two options: You can pay $9.95 per month and get every feature unlocked. You can pay $59.95 annually. This comes down to only $4.99 per month. You get everything unlocked plus you save a huge $60 as compared to regular monthly billing.",
	},
];

export default function Example() {
	return (
		<div className="bg-indigo-600 -z-10">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl divide-y divide-white/10">
					<h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
						Frequently asked questions
					</h2>
					<dl className="mt-10 space-y-6 divide-y divide-white/10">
						{faqs.map((faq) => (
							<Disclosure
								as="div"
								key={faq.question}
								className="pt-6"
							>
								{({ open }) => (
									<>
										<dt>
											<Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
												<span className="text-base font-semibold leading-7">
													{faq.question}
												</span>
												<span className="ml-6 flex h-7 items-center">
													{open ? (
														<MinusSmallIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													) : (
														<PlusSmallIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													)}
												</span>
											</Disclosure.Button>
										</dt>
										<Disclosure.Panel
											as="dd"
											className="mt-2 pr-12"
										>
											<p className="text-base leading-7 text-gray-300">
												{faq.answer}
											</p>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
