import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const navigation = {
	main: [
		{ name: "About", href: "/about" },
		{ name: "Privacy", href: "/privacy" },
		{ name: "Contact Us", href: "/contact" },
		{ name: "Terms of Service", href: "/terms" },
	],
};

export default function Footer() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const openModal = (content: string) => {
		setModalContent(content);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalContent("");
	};

	return (
		<footer className="bg-white">
			<div className="mx-auto max-w-7xl overflow-hidden px-3 py-10">
				<nav
					className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
					aria-label="Footer"
				>
					{navigation.main.map((item) => (
						<div key={item.name} className="pb-6">
							{/* <button
								onClick={() => openModal(item.name)}
								className="text-sm leading-6 text-gray-600 hover:text-gray-900 cursor-pointer"
							>
								{item.name}
							</button> */}
							<NavLink
								to={`${item.href}`}
								className="text-sm leading-6 text-gray-600 hover:text-gray-900 cursor-pointer"
							>
								{item.name}
							</NavLink>
						</div>
					))}
				</nav>
				<p className="mt-10 text-center text-xs leading-5 text-gray-500">
					&copy; 2023 RewriterPro.ai, Inc. All rights reserved.
				</p>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded-lg w-2/3">
						<h2 className="text-xl font-semibold mb-4">
							{modalContent}
						</h2>
						<div className="overflow-y-auto max-h-full">
							<p className="text-gray-600 mb-4">
								{modalContent === "About" && (
									<span>
										{`Welcome to our About page. We are an
									AI-based rewriter platform dedicated to
									transforming and enhancing written content
									using the power of artificial intelligence.
									Our team of experts and cutting-edge
									technology work together to provide you with
									a seamless experience in rewriting text
									while maintaining clarity and originality.
									Whether you're a student, a professional, or
									anyone looking to improve their content, our
									AI rewriter is here to assist you in
									creating impactful and unique text.`}
									</span>
								)}
								{modalContent === "Privacy & Terms" && (
									<span>
										Your privacy is important to us. This
										Privacy Policy outlines how we collect,
										use, and safeguard your data when you
										use our services. We may collect
										information such as your name, email
										address, and usage data to improve our
										services and provide a personalized
										experience. By using our website, you
										agree to comply with our Terms of
										Service and understand that we may use
										cookies and similar technologies to
										enhance your browsing experience.
									</span>
								)}
								{modalContent === "Contact Us" && (
									<span>
										{`Feel free to contact us with any inquiries
									or feedback. You can reach out to our
									customer support team at
									support@rewriterpro.ai or use the contact
									form on our website. We value your input and
									are committed to providing you with the best
									possible experience. Don't hesitate to get
									in touch with us if you have any questions
									or suggestions.`}
									</span>
								)}
							</p>
							<button
								onClick={closeModal}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</footer>
	);
}
