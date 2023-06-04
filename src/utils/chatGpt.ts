import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from "chatgpt";

//https://platform.openai.com/docs/api-reference/completions/create
//https://platform.openai.com/docs/models/continuous-model-upgrades
const enum MODELS {
	GPT_4 = "gpt-4",
	GPT_3_5_TURBO = "gpt-3.5-turbo",
}
export const getResponseToAPrompt = async (
	prompt: string
): Promise<string | undefined> => {
	const completionParams = {
		model: MODELS.GPT_4,
	};
	if (process.env.NODE_ENV === "development") {
		const api = new ChatGPTUnofficialProxyAPI({
			accessToken: process.env.REACT_APP_CHAT_GPT_ACCESS_TOKEN || "",
			apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation",
			debug: true,
			model: MODELS.GPT_4,
		});

		try {
			const res = await api.sendMessage(promptFormatter(prompt));
			return res.text;
		} catch (error) {
			console.error(error);
		}
	} else {
		const api = new ChatGPTAPI({
			apiKey: process.env.REACT_APP_OPEN_AI_API_KEY || "",
			debug: true,
			completionParams,
		});

		try {
			const res = await api.sendMessage(promptFormatter(prompt));
			return res.text;
		} catch (error) {
			console.error(error);
		}
	}
};

const promptFormatter = (prompt: string): string => {
	//TODO - proper prompt to be created in this function
	//e.g tones, audience, length etc.
	return `Rewrite this text for me - ${prompt}`;
};
