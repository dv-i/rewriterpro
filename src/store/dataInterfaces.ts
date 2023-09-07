export interface User {
	fullName: string;
	email: string;
	passwordHash?: string;
	pro?: boolean;
	authType?: string;
	passwordResetCode?: string;
	subscriptionPeriodEndDateEpochSeconds?: number;
}

export interface PromptOptions {
	fluency?: string;
	tone?: string;
	audience?: string;
	emotion?: string;
	length?: string;
	language?: string;
}
