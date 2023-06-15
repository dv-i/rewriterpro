import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DATABASE } from "../constants";
import { User } from "./dataInterfaces";
import { getMongoAccessToken, setMongoAccessToken } from "./browser";
import { USERS_COLLECTION } from "./constants";

const getAxiosClient = async (): Promise<AxiosInstance> => {
	if (!getMongoAccessToken()) {
		await refreshMongoAccessToken();
	}
	return axios.create({
		baseURL: DATABASE.URL,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getMongoAccessToken()}`,
		},
	});
};

export const refreshMongoAccessToken = async () => {
	if (!getMongoAccessToken()) {
		const mongoAuthDetails = await axios.post(DATABASE.AUTH_URL, {
			key: process.env.REACT_APP_ATLAS_DATA_API_KEY,
		});
		if (mongoAuthDetails.data.access_token) {
			setMongoAccessToken(mongoAuthDetails.data.access_token);
		}
	}
};

class MongoDbClient {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async handleMongoAccessTokenRefresh(error: any): Promise<void> {
		if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_REQUEST") {
			await refreshMongoAccessToken();
		}
	}

	async findOne(
		collection: string,
		filter: {
			[key: string]: string;
		}
	): Promise<User | null> {
		try {
			const body = {
				dataSource: DATABASE.DATA_SOURCE,
				database: DATABASE.NAME,
				collection: collection,
				filter: filter,
			};
			const axiosClient = await getAxiosClient();
			const response = await axiosClient.post("/action/findOne", body);
			return response.data.document;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(
				`Failed to findOne from ${DATABASE.NAME} - ${collection}`,
				error
			);
			await this.handleMongoAccessTokenRefresh(error);

			throw error;
		}
	}

	async find(
		collection: string,
		filter?: {
			[key: string]: string;
		}
	): Promise<User[] | []> {
		try {
			const body = {
				dataSource: DATABASE.DATA_SOURCE,
				database: DATABASE.NAME,
				collection: collection,
				filter: filter ? filter : null,
			};
			const axiosClient = await getAxiosClient();

			const response = await axiosClient.post("/action/find", body);
			return response.data.documents;
		} catch (error) {
			console.error(
				`Failed to findOne from ${DATABASE.NAME} - ${collection}`,
				error
			);
			await this.handleMongoAccessTokenRefresh(error);
			throw error;
		}
	}

	async insertOne(
		collection: string,
		document: User
	): Promise<AxiosResponse | null> {
		try {
			const body = {
				dataSource: DATABASE.DATA_SOURCE,
				database: DATABASE.NAME,
				collection: collection,
				document: document,
			};
			const userAlreadyExists = await this.findOne("users", {
				email: document.email,
			});
			if (userAlreadyExists) {
				throw new Error("User already exists");
			}
			const axiosClient = await getAxiosClient();
			const response = await axiosClient.post("/action/insertOne", body);
			return response.data;
		} catch (error) {
			console.error(error);
			await this.handleMongoAccessTokenRefresh(error);
		}
		return null;
	}
	async updateOne(
		collection: string,
		filter: { [key: string]: string },
		update: { [key: string]: any }
	): Promise<AxiosResponse | null> {
		try {
			const body = {
				dataSource: DATABASE.DATA_SOURCE,
				database: DATABASE.NAME,
				collection: collection,
				filter: filter,
				update: update,
			};

			const axiosClient = await getAxiosClient();
			const response = await axiosClient.post("/action/updateOne", body);
			return response.data;
		} catch (error) {
			console.error(
				`Failed to updateOne in ${DATABASE.NAME} - ${collection}`,
				error
			);
			await this.handleMongoAccessTokenRefresh(error);
		}
		return null;
	}
}

export default MongoDbClient;
