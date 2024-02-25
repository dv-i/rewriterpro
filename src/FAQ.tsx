import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
	{
		question: "Is there a free tool to rewrite AI content?",
		answer: "RewriterPro is a free AI rewriter tool that helps you make the content written by AI tools undetectable and improve the writing quality. It makes your content free from silly errors or odd phrases while ensuring the original meaning of the text is not changed. Upgrade to increase limits to 6000 characters, unlock all premium features, and unlimited Ai text rewriting.",
	},
	{
		question:
			"How to make AI-generated text undetectable with RewriterPro? ",
		answer: "To bypass AI detection, simply rewrite your text with RewriterPro.ai. The tool uses advanced algorithms and technology to change the style, structure, and wording of AI-generated content. It can make text generated with ChatGPT, Gemini (Bard), Jasper AI, Turnitin, and other AI tools undetectable in less than a second. ",
	},
	{
		question: "How do I rewrite AI-generated content with RewriterPro?",
		answer: "Simply enter the text in the text box above, set your customization options, and hit the “Rewrite” button. You’ll get unique, undetectable content in just a click.",
	},
	{
		question:
			"Does RewriterPro maintain the SEO optimization of the content?",
		answer: "Yes, our tool is smart enough to understand and retain important keywords in your text. It rewrites the content in a better way while ensuring SEO remains intact.",
	},
	{
		question: "What is the best AI Humanizer?",
		answer: "RewriterPro is one of the best tools to humanize AI content and make it sound more human. It uses advanced technology and natural language processing to accurately rewrite content without losing the original idea. The text it generates is more clear, structured, and reader-friendly.",
	},
	{
		question: "How to not get detected by GPT Zero?",
		answer: "RewriterPro.ai is one of the best paraphrasing tools to avoid AI detection by GPTZero, Content at Scale, Originality AI, Copyleaks, Character AI filter, and more.",
	},
	{
		question: "Why the Ai Humanizer is not working?",
		answer: "To get a better human score for your AI content, try rewriting again, or copying the rewritten text again in the input box and click Rewrite with Humanizer On.",
	},
];

export default function Example() {
	return (
		<div className="faqssection">
			<div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8 lg:py-16">
				<div className="mx-auto max-w-4xl divide-y divide-white/10">
					<h2 className="lg:max-w-2xl mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
						Frequently asked questions
					</h2>
					<div className="custom_divider"></div>
					<dl className="mt-10 space-y-3 divide-y divide-white/10">
						{faqs.map((faq) => (
							<Disclosure
								as="div"
								key={faq.question}
								className="py-6 faqitem"
							>
								{({ open }) => (
									<>
										<dt>
											<Disclosure.Button className="flex w-full items-start justify-between text-left">
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
											<p className="text-base leading-7">
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
