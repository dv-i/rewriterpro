import routes from "./routes";

const api = {
	ai: {
		getResponseToAPrompt: async (
			prompt: string,
			promptOptions: any,
			isHumanizeEnabled: boolean
		) => {
			const response = await fetch(routes.ai.getResponseToAPrompt, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt,
					promptOptions,
					isHumanizeEnabled,
				}),
			});
			if (!response.ok) {
				throw new Error("Could not get response to a prompt");
			}
			return response.json();
		},
		getDetectionScore: async (text: string) => {
			// Placeholder implementation for OpenAI route
			// Customize this function based on your OpenAI API integration
			const response = await fetch(routes.ai.getAiDetectionScore, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text }),
			});
			if (!response.ok) {
				throw new Error("Could not get AI detection score");
			}
			return response.json();
		},
	},
};

export default api;
