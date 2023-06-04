export const DATABASE = {
	DATA_SOURCE: "Cluster0",
	URL:
		process.env.NODE_ENV === "development"
			? "http://localhost:8080/https://us-east-2.aws.data.mongodb-api.com/app/data-nevnj/endpoint/data/v1"
			: "https://us-east-2.aws.data.mongodb-api.com/app/data-nevnj/endpoint/data/v1",
	NAME: "rewriterpro",
};

export const FEATURE_FLAGS = {
	PARAPHRASE_LIMIT_BANNER: false,
	DEV_TOGGLE_SWITCH: false,
	PREMIUM_MODE: false,
};
