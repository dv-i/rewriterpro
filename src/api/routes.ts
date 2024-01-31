import { BASE_API_URL } from "../constants";

const routes = {
	ai: {
		getResponseToAPrompt: `${BASE_API_URL}/api/getResponseToAPrompt`,
		getAiDetectionScore: `${BASE_API_URL}/api/getAiDetectionScore`,
	},
};

export default routes;
