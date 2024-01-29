import { AI_DETECTOR_API_URL, HUMANIZE_PROMPT } from "../constants";
import { PromptOptions } from "../store/dataInterfaces";

interface GetResponseToAPromptArgs {
	prompt: string;
	promptOptions: PromptOptions;
	isHumanizeEnabled: boolean;
}
export const getResponseToAPrompt = async ({
	prompt,
	promptOptions,
	isHumanizeEnabled,
}: GetResponseToAPromptArgs): Promise<string | undefined> => {
	const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY || "";
	const apiUrl = "https://api.openai.com/v1/chat/completions";

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${apiKey}`,
	};

	const requestData = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: promptFormatter({
					prompt,
					promptOptions,
					isHumanizeEnabled,
				}),
			},
		],
		temperature: 0.7,
	};

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(requestData),
		});

		if (!response.ok) {
			throw new Error("API request failed");
		}

		const data = await response.json();
		return data.choices[0].message.content as string;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

const promptFormatter = ({
	prompt,
	promptOptions,
	isHumanizeEnabled,
}: GetResponseToAPromptArgs): string => {
	const { fluency, audience, tone, emotion, length, language } =
		promptOptions;
	let formattedPrompt = isHumanizeEnabled
		? HUMANIZE_PROMPT
		: "Please rewrite the following text for me";
	formattedPrompt += fluency ? ` with ${fluency.toLowerCase()} fluency,` : "";
	formattedPrompt += tone ? ` in a ${tone.toLowerCase()} tone,` : "";
	formattedPrompt += audience
		? ` for a ${audience.toLowerCase()} audience,`
		: "";
	formattedPrompt += emotion
		? ` with ${emotion.toLowerCase()} emotions,`
		: "";
	formattedPrompt += length ? ` and ${length.toLowerCase()} in length,` : "";
	formattedPrompt += language
		? ` and also translate to ${language.toLowerCase()} and only return the translated text without the original text and without quotes\n`
		: "";

	formattedPrompt += ` - ${prompt}`;

	return formattedPrompt;
};

export const getAIDetectionScore = async (
	text: string
): Promise<string | undefined> => {
	const apiKey = process.env.REACT_APP_AI_DETECTOR_SECRET || "";

	const headers = {
		"Content-Type": "application/json",
	};

	const requestData = {
		content: text,
		user_secret: apiKey,
	};

	try {
		const response = await fetch(AI_DETECTOR_API_URL, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(requestData),
		});
		console.log("detection response");
		console.log(response);

		if (!response.ok) {
			throw new Error("API request failed");
		}

		const data = await response.json();
		console.log(data);
		if (data.length === 0) {
			return;
		}
		return `${Math.ceil(data[0][0]["AI"] * 100)}`;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
