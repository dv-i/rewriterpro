import { QuestionAndResponse, User } from "./dataInterfaces";

export const setAuthenticatedUser = (user: User): void => {
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

export const setLocalCounter = (value: number): void => {
	localStorage.setItem("counter", value.toString());
	localStorage.setItem("counterDate", new Date().toDateString());
};

export const setQuestionsAndResponses = (
	questionAndResponse: QuestionAndResponse
) => {
	if (localStorage.getItem("questionsAndResponses") !== null) {
		const existingQuestionsAndAnswers = JSON.parse(
			localStorage.getItem("questionsAndResponses") || ""
		);
		existingQuestionsAndAnswers.push(questionAndResponse);
		localStorage.setItem(
			"questionsAndResponses",
			JSON.stringify(existingQuestionsAndAnswers)
		);
	} else {
		localStorage.setItem(
			"questionsAndResponses",
			JSON.stringify([questionAndResponse])
		);
	}
};

export const getQuestionsAndResponses = ():
	| QuestionAndResponse[]
	| undefined => {
	if (localStorage.getItem("questionsAndResponses") !== null) {
		return JSON.parse(
			localStorage.getItem("questionsAndResponses") || ""
		) as QuestionAndResponse[];
	}
	return undefined;
};

export const removeQuestionsAndResponses = (): void => {
	localStorage.removeItem("questionsAndResponses");
};

export const getLocalCounter = (): number | undefined => {
	const prevCounterDateString = localStorage.getItem("counterDate");
	if (localStorage.getItem("counter") !== null) {
		if (prevCounterDateString) {
			const prevCounterDate = new Date(prevCounterDateString);
			const today = new Date();
			const prevCounter = isMoreThanOneDay(today, prevCounterDate)
				? 0
				: Number(localStorage.getItem("counter"));
			return prevCounter;
		}
		return 0;
	}
	return undefined;
};

function isMoreThanOneDay(date1: Date, date2: Date): boolean {
	const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
	const diff = Math.abs(date1.getTime() - date2.getTime()); // Difference in milliseconds

	return diff > oneDay;
}
