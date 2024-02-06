export interface User {
	fullName: string;
	email: string;
	passwordHash?: string;
	pro?: boolean;
	authType?: string;
	passwordResetCode?: string;
	subscriptionPeriodEndDateEpochSeconds?: number;
	_id?: string;
	totalCost?: number;
}

export interface PromptOptions {
	fluency?: string;
	tone?: string;
	audience?: string;
	emotion?: string;
	length?: string;
	language?: string;
}

export interface QuestionAndResponse {
	userId?: string;
	question: string;
	response: string;
	date: Date;
}

export type SideBarMode =
	| "login"
	| "signup"
	| "forgot-password"
	| "history"
	| "statistics"
	| undefined;
