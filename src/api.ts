import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
import { User } from "./store/dataInterfaces";
export const login = async (
	email: string,
	password: string
): Promise<User | undefined> => {
	const mongo = new MongoDbClient();
	const user = await mongo.findOne(USERS_COLLECTION, {
		email,
	});
	if (!user) {
		console.error("Unauthorized!");
		return;
	}
	const passwordHash = user.passwordHash;
	const authorized = (await toHash(password)) === passwordHash;
	if (!authorized) {
		console.error("Unauthorized!");
		return;
	}
	return user;
};

export const signUp = async (userToAdd: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	passwordHash?: string;
}): Promise<User | undefined> => {
	const mongo = new MongoDbClient();
	const user = await mongo.findOne(USERS_COLLECTION, {
		email: userToAdd.email,
	});
	if (user) {
		console.error("User already exists");
		return;
	}

	const passwordHash = await toHash(userToAdd.password);
	userToAdd.passwordHash = passwordHash;

	try {
		await mongo.insertOne(USERS_COLLECTION, userToAdd);
		return userToAdd;
	} catch (error) {
		console.error(error);
		return;
	}
};

async function toHash(payload: string): Promise<string> {
	const utf8 = new TextEncoder().encode(payload);
	const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((bytes) => bytes.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}
