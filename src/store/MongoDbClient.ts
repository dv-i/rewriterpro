import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DATABASE } from "../constants";
import { User } from "./dataInterfaces";

class MongoDbClient {
	private client: AxiosInstance;
	constructor() {
		this.client = axios.create({
			baseURL: DATABASE.URL,
			headers: {
				"Content-Type": "application/json",
				"api-key": `${process.env.REACT_APP_ATLAS_DATA_API_KEY}`,
			},
		});
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
			const response = await this.client.post("/action/findOne", body);
			return response.data.document;
		} catch (error) {
			console.error(
				`Failed to findOne from ${DATABASE.NAME} - ${collection}`,
				error
			);
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
			const response = await this.client.post("/action/find", body);
			return response.data.documents;
		} catch (error) {
			console.error(
				`Failed to findOne from ${DATABASE.NAME} - ${collection}`,
				error
			);
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
			const response = await this.client.post("/action/insertOne", body);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
		return null;
	}
}

export default MongoDbClient;
