import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import StripeUtil from "./utils/StripeUtil";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAuthenticatedUser } from "./store/browser";
import Stripe from "stripe";

interface PremiumPricingInfoModalProps {
	isGetPremiumModalOpen: boolean;
	setIsGetPremiumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PricingTier {
	name: string;
	id: string;
	price: {
		monthly: string;
		annually?: string;
	};
	description: string;
	features: string[];
	checkoutUrl: string | null;
}

export const PremiumPricingInfoModal = ({
	isGetPremiumModalOpen,
	setIsGetPremiumModalOpen,
}: PremiumPricingInfoModalProps) => {
	const [tiers, setTiers] = useState<PricingTier[]>([]);
	const stripe = new StripeUtil(
		process.env.REACT_APP_STRIPE_SECRET_KEY || ""
	);

	const getCurrencySymbol = (currencyShortName: string | null): string => {
		if (currencyShortName === "usd") return "$";
		return "";
	};

	const getPrice = (
		checkoutSession: Stripe.Response<Stripe.Checkout.Session> | null
	): string => {
		return checkoutSession?.amount_total
			? (checkoutSession?.amount_total / 100).toString()
			: "";
	};

	const getMonthlyPriceForYearlyPlan = (
		checkoutSession: Stripe.Response<Stripe.Checkout.Session> | null
	) => {
		return checkoutSession?.amount_total
			? Math.trunc((checkoutSession.amount_total / 100 / 12) * 100) / 100
			: "";
	};

	const populatePricingTiers = async () => {
		try {
			const products = await stripe.getAllProducts();

			if (products.length > 0) {
				const productId = products[0].id;
				const prices = await stripe.getAllPrices(productId);

				const authedUser = getAuthenticatedUser();
				if (authedUser) {
					//Stripe doesn't support creating one checkout session with different billing intervals hence we need 2 separate calls
					const checkoutSessionMonthly =
						await stripe.createCheckoutSession(
							[
								{
									price: prices.find(
										(price) =>
											price.recurring?.interval ===
											"month"
									)?.id,
									quantity: 1,
								},
							],
							authedUser?.email
						);
					const checkoutSessionYearly =
						await stripe.createCheckoutSession(
							[
								{
									price: prices.find(
										(price) =>
											price.recurring?.interval === "year"
									)?.id,
									quantity: 1,
								},
							],
							authedUser?.email
						);
					setTiers([
						{
							name: "Monthly",
							id: "tier-monthly",
							price: {
								monthly: `${getCurrencySymbol(
									checkoutSessionMonthly.currency
								)}${getPrice(checkoutSessionMonthly)}`,
							},
							description: "Everything necessary to get started.",
							features: [
								"Unlimited paraphrases per day",
								"Extra fluency options",
								"Extra tone options",
								"Extra audience options",
								"Extra emotion options",
								"Extra length options",
								"Extra language options (Spanish, French & German)",
							],
							checkoutUrl: checkoutSessionMonthly.url,
						},
						{
							name: "Yearly",
							id: "tier-yearly",
							price: {
								monthly: `${getCurrencySymbol(
									checkoutSessionYearly.currency
								)}${getMonthlyPriceForYearlyPlan(
									checkoutSessionYearly
								)}`,
								annually: `${getCurrencySymbol(
									checkoutSessionYearly.currency
								)}${getPrice(checkoutSessionYearly)}`,
							},
							description:
								"Everything in Basic, plus essential tools for growing your business.",
							features: [
								"Save $60 on a yearly subscription",
								"Unlimited paraphrases per day",
								"Extra fluency options",
								"Extra tone options",
								"Extra audience options",
								"Extra emotion options",
								"Extra length options",
								"Extra language options (Spanish, French & German)",
							],
							checkoutUrl: checkoutSessionYearly.url,
						},
					]);
				}
			}
		} catch (error) {
			console.error("Error fetching products and prices:", error);
		}
	};
	useEffect(() => {
		populatePricingTiers();
	}, []);
	return (
		<Transition.Root show={isGetPremiumModalOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={setIsGetPremiumModalOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-xs sm:max-w-6xl sm:p-6">
								<div className="bg-white py-12 sm:py-16">
									<XMarkIcon
										onClick={() => {
											setIsGetPremiumModalOpen(false);
										}}
										height={40}
										width={40}
										className="absolute right-5 top-5 cursor-pointer"
									/>
									<div className="mx-auto max-w-7xl px-6 lg:px-8">
										<div className="mx-auto max-w-4xl sm:text-center">
											<h2 className="text-base font-semibold leading-7 text-indigo-600">
												Pricing
											</h2>
											<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
												Choose the right plan
												for&nbsp;you
											</p>
										</div>
										<div className="mt-20 flow-root">
											<div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-2 lg:divide-x lg:divide-y-0 xl:-mx-4">
												{tiers.length > 0 &&
													tiers.map(
														(tier: PricingTier) => (
															<div
																key={tier.id}
																className="pt-8 lg:px-8 lg:pt-0 xl:px-14"
															>
																<h3
																	id={tier.id}
																	className="text-base font-semibold leading-7 text-gray-900"
																>
																	{tier.name}
																</h3>
																<p className="mt-6 flex items-baseline gap-x-1">
																	<span className="text-5xl font-bold tracking-tight text-gray-900">
																		{
																			tier
																				.price
																				.monthly
																		}
																	</span>
																	<span className="text-md font-semibold leading-6 text-gray-600">
																		/month
																	</span>
																</p>
																<p className="mt-3 text-md leading-6 text-gray-500">
																	{
																		tier
																			.price
																			.annually
																	}{" "}
																	{tier.id ===
																	"tier-yearly"
																		? "billed every 12 months"
																		: "billed every month"}
																</p>
																<a
																	href={
																		tier.checkoutUrl ||
																		"#"
																	}
																	aria-describedby={
																		tier.id
																	}
																	className="mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
																>
																	Buy plan
																</a>
																{/* <p className="mt-10 text-md font-semibold leading-6 text-gray-900">
															{tier.description}
														</p> */}
																<ul
																	role="list"
																	className="mt-6 space-y-3 text-md leading-6 text-gray-600"
																>
																	{tier.features.map(
																		(
																			feature: string
																		) => (
																			<li
																				key={
																					feature
																				}
																				className="flex gap-x-3"
																			>
																				<CheckCircleIcon
																					className="h-6 w-5 flex-none text-indigo-600"
																					aria-hidden="true"
																				/>
																				{
																					feature
																				}
																			</li>
																		)
																	)}
																</ul>
															</div>
														)
													)}
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
