import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
import { User } from "./store/dataInterfaces";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

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
	const authorized = await bcrypt.compare(password, passwordHash);
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

	const passwordHash = bcrypt.hashSync(userToAdd.password, 12);
	userToAdd.passwordHash = passwordHash;

	try {
		await mongo.insertOne(USERS_COLLECTION, userToAdd);
		return userToAdd;
	} catch (error) {
		console.error(error);
		return;
	}
};
