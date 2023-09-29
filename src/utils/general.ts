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

export const generateRandomSixDigitNumber = (): string => {
	const min = 100000; // Minimum 6-digit number
	const max = 999999; // Maximum 6-digit number
	return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
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

export const getRandomQuote = (): string => {
	const quotes: string[] = [
		"While your text transforms, remember: 'The beauty of language is that it allows you to express the extraordinary in the ordinary.' – Joseph Joubert",
		"Did you know? The longest word in the English language is 'pneumonoultramicroscopicsilicovolcanoconiosis.' Don't worry; your rewrite won't take that long!",
		"Words have the power to change the world. Your text is getting ready to make an impact!",
		"In the world of AI, patience is a virtue. Your reimagined text is almost here.",
		"While we work our magic on your text, consider this: 'The pen is mightier than the sword.' – Edward Bulwer-Lytton",
		"Rewriting is like sculpting with words. Your masterpiece is on its way!",
		"Ever wonder how Shakespeare would rewrite your text? We're giving it a modern twist!",
		"The art of rewriting is a bit like cooking – the secret sauce is about to be added to your text!",
		"Just like a caterpillar becomes a butterfly, your text is undergoing a transformation. Embrace the change!",
		"While your text evolves, think about the infinite possibilities of language. It's a beautiful journey!",
		"Wordsmiths at work! Your text is in good hands.",
		"Words have the power to heal, inspire, and connect. Your rewritten text is a testament to that.",
		"As your text undergoes its makeover, remember that every word has a story to tell.",
		"In the world of words, rewriting is like hitting the refresh button on your ideas.",
		"While you wait, consider the words of Mark Twain: 'The difference between the right word and the almost right word is the difference between lightning and a lightning bug.'",
		"Behind the scenes, our AI is like a digital wordsmith, carefully crafting your text into something extraordinary.",
		"Our AI Rewriter is in deep thought, meticulously rephrasing your text for maximum impact.",
		"As you wait, our AI Rewriter is conducting a symphony of words, orchestrating a masterpiece just for you.",
		"Ever wondered what happens when technology meets creativity? Our AI is rewriting the boundaries of possibility.",
		"While you wait, envision a digital genius at work, reshaping your text with precision and flair.",
		"In the digital realm, your text is navigating the labyrinth of language, guided by our AI's profound understanding.",
		"Our AI is like a magician, transforming words and sentences with unmatched expertise.",
		"Your text is undergoing a metamorphosis, thanks to our AI's relentless dedication to perfection.",
		"Witness the marvel of modern technology as your text is sculpted into a linguistic masterpiece.",
		"In the world of AI, rewriting is both an art and a science, and our AI is a true virtuoso.",
		"Every rewrite is a testament to our AI's tireless pursuit of excellence in text transformation.",
		"Your text is embarking on a voyage along the neural pathways of our AI's sophisticated algorithms",
		"Consider this wait as the AI's way of handcrafting a literary gem from your original text.",
		"As your text is being meticulously rewritten, rest assured that our AI leaves no word unexamined.",
		"Our AI is working diligently to rewrite your text, pushing the boundaries of what's possible with technology.",
	];

	const randomIndex: number = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
};
