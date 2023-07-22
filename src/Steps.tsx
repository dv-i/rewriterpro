import React from "react";
import Image1 from "./assets/image1.jpg";
import Image2 from "./assets/image2.jpg";
import Image3 from "./assets/image3.jpg";
import Image4 from "./assets/image4.jpg";

export default function Example() {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-4xl">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						How to use ReWriter Pro?
					</h2>
					<p className="mt-8 text-xl leading-8 text-gray-600">
						Follow these three easy steps in order to generate
						fantastic content in just a few seconds:
					</p>
					<div className="mt-16 space-y-10 lg:mt-20 lg:space-y-2">
						{/* Step 1 */}
						<div>
							<h3 className="mb-10 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
								Step 1: Input
							</h3>
							<p className="text-lg leading-6 text-gray-600">
								In the left “Original” box, paste the content
								that needs to be improved. On the Selection Bar
								above, choose the variety of modes that you need
								your final content to look like.
							</p>
							{/* <p className="text-lg leading-6 text-gray-600">
								On the Selection Bar above, choose the variety
								of modes that you need your final content to
								look like.
							</p> */}
							<div className="flex justify-center py-10 pr-20">
								<img
									src={Image1}
									alt=""
									className="center rounded-2xl object-cover"
								/>
							</div>
							<p className="text-lg leading-6 text-gray-600">
								There are a variety of options such as:
							</p>
							<ul className="list-disc pl-5 text-lg leading-6 text-gray-600">
								<li>Choosing the right tone</li>
								<li>Choosing the Ideal audience</li>
								<li>Selecting the right set of emotions</li>
								<li>Choosing an ideal length.</li>
							</ul>
							<p className="text-lg leading-6 text-gray-600">
								<br />
								And so on...
							</p>
							<div className="flex justify-center py-10 pr-20">
								<img
									src={Image2}
									alt=""
									className="center rounded-2xl object-cover"
								/>
							</div>
						</div>

						{/* Step 2 */}
						<div>
							<h3 className="mb-10 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
								Step 2: Paraphrasing
							</h3>
							<p className="text-lg leading-6 text-gray-600">
								When everything’s set according to you, click on
								the “Rewrite” button”. Our proprietary AI will
								paraphrase the text according to your
								requirements
							</p>
							<div className="flex justify-center py-10 pr-20">
								<img
									src={Image3}
									alt=""
									className="center rounded-2xl object-cover"
								/>
							</div>
						</div>

						{/* Step 3 */}
						<div>
							<h3 className="mb-10 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
								Step 3: Output
							</h3>
							<p className="text-lg leading-6 text-gray-600">
								When it’s done and you get the output, you can
								either download it or copy the final text and
								paste it into your desired location.
							</p>
							<div className="flex justify-center py-10 pr-20">
								<img
									src={Image4}
									alt=""
									className="center rounded-2xl object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
