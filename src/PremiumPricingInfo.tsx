import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import StripeUtil from "./utils/StripeUtil";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAuthenticatedUser } from "./store/browser";

interface PremiumPricingInfoModalProps {
	isGetPremiumModalOpen: boolean;
	setIsGetPremiumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<
			"login" | "signup" | "forgot-password" | "history" | undefined
		>
	>;
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
	setSideBarMode,
}: PremiumPricingInfoModalProps) => {
	const [tiers, setTiers] = useState<PricingTier[]>([]);
	const stripe = new StripeUtil(
		process.env.REACT_APP_STRIPE_SECRET_KEY_PROD || ""
	);

	const getCurrencySymbol = (currencyShortName: string | null): string => {
		if (currencyShortName === "usd") return "$";
		return "";
	};

	const getPrice = (amount: number | null): string => {
		return amount ? (amount / 100).toString() : "";
	};

	const getMonthlyPriceForYearlyPlan = (amount: number | null) => {
		return amount ? Math.trunc((amount / 100 / 12) * 100) / 100 : "";
	};

	useEffect(() => {
		if (isGetPremiumModalOpen) {
			populatePricingTiers();
		}
	}, [isGetPremiumModalOpen]);

	const populatePricingTiers = async () => {
		try {
			const products = await stripe.getAllProducts();

			if (products.length > 0) {
				// const productId = products[0].id;
				const productId = products.find(
					(prod) => prod.id === process.env.REACT_APP_PRODUCT_ID
				)?.id;
				if (productId) {
					const prices = await stripe.getAllPrices(productId);

					const monthlyPrice = prices.find(
						(price) => price.recurring?.interval === "month"
					);

					const yearlyPrice = prices.find(
						(price) => price.recurring?.interval === "year"
					);

					const authedUser = getAuthenticatedUser();
					if (authedUser) {
						//Stripe doesn't support creating one checkout session with different billing intervals hence we need 2 separate calls
						const checkoutSessionMonthly =
							await stripe.createCheckoutSession(
								[
									{
										price: monthlyPrice?.id,
										quantity: 1,
									},
								],
								authedUser?.email
							);
						const checkoutSessionYearly =
							await stripe.createCheckoutSession(
								[
									{
										price: yearlyPrice?.id,
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
									)}${getPrice(
										checkoutSessionMonthly.amount_total
									)}`,
								},
								description:
									"Everything necessary to get started.",
								features: [
									"Unlimited rewrites per day",
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
										checkoutSessionYearly.amount_total
									)}`,
									annually: `${getCurrencySymbol(
										checkoutSessionYearly.currency
									)}${getPrice(
										checkoutSessionYearly.amount_total
									)}`,
								},
								description:
									"Everything in Basic, plus essential tools for growing your business.",
								features: [
									"Save $60 on a yearly subscription",
									"Unlimited rewrites per day",
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
					} else {
						setTiers([
							{
								name: "Monthly",
								id: "tier-monthly",
								price: {
									monthly: `${getCurrencySymbol(
										monthlyPrice?.currency || ""
									)}${getPrice(
										monthlyPrice?.unit_amount || null
									)}`,
								},
								description:
									"Everything necessary to get started.",
								features: [
									"Unlimited rewrites per day",
									"Extra fluency options",
									"Extra tone options",
									"Extra audience options",
									"Extra emotion options",
									"Extra length options",
									"Extra language options (Spanish, French & German)",
								],
								checkoutUrl: "",
							},
							{
								name: "Yearly",
								id: "tier-yearly",
								price: {
									monthly: `${getCurrencySymbol(
										yearlyPrice?.currency || ""
									)}${getMonthlyPriceForYearlyPlan(
										yearlyPrice?.unit_amount || null
									)}`,
									annually: `${getCurrencySymbol(
										yearlyPrice?.currency || ""
									)}${getPrice(
										yearlyPrice?.unit_amount || null
									)}`,
								},
								description:
									"Everything in Basic, plus essential tools for growing your business.",
								features: [
									"Save $60 on a yearly subscription",
									"Unlimited rewrites per day",
									"Extra fluency options",
									"Extra tone options",
									"Extra audience options",
									"Extra emotion options",
									"Extra length options",
									"Extra language options (Spanish, French & German)",
								],
								checkoutUrl: "",
							},
						]);
					}
				}
			}
		} catch (error) {
			console.error("Error fetching products and prices:", error);
		}
	};
	useEffect(() => {
		populatePricingTiers();
	}, []);

	const getTiers = (isUserAuthed: boolean) => {
		return (
			tiers.length > 0 &&
			tiers.map((tier: PricingTier) => (
				<div
					key={tier.id}
					className="py-4 px-4 lg:px-8 xl:px-14 shadow-lg relative"
				>
					{tier.id === "tier-yearly" && (
						<div className="absolute rounded-md top-0 right-0 mt-4 p-2 mr-4 bg-orange-600 text-xs lg:text-base text-white">
							Recommended
						</div>
					)}

					<h3
						id={tier.id}
						className="text-base font-semibold leading-7 text-gray-900"
					>
						{tier.name}
					</h3>
					<p className="mt-6 flex items-baseline gap-x-1">
						<span className="text-5xl font-bold tracking-tight text-gray-900">
							{tier.price.monthly}
						</span>
						<span className="text-md font-semibold leading-6 text-gray-600">
							/month
						</span>
					</p>
					<p className="mt-3 text-md leading-6 text-gray-500">
						{tier.price.annually}{" "}
						{tier.id === "tier-yearly"
							? "billed every 12 months"
							: "billed every month"}
					</p>
					{isUserAuthed ? (
						<a
							href={tier.checkoutUrl || "#"}
							aria-describedby={tier.id}
							className="mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Buy plan
						</a>
					) : (
						<button
							onClick={() => {
								setIsGetPremiumModalOpen(false);
								setSideBarMode("login");
							}}
							aria-describedby={tier.id}
							className="w-full mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Get Started
						</button>
					)}

					<ul
						role="list"
						className="mt-6 space-y-3 text-md leading-6 text-gray-600"
					>
						{tier.features.map((feature: string) => (
							<li key={feature} className="flex gap-x-3">
								<CheckCircleIcon
									className="h-6 w-5 flex-none text-indigo-600"
									aria-hidden="true"
								/>
								{feature}
							</li>
						))}
					</ul>
				</div>
			))
		);
	};
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
									<div className="mx-auto max-w-7xl lg:px-8">
										<div className="mx-auto max-w-4xl sm:text-center">
											<p className="mt-2 lg:text-5xl text-2xl font-bold tracking-tight text-gray-900">
												Choose the right plan
												for&nbsp;you
											</p>
										</div>
										<div className="mt-20 flow-root">
											<div className="gap-8 isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-2 lg:divide-x lg:divide-y-0 xl:-mx-4">
												{getAuthenticatedUser()
													? getTiers(true)
													: getTiers(false)}
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
