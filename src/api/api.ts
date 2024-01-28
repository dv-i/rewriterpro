import routes from "./routes";

const api = {
	openAI: {
		getResponseToAPrompt: async (prompt: any, promptOptions: any) => {
			// Placeholder implementation for OpenAI route
			// Customize this function based on your OpenAI API integration
			const response = await fetch(routes.openAI.getResponseToAPrompt, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt, promptOptions }),
			});
			if (!response.ok) {
				throw new Error("Could not get response to a prompt");
			}
			return response.json();
		},
	},
};

export default api;
