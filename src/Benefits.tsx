import React from "react";
import HumanizerImg from "./assets/humanizerEditorImg.png";
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
			"One of the most difficult ways to stand out from the competition is to make SEO-friendly content. With ReWriterPro.ai, you will be able to generate content that can rank on Google’s first page and hence, be able to attract a lot of attention from visitors right off the bat.",
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
		<div className="bg-white py-16">
			<div className="relative lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 divcontainer">
				<div className="relative">
					<dl className="space-y-10">
						<div className="relative">
							<dt>
								<p className="text-3xl font-bold lg:ml-12 leading-8 text-gray-900 mb-6">
									No Content Spinning – It's a Real, Accurate
									Text Humanizer
								</p>
							</dt>
							<dd className="lg:ml-12 mt-2 text-base text-gray-500 blacktext">
								Rewriting is not the only purpose. You want
								content that makes sense and sounds written by a
								human. This is exactly what RewriterPro does for
								you. RewriterPro’s Text Humanizer turns your
								AI-generated text into human-like so that it
								passes even manual AI checks. It uses natural
								language processing to give your AI content a
								complete human touch without compromising the
								accuracy of the text. What do you get? Content
								with improved grammar, structure, flow, clarity,
								and engagement.
							</dd>
							<button className="cta_button lg:ml-12">
								Humanize AI Text for Free
							</button>
						</div>
					</dl>
				</div>

				<div
					className="relative -mx-0 mt-10 lg:mt-0"
					aria-hidden="true"
				>
					<img
						className="relative mx-auto"
						width={500}
						src={HumanizerImg}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
