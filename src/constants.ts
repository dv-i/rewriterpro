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

export const HUMANIZE_PROMPT = `Please rewrite the following text with varying sentence lengths and simple vocabulary. The sentences should be concise, with a low number of syllables, and maintain a human-like tone to avoid detection by AI detectors
`;

export const AI_DETECTOR_API_URL = "https://detector.essaycheck.ai/detect/";

//Add static backend IP/domain name here
