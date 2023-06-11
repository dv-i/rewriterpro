export interface User {
	firstName: string;
	lastName: string;
	email: string;
	passwordHash?: string;
	password: string;
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
