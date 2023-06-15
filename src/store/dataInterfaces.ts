export interface User {
	fullName: string;
	email: string;
	passwordHash?: string;
	pro?: boolean;
}

export interface PromptOptions {
	fluency?: string;
	tone?: string;
	audience?: string;
	emotion?: string;
	length?: string;
	language?: string;
}
