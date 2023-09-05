export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

export const toHash = async (payload: string): Promise<string> => {
	const utf8 = new TextEncoder().encode(payload);
	const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((bytes) => bytes.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};

export const generateResetToken = (): string => {
	// Generate a random token with 32 bytes (256 bits)
	const tokenBytes = new Uint8Array(32);
	const arr = crypto.getRandomValues(tokenBytes);
	const token = Array.from(arr)
		.map((byte) => ("0" + (byte & 0xff).toString(16)).slice(-2))
		.join("");

	// Calculate the expiration time (5 minutes from now in milliseconds)
	const expirationTime = Date.now() + 5 * 60 * 1000;

	// Combine the token and expiration time into a single string
	const resetToken = `${token}.${expirationTime}`;

	return resetToken;
};

export const verifyResetToken = (resetToken: string): string | null => {
	// Split the token into token and expiration parts
	const [token, expiration] = resetToken.split(".");

	// Parse the expiration time as a number
	const expirationTime = parseInt(expiration, 10);

	// Check if the token has expired
	if (isNaN(expirationTime) || expirationTime < Date.now()) {
		return null; // Token has expired
	}

	return token;
};
