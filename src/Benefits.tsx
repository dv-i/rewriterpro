import React from "react";
import {
	SparklesIcon,
	PresentationChartLineIcon,
	GlobeAsiaAustraliaIcon,
	MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

const features = [
	{
		name: "Bring Tons of Leads",
		description:
			"Quality content attracts a lot of eyes… and leads. Content produced through ReWriter AI has so much power and quality in it that your reader can’t resist reading more.\nThis type of attraction makes the reader your ‘fan’ and they are very near to becoming your potential high-value lead to your business. ",
		icon: SparklesIcon,
	},
	{
		name: "Break The SEO Charts",
		description:
			"SOne of the most difficult ways to stand out from the competition is to make SEO-friendly content. With ReWriterPro.ai, you will be able to generate content that can rank on Google’s first page and hence, be able to attract a lot of attention from visitors right off the bat.",
		icon: PresentationChartLineIcon,
	},
	{
		name: "Rule Social Media",
		description:
			"It’s quite hard to get in and keep up with the latest social media trends. And most of the “stay on top charts” game relies on how EPIC and thrilling your content is.\nRewriterPro.ai is able to capture the same voice and tone that matches the social media vibes in order to people’s attention.\nWith an exemplary touch, you can generate content that stays on top charts and attracts the eyes of potential audiences all the time.",
		icon: GlobeAsiaAustraliaIcon,
	},
	{
		name: "Amplify Your Brand Image",
		description:
			"The same goes for the brand image as well. When you’re using words, phrases, and sentences that arouse the audience’s emotions, you are more likely to be able to drive any sort of action from them. It can be: a \n“follow” to your brand, a “registration” for a pre-launch product, a “buy now” for an existing product.You name it and ReWriter AI will do it. ",
		icon: MagnifyingGlassCircleIcon,
	},
];

export default function Example() {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Benefits Of Unique Content
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-900">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
										<feature.icon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</div>
									<div className="text-xl">
										{feature.name}
									</div>
								</dt>
								{feature.description.split("\n").map((text) => (
									<dd
										className="mt-2 text-base leading-7 text-gray-600"
										key={`${feature.name}-${text}`}
									>
										{text}
									</dd>
								))}
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
