import React from "react";

const features1 = [
	{
		name: "Create Breathtaking Content.",
		description:
			"The use of words matters the most throughout the internet, so it's crucial that you stand out from the competition and generate unmatchable and amazing content right off the bat.\nIn a world where generic content is everywhere, ReWriter AI helps you in generating that unique content by adding a spectacular touch that drastically improves the quality of content.",
	},
	{
		name: "Save Countless Hours.",
		description:
			"ReWriter AI helps you write splendid content    Our AI is programmed to make your content tasks quick and easy.   Suppose you’re a student, teacher, or content creator. In that case, ReWriter AI helps you save tons of time by generating quality and ready-to-publish content within seconds and without compromising the original quality.   All you have to do is paste your basic-written content and click the “Rewrite” button. And by the time you check your phone’s notifications, your final content will be ready.",
	},
	{
		name: "Save Money.",
		description:
			"ReWriter AI is much better, faster, and more efficient than most writers. It is an all-in-one rewriter tool that you can get at a fraction of the price you pay for writers.   All you have to do is to write down your simple sentences in the input box and click “Rewrite”. With multiple options available (standard, creative, formal, etc.) you can create all sorts of content.  That too, at an INSANELY low price.",
	},
	{
		name: "Enhance Productivity.",
		description:
			"No need to drain all your energy over a single article. With ReWriter AI, you can generate much better content in much lesser time.   This means you will have more time to focus on things that are really important. You will have spare time to spend on brand management, lead generation, etc.",
	},
	{
		name: "Unleash YOUR Creativity.",
		description:
			"Unlike other generic ai word rewriter tools, ReWriter AI pro boosts up your content by adding fascinating words and phrases. This means the output generated by RewriterPro.ai will let you know how your content can be amplified.   With each new improvement, you will be able to learn which set of words perfectly describes your business in the most elaborate way possible.",
	},
	{
		name: "Plagiarism-Free Content.",
		description:
			"One of the most important reasons to use ReWriter AI is to generate plagiarism-free content for your brand.   With strict Google policies, it is important to ALWAYS generate content that doesn’t resembles any other published content on the internet.  If you find an interesting paragraph on the internet, copy it and paste it into this spectacular paragraph rewriter to generate the same type of content but in a much better way.",
	},
	{
		name: "Simplify Difficult Content.",
		description:
			"Sometimes, context becomes hard to put into words. That’s why it's unable to get much attention from readers because readers fail to understand its essential meaning.   With ReWriter AI, you will be able to transform your ideas into simple, persuasive, convenient words that will leave an impact on your readers.",
	},
];

export default function Example() {
	return (
		<div className="overflow-hidden bg-gray-50 py-16 lg:py-24">
			<div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
				<div className="relative">
					<h2 className="mx-auto mt-24 text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
						Why use RewriterPro.ai?
					</h2>
				</div>

				<div className="relative mt-12 lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
					<div className="relative">
						<dl className="mt-10 space-y-10">
							<div key={features1[0].name} className="relative">
								<dt>
									<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
										{features1[0].name}
									</p>
								</dt>
								<dd className="lg:ml-16 mt-2 text-base text-gray-500">
									{features1[0].description}
								</dd>
							</div>
						</dl>
					</div>

					{/* <div
						className="relative -mx-4 mt-10 lg:mt-0"
						aria-hidden="true"
					>
						<img
							className="relative mx-auto"
							width={490}
							src="https://placehold.co/540x960"
							alt=""
						/>
					</div> */}
				</div>

				<div className="relative mt-12 sm:mt-16 lg:mt-6">
					<div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
						<div className="lg:col-start-2">
							<dl className="mt-10 space-y-10">
								<div
									key={features1[1].name}
									className="relative"
								>
									<dt>
										<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
											{features1[1].name}
										</p>
									</dt>
									<dd className="lg:ml-16 mt-2 text-base text-gray-500">
										{features1[1].description}
									</dd>
								</div>
							</dl>
						</div>

						{/* <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
							<img
								className="relative mx-auto"
								width={490}
								src="https://placehold.co/540x540"
								alt=""
							/>
						</div> */}
					</div>
				</div>

				<div className="relative mt-12 lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
					<div className="relative">
						<dl className="mt-10 space-y-10">
							<div key={features1[2].name} className="relative">
								<dt>
									<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
										{features1[2].name}
									</p>
								</dt>
								<dd className="lg:ml-16 mt-2 text-base text-gray-500">
									{features1[2].description}
								</dd>
							</div>
						</dl>
					</div>

					{/* <div
						className="relative -mx-4 mt-10 lg:mt-0"
						aria-hidden="true"
					>
						<img
							className="relative mx-auto"
							width={490}
							src="https://placehold.co/540x540"
							alt=""
						/>
					</div> */}
				</div>

				<div className="relative mt-12 sm:mt-16 lg:mt-6">
					<div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
						<div className="lg:col-start-2">
							<dl className="mt-10 space-y-10">
								<div
									key={features1[3].name}
									className="relative"
								>
									<dt>
										<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
											{features1[3].name}
										</p>
									</dt>
									<dd className="lg:ml-16 mt-2 text-base text-gray-500">
										{features1[3].description}
									</dd>
								</div>
							</dl>
						</div>

						{/* <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
							<img
								className="relative mx-auto"
								width={490}
								src="https://placehold.co/540x540"
								alt=""
							/>
						</div> */}
					</div>
				</div>

				<div className="relative mt-12 lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
					<div className="relative">
						<dl className="mt-10 space-y-10">
							<div key={features1[4].name} className="relative">
								<dt>
									<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
										{features1[4].name}
									</p>
								</dt>
								<dd className="lg:ml-16 mt-2 text-base text-gray-500">
									{features1[4].description}
								</dd>
							</div>
						</dl>
					</div>

					{/* <div
						className="relative -mx-4 mt-10 lg:mt-0"
						aria-hidden="true"
					>
						<img
							className="relative mx-auto"
							width={490}
							src="https://placehold.co/540x540"
							alt=""
						/>
					</div> */}
				</div>

				<div className="relative mt-12 sm:mt-16 lg:mt-6">
					<div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
						<div className="lg:col-start-2">
							<dl className="mt-10 space-y-10">
								<div
									key={features1[5].name}
									className="relative"
								>
									<dt>
										<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
											{features1[5].name}
										</p>
									</dt>
									<dd className="lg:ml-16 mt-2 text-base text-gray-500">
										{features1[5].description}
									</dd>
								</div>
							</dl>
						</div>

						{/* <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
							<img
								className="relative mx-auto"
								width={490}
								src="https://placehold.co/540x540"
								alt=""
							/>
						</div> */}
					</div>
				</div>

				<div className="relative mt-12 lg:mt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
					<div className="relative">
						<dl className="mt-10 space-y-10">
							<div key={features1[6].name} className="relative">
								<dt>
									<p className="lg:ml-16 text-lg font-medium leading-6 text-gray-900">
										{features1[6].name}
									</p>
								</dt>
								<dd className="lg:ml-16 mt-2 text-base text-gray-500">
									{features1[6].description}
								</dd>
							</div>
						</dl>
					</div>

					{/* <div
						className="relative -mx-4 mt-10 lg:mt-0"
						aria-hidden="true"
					>
						<img
							className="relative mx-auto"
							width={490}
							src="https://placehold.co/540x540"
							alt=""
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
}