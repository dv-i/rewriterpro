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
}

export default StripeUtil;
