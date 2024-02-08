import React from "react";
interface StatisticsProps {
	aiResult: string;
	aiPrompt: string;
}

export default function Statistics({ aiResult, aiPrompt }: StatisticsProps) {
	function calculateAverages(text: string): {
		averageWords: string;
		averageSyllables: string;
	} {
		// Split the text into sentences
		const sentences = text.split(/[.!?]/);

		// Calculate average words per sentence
		const totalWords = sentences.reduce((sum, sentence) => {
			const words = sentence.trim().split(/\s+/).length;
			return sum + words;
		}, 0);
		const averageWords = (totalWords / sentences.length).toFixed(2);

		// Calculate average syllables per word
		const totalSyllables = sentences.reduce((sum, sentence) => {
			const words = sentence.trim().split(/\s+/);
			const syllables = words.reduce((wordSum, word) => {
				const syllableCount = countSyllables(word);
				return wordSum + syllableCount;
			}, 0);
			return sum + syllables;
		}, 0);
		const averageSyllables = (totalSyllables / totalWords).toFixed(2);

		return { averageWords, averageSyllables };
	}

	// Helper function to count syllables in a word
	function countSyllables(word: string): number {
		// Simplified syllable counting for demonstration purposes
		const syllableRegex = /[^aeiouy]*[aeiouy]+[^aeiouy]*/gi;
		const matches = word.match(syllableRegex);
		return matches ? matches.length : 0;
	}

	function analyzeText(text: string): {
		sentenceCount: number;
		wordCount: number;
		characterCount: number;
	} {
		// Calculate sentence count
		const sentenceCount = text.split(/[.!?]/).filter(Boolean).length;

		// Calculate word count
		const wordCount = text.split(/\s+/).filter(Boolean).length;

		// Calculate character count
		const characterCount = text.replace(/\s/g, "").length;

		return { sentenceCount, wordCount, characterCount };
	}

	function calculateTextChangePercentage(
		text1: string,
		text2: string
	): string {
		function calculateLevenshteinDistance(
			str1: string,
			str2: string
		): number {
			const m = str1.length;
			const n = str2.length;

			const dp: number[][] = Array.from({ length: m + 1 }, () =>
				Array(n + 1).fill(0)
			);

			for (let i = 0; i <= m; i++) {
				for (let j = 0; j <= n; j++) {
					if (i === 0) {
						dp[i][j] = j;
					} else if (j === 0) {
						dp[i][j] = i;
					} else if (str1[i - 1] === str2[j - 1]) {
						dp[i][j] = dp[i - 1][j - 1];
					} else {
						dp[i][j] =
							1 +
							Math.min(
								dp[i - 1][j],
								dp[i][j - 1],
								dp[i - 1][j - 1]
							);
					}
				}
			}

			return dp[m][n];
		}

		const levenshteinDistance = calculateLevenshteinDistance(text1, text2);

		// Calculate the percentage change
		const maxLength = Math.max(text1.length, text2.length);
		const percentageChange = (levenshteinDistance / maxLength) * 100;

		return (100 - percentageChange).toFixed(2) + "%"; // Return the percentage similarity
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-start px-2 lg:px-4">
			<div className="sm:mx-auto flex-2 sm:w-full sm:max-w-sm">
				<h2 className="mt-0 pt-0 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900">
					Statistics
				</h2>
			</div>
			<div className="flex-1 flex h-full flex-col text-gray-600">
				<h2 className="mt-0 pt-0  text-3xl font-bold leading-9 tracking-tight text-gray-900">
					Fluency
				</h2>
				<p className="text-center font-bold text-xl">
					Average Words in a Sentence: <br />{" "}
					<span>{calculateAverages(aiPrompt).averageWords}</span> →{" "}
					<span
						className={`${
							calculateAverages(aiResult).averageWords >=
							calculateAverages(aiPrompt).averageWords
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{calculateAverages(aiResult).averageWords}
					</span>
				</p>
				<p className="text-center font-bold text-xl">
					Average Syllables Per Word: <br />{" "}
					<span>{calculateAverages(aiPrompt).averageSyllables}</span>{" "}
					→{" "}
					<span
						className={`${
							calculateAverages(aiResult).averageSyllables >=
							calculateAverages(aiPrompt).averageSyllables
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{calculateAverages(aiResult).averageSyllables}
					</span>
				</p>

				<div className="w-50 h-1 mt-12 mb-12 bg-gray-300"></div>
				<h2 className="mt-0 pt-0 text-3xl font-bold leading-9 tracking-tight text-gray-900">
					Difference
				</h2>
				<p className="text-center font-bold text-xl">
					Sentence Count: <br />{" "}
					<span>{analyzeText(aiPrompt).sentenceCount}</span> →{" "}
					<span
						className={`${
							analyzeText(aiResult).sentenceCount >=
							analyzeText(aiPrompt).sentenceCount
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{analyzeText(aiResult).sentenceCount}
					</span>
				</p>
				<p className="text-center font-bold text-xl">
					Word Count: <br />{" "}
					<span>{analyzeText(aiPrompt).wordCount}</span> →{" "}
					<span
						className={`${
							analyzeText(aiResult).wordCount >=
							analyzeText(aiPrompt).wordCount
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{analyzeText(aiResult).wordCount}
					</span>
				</p>
				<p className="text-center font-bold text-xl">
					Character Count: <br />{" "}
					<span>{analyzeText(aiPrompt).characterCount}</span> →{" "}
					<span
						className={`${
							analyzeText(aiResult).characterCount >=
							analyzeText(aiPrompt).characterCount
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{analyzeText(aiResult).characterCount}
					</span>
				</p>
				<p className="text-center font-bold text-xl">
					Percentage Change: <br />{" "}
					<span className="text-green-600">
						{calculateTextChangePercentage(aiPrompt, aiResult)}
					</span>
				</p>
			</div>
		</div>
	);
}
