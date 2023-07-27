import { PromptOptions } from "../store/dataInterfaces";

interface GetResponseToAPromptArgs {
	prompt: string;
	promptOptions: PromptOptions;
}
export const getResponseToAPrompt = async ({
	prompt,
	promptOptions,
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
				content: promptFormatter({ prompt, promptOptions }),
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
}: GetResponseToAPromptArgs): string => {
	//TODO - proper prompt to be created in this function
	//e.g tones, audience, length etc.
	const { fluency, audience, tone, emotion, length, language } =
		promptOptions;
	let formattedPrompt = "Rewrite the following text for me";
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
