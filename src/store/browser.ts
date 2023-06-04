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

export const clearAuthenticatedUser = (): void => {
	localStorage.removeItem("user");
};
