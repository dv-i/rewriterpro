import { User } from "./dataInterfaces";

export const setAuthenticateduser = (user: User): void => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthenticatedUser = (): User | null => {
	if (localStorage.getItem("user") !== null) {
		return JSON.parse(localStorage.getItem("user") || "");
	}
	return null;
};

export const clear = (): void => {
	localStorage.clear();
};

export const setMongoAccessToken = (token: string): void => {
	localStorage.setItem("mongoAccessToken", token);
};

export const getMongoAccessToken = (): string | null => {
	return localStorage.getItem("mongoAccessToken");
};
