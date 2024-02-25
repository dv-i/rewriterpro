export const DATABASE = {
	DATA_SOURCE: "Cluster0",
	URL: "https://data.mongodb-api.com/app/data-ktijc/endpoint/data/v1",
	NAME: "rewriterpro",
	AUTH_URL:
		"https://realm.mongodb.com/api/client/v2.0/app/data-ktijc/auth/providers/api-key/login",
};

export const FEATURE_FLAGS = {
	DEV_TOGGLE_SWITCH: false,
};

export const BASE_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:3000"
		: "https://rewriterpro.ai/";

export const HUMANIZE_PROMPT = `Rewrite this and Add Human Creativity and Originality,Understanding Context and Nuance,Emotional Intelligence and Empathy,Critical Thinking and Reasoning, Personal Style and Voice: Humans possess unique styles and voices that come through in their writing. This makes their work more engaging and memorable for readers. human also made grammer mistake.
`;

export const AI_DETECTOR_API_URL = "https://detector.essaycheck.ai/detect/";

export const BASE_API_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:5001"
		: "https://rewriterpro-backend.azurewebsites.net";
export const PER_TOKEN_PRICE_INPUT = 0.0000005;
export const PER_TOKEN_PRICE_OUTPUT = 0.0000015;
