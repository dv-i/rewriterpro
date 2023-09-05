import MongoDbClient from "./store/MongoDbClient";
import { USERS_COLLECTION } from "./store/constants";
import { User } from "./store/dataInterfaces";
import { toHash } from "./utils/general";
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
	fullName: string;
	password?: string;
	passwordHash?: string;
	authType?: string;
}): Promise<User | undefined> => {
	const mongo = new MongoDbClient();
	const user = await mongo.findOne(USERS_COLLECTION, {
		email: userToAdd.email,
	});
	if (user) {
		if (userToAdd.authType) {
			return userToAdd;
		}
		console.error("User already exists");
		return;
	}

	if (!userToAdd?.authType) {
		const passwordHash = await toHash(userToAdd.password || "");
		userToAdd.passwordHash = passwordHash;
		delete userToAdd.password;
	}

	try {
		await mongo.insertOne(USERS_COLLECTION, userToAdd);
		return userToAdd;
	} catch (error) {
		console.error(error);
		return;
	}
};
