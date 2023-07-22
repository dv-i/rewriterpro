import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";
import { PromptOptions } from "../store/dataInterfaces";

//https://platform.openai.com/docs/api-reference/completions/create
//https://platform.openai.com/docs/models/continuous-model-upgrades
const enum MODELS {
	GPT_4 = "gpt-4",
	GPT_3_5_TURBO = "gpt-3.5-turbo",
}

interface GetResponseToAPromptArgs {
	prompt: string;
	promptOptions: PromptOptions;
}
export const getResponseToAPrompt = async ({
	prompt,
	promptOptions,
}: GetResponseToAPromptArgs): Promise<string | undefined> => {
	const api = new ChatGPTAPI({
		apiKey: process.env.REACT_APP_OPEN_AI_API_KEY || "",
	});

	try {
		const res = await api.sendMessage(
			promptFormatter({ prompt, promptOptions })
		);
		return res.text;
	} catch (error) {
		console.error(error);
	}
	// const api = new ChatGPTUnofficialProxyAPI({
	// 	accessToken: process.env.REACT_APP_CHAT_GPT_ACCESS_TOKEN || "",
	// 	apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation",
	// 	// debug: true,
	// 	model: MODELS.GPT_4,
	// });

	// try {
	// 	const res = await api.sendMessage(
	// 		promptFormatter({ prompt, promptOptions })
	// 	);
	// 	return res.text;
	// } catch (error) {
	// 	console.error(error);
	// }
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
