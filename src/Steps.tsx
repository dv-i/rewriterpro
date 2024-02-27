import React from "react";
import Editorimgsteps from "./assets/editorstepsuseimage-65dde4e45265d.webp";
import Icon1 from "./assets/listiconcheck.png";
import Icon2 from "./assets/listiconai.png";
import Icon3 from "./assets/listiconsearch.png";
import Icon4 from "./assets/listiconbrain.png";
import Icon5 from "./assets/listiconremove.png";
import Icon6 from "./assets/listiconhand.png";
import Icon7 from "./assets/listiconfast.png";

export default function Example() {
	return (
		<div className="bg-white pt-12">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
					<h2 className="lg:max-w-2xl mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
						How to Remove AI Detection with RewriterPro Bypass
					</h2>
					<div className="custom_divider"></div>
					<ul className="stepslist">
						<li>Enter the AI-written text in RewriterPro </li>
						<li>
							Choose your desired tone, language, audience, and
							other customization options
						</li>
						<li>
							{
								"Turn on the ‘Humanizer’ option if you want humanized content"
							}
						</li>
						<li>
							{
								"Hit ‘Rewrite’ and get content that’s undetectable, humanized, and plagiarism-free."
							}
						</li>
					</ul>
				</div>
				<div className="mt-12 stepgbimage">
					<img
						className="mx-auto"
						src={Editorimgsteps}
						width={1000}
						alt=""
					/>
				</div>
			</div>
			<div className="parentdivlast">
				<div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
					<h2 className="lg:max-w-2xl mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
						Rewrite, Humanize, Detect: All-in-One AI Content
						Solution
					</h2>
					<div className="custom_divider"></div>
				</div>
				<div className="SecIconList">
					<div>
						<img src={Icon1} alt="" />
						<h4>{"Remove AI writing"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{"Bypass leading AI detectors"}
						</dd>
					</div>
					<div>
						<img src={Icon2} alt="" />
						<h4>{"Humanize AI text"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Written with ChatGPT, Geminin (Bard), and other AI tools"
							}
						</dd>
					</div>
					<div>
						<img src={Icon3} alt="" />
						<h4>{"Detect AI content"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Build-in AI detector that gives a detection score"
							}
						</dd>
					</div>
					<div>
						<img src={Icon4} alt="" />
						<h4>{"Content that makes sense"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{"No content spinning! 100% accuracy maintained"}
						</dd>
					</div>
					<div>
						<img src={Icon5} alt="" />
						<h4>{"Remove plagiarism"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{"100% unique and free from plagiarism content"}
						</dd>
					</div>
					<div>
						<img src={Icon6} alt="" />
						<h4>{"Easy to Use"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{"No complicated interface. Everyone can use it"}
						</dd>
					</div>
					<div>
						<img src={Icon7} alt="" />
						<h4>{"Fast and Efficient"}</h4>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{"Generate multiple outputs in less than a second"}
						</dd>
					</div>
				</div>
				<div className="buttoncontainer text-center">
					<a href="#editorRewriter" className="cta_button">Try for Free Now</a>
				</div>
			</div>
		</div>
	);
}
