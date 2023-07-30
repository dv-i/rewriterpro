export const DATABASE = {
	DATA_SOURCE: "Cluster0",
	URL: "https://data.mongodb-api.com/app/data-nevnj/endpoint/data/v1",
	NAME: "rewriterpro",
	AUTH_URL:
		"https://realm.mongodb.com/api/client/v2.0/app/data-nevnj/auth/providers/api-key/login",
};

export const FEATURE_FLAGS = {
	DEV_TOGGLE_SWITCH: false,
};

export const BASE_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:3000"
		: "https://rewriterpro.ai/";
