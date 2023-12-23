import React, { useEffect, useState } from "react";
import {
	BuildingOffice2Icon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";
import ToastNotification, { ToastProps } from "../ToastNotification";

interface ContactProps {
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	toast: ToastProps | undefined;
}

export default function Contact({ setToast, toast }: ContactProps) {
	const [fullname, setFullName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [subject, setSubject] = useState<string>();
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		document.title =
			"Reword Generator: Rewrite Sentence with AI - RewriterPro";
	}, []);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email && fullname && subject && message) {
			const templateParams = {
				userFullName: fullname,
				email: email,
				subject: subject,
				message: message,
			};
			emailjs
				.send(
					process.env.REACT_APP_APP_EMAILJS_SERVICE_ID || "",
					process.env
						.REACT_APP_APP_EMAILJS_TEMPLATE_ID_CONTACT_FORM || "",
					templateParams,
					process.env.REACT_APP_APP_EMAILJS_API_KEY || ""
				)
				.then(
					function () {
						//SUCCESS
						setToast({
							visible: true,
							title: "Success",
							content:
								"Sent message successfully. We will get back to you shortly",
							type: "success",
						});
						setEmail("");
						setFullName("");
						setSubject("");
						setMessage("");
					},
					function () {
						//ERROR
						setToast({
							visible: true,
							title: "Error",
							content: "Could not send message",
							type: "error",
						});
					}
				);
		} else {
			console.log("missing field");
			setToast({
				visible: true,
				title: "Error",
				content: "Required field missing",
				type: "error",
			});
		}
	};
	return (
		<div className="relative isolate bg-white">
			<ToastNotification toast={toast} setToast={setToast} />
			<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
				<div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
					<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
						<div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
							<svg
								className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
										width={200}
										height={200}
										x="100%"
										y={-1}
										patternUnits="userSpaceOnUse"
									>
										<path
											d="M130 200V.5M.5 .5H200"
											fill="none"
										/>
									</pattern>
								</defs>
								<rect
									width="100%"
									height="100%"
									strokeWidth={0}
									fill="white"
								/>
								<svg
									x="100%"
									y={-1}
									className="overflow-visible fill-gray-50"
								>
									<path
										d="M-470.5 0h201v201h-201Z"
										strokeWidth={0}
									/>
								</svg>
								<rect
									width="100%"
									height="100%"
									strokeWidth={0}
									fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
								/>
							</svg>
						</div>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900">
							Contact RewriterPro.Ai
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							{`Feel free to get in touch with us at RewriterPro.Ai
							for any inquiries, suggestions, or assistance. We
							value your feedback and are here to provide the
							support you need. Whether you have questions about
							our AI-powered rewriting tool, need help with using
							the platform, or want to explore partnership
							opportunities, we're just an email away.`}
						</p>
						<dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Address</span>
									<BuildingOffice2Icon
										className="h-7 w-6 text-gray-400"
										aria-hidden="true"
									/>
								</dt>
								<dd>
									International House, 12 Constance Street,
									<br />
									London, E16 2DQ
								</dd>
							</div>
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Telephone</span>
									<PhoneIcon
										className="h-7 w-6 text-gray-400"
										aria-hidden="true"
									/>
								</dt>
								<dd>
									<a
										className="hover:text-gray-900"
										href="tel:+4473 61622097"
									>
										+4473 61622097
									</a>
								</dd>
							</div>
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Email</span>
									<EnvelopeIcon
										className="h-7 w-6 text-gray-400"
										aria-hidden="true"
									/>
								</dt>
								<dd>
									<a
										className="hover:text-gray-900"
										href="mailto:support@rewriterpro.ai"
									>
										support@rewriterpro.ai
									</a>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<form
					onSubmit={(e) => handleFormSubmit(e)}
					className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
				>
					<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div className="sm:col-span-2">
								<label
									htmlFor="first-name"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Full Name
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="first-name"
										id="first-name"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={(e) =>
											setFullName(e.target.value)
										}
										required
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="email"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Email
								</label>
								<div className="mt-2.5">
									<input
										type="email"
										name="email"
										id="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="subject"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Subject
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="subject"
										id="subject"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={(e) =>
											setSubject(e.target.value)
										}
										required
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="message"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Message
								</label>
								<div className="mt-2.5">
									<textarea
										name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										defaultValue={""}
										required
										onChange={(e) =>
											setMessage(e.target.value)
										}
									/>
								</div>
							</div>
						</div>
						<div className="mt-8 flex justify-end">
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Send message
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
