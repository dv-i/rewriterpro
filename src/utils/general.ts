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

export const getRandomSentence = (): string => {
	const sentences = [
		"As the Earth rotates on its axis from west to east, the sun appears to rise in the east and set in the west, a phenomenon known as diurnal motion, which occurs due to the planet's orbital motion around the sun, causing varying angles of sunlight to illuminate different parts of the Earth's surface at different times of the day.",
		"Photosynthesis, the biochemical process by which green plants, algae, and some bacteria convert light energy into chemical energy, requires three primary components: sunlight, absorbed through pigments such as chlorophyll; water, which is absorbed from the soil through the plant's roots and transported to the leaves; and nutrients, including carbon dioxide and minerals, which are absorbed from the surrounding environment or through the roots' interaction with the soil.",
		"The relationship between heavy rainfall and the increased risk of flooding in low-lying areas stems from the principle of water displacement, where an excessive amount of precipitation overwhelms natural or man-made drainage systems, leading to the accumulation of water on the ground's surface, particularly in regions with inadequate drainage infrastructure or where the soil's ability to absorb water is limited.",
		"The effectiveness of regular study habits in improving academic performance can be attributed to the concept of spaced repetition, wherein the brain's ability to encode and retrieve information is enhanced through repeated exposure to material over time, allowing for deeper understanding, improved retention, and the formation of stronger neural connections associated with long-term memory storage.",
		"Maintaining a well-balanced diet, comprising a diverse range of nutrients from various food groups, coupled with regular physical activity, forms the cornerstone of a healthy lifestyle, as it supports optimal bodily functions, including metabolism, immune system function, and cardiovascular health, while also promoting healthy weight management and reducing the risk of chronic diseases such as diabetes, hypertension, and cardiovascular disease.",
		"Investing in stocks, despite the inherent risks associated with market volatility and fluctuating asset prices, offers the potential for substantial long-term returns on investment, driven by factors such as corporate earnings growth, dividend payments, and market appreciation, with historical data indicating that equities have historically outperformed other asset classes over extended investment horizons, albeit with varying degrees of risk depending on factors such as sectoral diversification and market conditions.",
		"When ambient temperatures fall below the freezing point of water, typically 0°C (32°F) at sea level and under standard atmospheric pressure, liquid water undergoes a phase transition into a solid state, forming ice, a crystalline structure composed of water molecules arranged in a hexagonal lattice, which adheres to surfaces and may create hazardous conditions such as black ice on roadways, posing risks to pedestrians and motorists alike.",
		"Effective waste management practices encompass a range of strategies aimed at minimizing the generation, disposal, and environmental impact of waste materials, including source reduction, recycling, composting, and landfill diversion, with the overarching goal of conserving natural resources, reducing pollution and greenhouse gas emissions, and promoting sustainable development principles that prioritize the efficient use of resources and the preservation of ecological integrity for future generations.",
		"Routine maintenance and periodic servicing of vehicles, encompassing tasks such as oil changes, fluid checks, tire rotations, and brake inspections, play a pivotal role in ensuring optimal performance, reliability, and safety on the road, as they help prevent mechanical failures, address potential issues before they escalate into costly repairs, and extend the lifespan of automotive components through proactive upkeep and timely replacements as per manufacturer recommendations.",
		"Adhering to traffic laws, regulations, and safe driving practices, including obeying speed limits, yielding to pedestrians, signaling lane changes, and avoiding distractions such as texting or impaired driving, fosters a culture of responsible road behavior, reduces the likelihood of accidents and collisions, and promotes the overall safety and well-being of all road users, contributing to the mitigation of injuries, fatalities, and property damage associated with vehicular accidents.",
	];
	const randomIndex: number = Math.floor(Math.random() * sentences.length);
	return sentences[randomIndex];
};
