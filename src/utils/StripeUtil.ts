import Stripe from "stripe";

class StripeUtil {
	private stripe: Stripe;

	constructor(apiKey: string) {
		this.stripe = new Stripe(apiKey, {
			apiVersion: "2022-11-15",
		});
	}

	async getAllPlans(): Promise<Stripe.Plan[]> {
		try {
			const plans = await this.stripe.plans.list({ limit: 100 }); // Fetching plans with a limit of 100, you can adjust it as needed
			return plans.data;
		} catch (error) {
			console.error("Error fetching plans:", error);
			throw error;
		}
	}
	async getAllSubscriptions(): Promise<Stripe.Subscription[]> {
		try {
			const subscriptions = await this.stripe.subscriptions.list({
				limit: 100,
			});
			return subscriptions.data;
		} catch (error) {
			console.error("Error fetching subscriptions:", error);
			throw error;
		}
	}

	async getAllProducts(): Promise<Stripe.Product[]> {
		try {
			const products = await this.stripe.products.list({ limit: 100 });
			return products.data;
		} catch (error) {
			console.error("Error fetching products:", error);
			throw error;
		}
	}

	async getAllPrices(productId: string): Promise<Stripe.Price[]> {
		try {
			const prices = await this.stripe.prices.list({
				product: productId,
			});
			return prices.data;
		} catch (error) {
			console.error(`Error fetching prices for ${productId}`);
			throw error;
		}
	}

	async createCheckoutSession(
		lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
		customerEmail: string
	): Promise<Stripe.Response<Stripe.Checkout.Session>> {
		try {
			const session = await this.stripe.checkout.sessions.create({
				line_items: [...lineItems],
				mode: "subscription",
				customer_email: customerEmail,
				success_url:
					process.env.REACT_APP_ENV === "development"
						? "http://localhost:3000/"
						: "https://main--effortless-kitten-a7f8ef.netlify.app/",
				cancel_url:
					process.env.REACT_APP_ENV === "development"
						? "http://localhost:3000/"
						: "https://main--effortless-kitten-a7f8ef.netlify.app/",
			});
			return session;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	async getCheckoutSession(
		id: string
	): Promise<Stripe.Response<Stripe.Checkout.Session>> {
		try {
			const checkoutSession =
				await this.stripe.checkout.sessions.retrieve(id);
			return checkoutSession;
		} catch (error) {
			console.error(`Could not retrieve checkout session - ${id}`);
			throw error;
		}
	}

	async cancelSubscription(
		subscriptionId: string
	): Promise<Stripe.Subscription> {
		try {
			const subscription = await this.stripe.subscriptions.cancel(
				subscriptionId
			);
			return subscription;
		} catch (error) {
			console.error(
				`Error canceling subscription - ${subscriptionId}`,
				error
			);
			throw error;
		}
	}
}

export default StripeUtil;
