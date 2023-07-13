import React from "react";
import Step1 from "../src/assets/Step1.png";
import Step2 from "../src/assets/Step2.png";
import Step3 from "../src/assets/Step3.png";
const posts = [
	{
		id: 1,
		title: "Step 1: Input",
		href: "#",
		description:
			"In the left “Original” box, paste the content that needs to be improved. On the Selection Bar above, choose the variety of modes that you need your final content to look like. There are variety of options such as: Choosing the right tone, the ideal audience, the reight set of emotions, ideal length and so on...",
		imageUrl: Step1,
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		category: { title: "Marketing", href: "#" },
		author: {
			name: "Michael Foster",
			role: "Co-Founder / CTO",
			href: "#",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	{
		id: 2,
		title: "Step 2: Paraphrasing",
		href: "#",
		description:
			"When everything's set according to you, click on the 'Rewrite' button. Our proprietary AI will paraphrase the text according to your requirements",
		imageUrl: Step2,
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		category: { title: "Marketing", href: "#" },
		author: {
			name: "Michael Foster",
			role: "Co-Founder / CTO",
			href: "#",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	{
		id: 3,
		title: "Step 3: Output",
		href: "#",
		description:
			"When it’s done and you get the output, you can either download it or copy the final text and paste it into your desired location.",
		imageUrl: Step3,
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		category: { title: "Marketing", href: "#" },
		author: {
			name: "Michael Foster",
			role: "Co-Founder / CTO",
			href: "#",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	// More posts...
];

export default function Example() {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-4xl">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						How to use
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						Follow these three easy steps in order to generate
						fantastic content in just a few seconds:
					</p>
					<div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
						{posts.map((post) => (
							<article
								key={post.id}
								className="relative isolate flex flex-col gap-8 lg:flex-row"
							>
								<div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
									<img
										src={post.imageUrl}
										alt=""
										className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
									/>
									<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
								</div>
								<div>
									<div className="group relative max-w-xl">
										<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
											<a href={post.href}>
												<span className="absolute inset-0" />
												{post.title}
											</a>
										</h3>
										<p className="mt-5 text-md leading-6 text-gray-600">
											{post.description}
										</p>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
