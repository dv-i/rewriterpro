import React from "react";
import HumanizerImg from "./assets/humanizerEditorImg.png";
import GPTimg1 from "./assets/gpt3.5.png";
import GPTimg2 from "./assets/gpt4.png";
import Jasper from "./assets/JASPER.png";
import Geminiaiimg from "./assets/geminiicon 1.png";
import PlagIcons from "./assets/plagIcons.png";

<<<<<<< HEAD
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
=======
// const features = [
// 	{
// 		name: "Bring Tons of Leads",
// 		description:
// 			"Quality content attracts a lot of eyes… and leads. Content produced through ReWriter AI has so much power and quality in it that your reader can’t resist reading more.\nThis type of attraction makes the reader your ‘fan’ and they are very near to becoming your potential high-value lead to your business. ",
// 		icon: SparklesIcon,
// 	},
// 	{
// 		name: "Break The SEO Charts",
// 		description:
// 			"One of the most difficult ways to stand out from the competition is to make SEO-friendly content. With ReWriterPro.ai, you will be able to generate content that can rank on Google’s first page and hence, be able to attract a lot of attention from visitors right off the bat.",
// 		icon: PresentationChartLineIcon,
// 	},
// 	{
// 		name: "Rule Social Media",
// 		description:
// 			"It’s quite hard to get in and keep up with the latest social media trends. And most of the “stay on top charts” game relies on how EPIC and thrilling your content is.\nRewriterPro.ai is able to capture the same voice and tone that matches the social media vibes in order to people’s attention.\nWith an exemplary touch, you can generate content that stays on top charts and attracts the eyes of potential audiences all the time.",
// 		icon: GlobeAsiaAustraliaIcon,
// 	},
// 	{
// 		name: "Amplify Your Brand Image",
// 		description:
// 			"The same goes for the brand image as well. When you’re using words, phrases, and sentences that arouse the audience’s emotions, you are more likely to be able to drive any sort of action from them. It can be: a \n“follow” to your brand, a “registration” for a pre-launch product, a “buy now” for an existing product.You name it and ReWriter AI will do it. ",
// 		icon: MagnifyingGlassCircleIcon,
// 	},
// ];
>>>>>>> 64a074a1a6fdb93d238b6de43f47d78974369162

export default function Example() {
	return (
		<div className="bg-white py-16">
			<div className="relative lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 divcontainer">
				<div className="relative">
					<dl className="space-y-10">
						<div className="relative">
							<dt>
								<p className="text-3xl font-bold lg:ml-12 leading-8 text-gray-900 mb-6">
									{`No Content Spinning – It's a Real, Accurate
										Text Humanizer`}
								</p>
							</dt>
							<dd className="lg:ml-12 mt-2 text-base text-gray-500 blacktext">
								{`
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
								and engagement.`}
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

			<div className="containerbgfull">
				<div className="relative lg:mt-6 lg:grid lg:grid-cols-1 text-center pt-16 lg:items-center lg:gap-8 divcontainersmall">
					<div className="relative">
						<dl className="space-y-10">
							<div className="relative">
								<dt>
									<p className="text-3xl font-bold leading-8 text-gray-900 mb-6">
										100% Human Content Score with Leading AI
										Detectors
									</p>
								</dt>
								<dd className=" mt-2 text-base text-gray-500 blacktext">
									RewriterPro makes AI text generated by any
									language model – such as
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div className="logogrid">
					<div className="logoitem">
						<img src={GPTimg1} width={50} />
						<h4>ChaGPT 3.5</h4>
					</div>
					<div className="logoitem">
						<img src={GPTimg2} width={50} />
						<h4>ChaGPT 4</h4>
					</div>
					<div className="logoitem">
						<img src={Geminiaiimg} width={60} />
						<h4>Gemini (Google Bard)</h4>
					</div>
					<div className="logoitem">
						<img src={Jasper} width={58} />
						<h4>Jasper AI</h4>
					</div>
				</div>
				<div className="buttoncontainer text-center">
					<dd className=" mt-2 text-base text-gray-500 blacktext">
						{`
					And more– human-written so that it bypasses AI detectors.
					It makes your AI text undetectable by leading AI content detectors, including: 
					`}
					</dd>

					<button className="cta_button">
						Bypass AI Detectors Now
					</button>
				</div>
			</div>
			<div className="relative lg:mt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 divcontainer">
				<div className="relative">
					<dl className="space-y-10">
						<div className="relative">
							<dt>
								<p className="text-3xl font-bold lg:ml-12 leading-8 text-gray-900 mb-6">
									{"100% Plagiarism-Free and Unique Content "}
								</p>
							</dt>
							<dd className="lg:ml-12 mt-2 text-base text-gray-500 blacktext">
								{`
									Use our rewriter tool to remove plagiarism from your AI-generated or human-written content. It ensures that every piece is 100% unique and plagiarism-free, making it an ideal solution for bloggers, marketers, and academic professionals. 
									`}
							</dd>
							<button className="cta_button lg:ml-12">
								Remove Plagiarism Now
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
						src={PlagIcons}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
