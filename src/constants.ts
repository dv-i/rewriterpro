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

export const BASE_API_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:5001"
		: "http://165.232.181.198";

// export const BASE_API_URL = "http://165.232.181.198";
