import React from "react";
import Charticon from "./assets/charticon.png";
import Speakicon from "./assets/speakicon.png";
import Communicationicon from "./assets/communication.png";
import settingsicon from "./assets/settings.png";
import Smileicon from "./assets/smileicon.png";
import Multiicon from "./assets/multilangual.png";
import Checkerimg from "./assets/aicheckerbuiltin.png";

export default function Example() {
	return (
		<div className="">
			<div className="workparentfirst workchangesection">
				<div className="relative lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 divcontainer pt-8 pb-16">
					<div className="relative">
						<dl className="space-y-10">
							<div className="relative">
								<dt>
									<p className="text-3xl font-bold lg:ml-12 leading-8 text-gray-900 mb-6">
										{
											"And It Not Only Rewrites. It Detects AI Content too! "
										}
									</p>
								</dt>
								<dd className="lg:ml-12 mt-2 text-base text-gray-500 blacktext">
									{
										"RewriterPro also has a built-in AI checker that automatically scans the text and gives a score on how likely the content is written by AI. If the output fails to bypass AI detection, you can regenerate the text. "
									}
								</dd>
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
							src={Checkerimg}
							alt=""
						/>
					</div>
				</div>
			</div>
			<div className="workparentsecond">
				<div className="relative lg:mt-6 lg:grid lg:grid-cols-1 text-center pt-16 lg:items-center lg:gap-8 divcontainersmall">
					<div className="relative">
						<dl className="space-y-10">
							<div className="relative">
								<h2 className="lg:max-w-2xl mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
									Generate the Personalized Outputs
								</h2>
								<div className="custom_divider"></div>
								<dd className=" mt-2 text-base text-gray-500 blacktext">
									{
										"Our AI rewriter tool comes with a lot of customization options, allowing you to rewrite text in your desired tone, fluency level, length, and emotion to get your desired output.  "
									}
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div className="content_list">
					<div className="content-list-item">
						<img src={Charticon} alt="" width={40} />
						<h4>{"Choose Your Text’s Complexity"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Our tool offers customizable fluency levels to ensure your rewritten content matches your intended complexity level. You can choose between basic, intermediate, and advanced fluency levels to ensure your message resonates with every reader."
							}
						</dd>
					</div>
					<div className="content-list-item">
						<img src={Speakicon} alt="" width={40} />
						<h4>{"Speak Directly to Your Ideal Reader"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"We know the importance of audience-specific content. RewriterPro gives you multiple audience options to ensure your content speaks directly to the hearts and minds of your intended readers and leaves a greater impact."
							}
						</dd>
					</div>
					<div className="content-list-item">
						<img src={Communicationicon} alt="" width={40} />
						<h4>
							{"Choose the Tone that Your Audience can Relate to"}
						</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Set the tone to match your message's goal. Choose a formal tone for professional accuracy, academic to support scholarly work, clear for smooth communication, creative for storytelling, optimistic for a positive spin, or story-like to engage with narrative flair."
							}
						</dd>
					</div>
					<div className="content-list-item">
						<img src={Smileicon} alt="" width={40} />
						<h4>{"Fine-tune Your Content’s Emotional Value"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Add the right amount of emotion into your content with settings ranging from mild to strong. This gives your content the desired depth of feeling and allows it to persuade, engage, or resonate with readers. "
							}
						</dd>
					</div>
					<div className="content-list-item">
						<img src={settingsicon} alt="" width={40} />
						<h4>{"Control Text Length "}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Choose short length for concise, impactful messages or long for detailed, comprehensive content. This flexibility ensures your rewritten content fits the format and purpose."
							}
						</dd>
					</div>
					<div className="content-list-item">
						<img src={Multiicon} alt="" width={40} />
						<h4>{"Rewrite in Multiple Languages "}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"The tool can rewrite AI-generated content in multiple languages, including English, Spanish, French, and German. You get a seamless translation without losing the original meaning."
							}
						</dd>
					</div>
				</div>
			</div>
		</div>
	);
}
