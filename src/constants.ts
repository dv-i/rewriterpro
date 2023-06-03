export const DATABASE = {
	DATA_SOURCE: "Cluster0",
	URL:
		process.env.NODE_ENV === "development"
			? "http://localhost:8080/https://us-east-2.aws.data.mongodb-api.com/app/data-nevnj/endpoint/data/v1"
			: "https://us-east-2.aws.data.mongodb-api.com/app/data-nevnj/endpoint/data/v1",
	NAME: "rewriterpro",
};
