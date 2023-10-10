import React from "react";
import {
	CurrencyDollarIcon,
	ChartBarIcon,
	CubeTransparentIcon,
	PaintBrushIcon,
	ClockIcon,
	PencilSquareIcon,
	BriefcaseIcon,
} from "@heroicons/react/20/solid";

const features = [
	{
		name: "Create Breathtaking Content.",
		description:
			"The use of words matters the most throughout the internet, so it's crucial that you stand out from the competition and generate unmatchable and amazing content right off the bat.\nIn a world where generic content is everywhere, ReWriter AI helps you in generating that unique content by adding a spectacular touch that drastically improves the quality of content.",
		icon: PencilSquareIcon,
	},
	{
		name: "Save Countless Hours.",
		description:
			"ReWriter AI helps you write splendid content    Our AI is programmed to make your sentence rewriting tasks quick and easy.   Suppose you’re a student, teacher, or content creator. In that case, ReWriter AI helps you save tons of time by generating quality and ready-to-publish content within seconds and without compromising the original quality.   All you have to do is paste your basic-written content and click the “Rewrite” button. And by the time you check your phone’s notifications, your final content will be ready.",
		icon: ClockIcon,
	},
	{
		name: "Save Money.",
		description:
			"ReWriter AI is much better, faster, and more efficient than most writers. It is an all-in-one rewriter tool that you can get at a fraction of the price you pay for writers.   All you have to do is to write down your simple sentences in the input box and click “Rewrite”. With multiple options available (standard, creative, formal, etc.) you can create all sorts of content.  That too, at an INSANELY low price.",
		icon: CurrencyDollarIcon,
	},
	{
		name: "Enhance Productivity.",
		description:
			"No need to drain all your energy over a single article. With ReWriter AI, you can generate much better content in much lesser time.   This means you will have more time to focus on things that are really important. You will have spare time to spend on brand management, lead generation, etc.",
		icon: ChartBarIcon,
	},
	{
		name: "Unleash YOUR Creativity.",
		description:
			"Unlike other generic ai word rewriter tools, ReWriter AI pro boosts up your content by adding fascinating words and phrases. This means the output generated by RewriterPro.ai will let you know how your content can be amplified.   With each new improvement, you will be able to learn which set of words perfectly describes your business in the most elaborate way possible.",
		icon: PaintBrushIcon,
	},
	{
		name: "Plagiarism-Free Content.",
		description:
			"One of the most important reasons to use ReWriter AI is to generate plagiarism-free content for your brand.   With strict Google policies, it is important to ALWAYS generate content that doesn’t resembles any other published content on the internet.  If you find an interesting paragraph on the internet, copy it and paste it into this spectacular paragraph rewriter to generate the same type of content but in a much better way.",
		icon: CubeTransparentIcon,
	},
	{
		name: "Simplify Difficult Content.",
		description:
			"Sometimes, context becomes hard to put into words. That’s why it's unable to get much attention from readers because readers fail to understand its essential meaning.   With ReWriter AI, you will be able to transform your ideas into simple, persuasive, convenient words that will leave an impact on your readers.",
		icon: BriefcaseIcon,
	},
];

export default function Example() {
	return (
		<div className="bg-indigo-600 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Why use RewriterPro.ai?
					</p>
					{/* <p className="mt-6 text-lg leading-8 text-gray-300">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Maiores impedit perferendis suscipit eaque, iste
						dolor cupiditate blanditiis.
					</p> */}
				</div>
				<dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
					{features.map((feature) => (
						<div key={feature.name} className="relative pl-9">
							<dt className="inline font-semibold text-white">
								<feature.icon
									className="absolute left-1 top-1 h-5 w-5 text-white"
									aria-hidden="true"
								/>
								{feature.name}
							</dt>{" "}
							<dd className="inline">{feature.description}</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
	);
}
