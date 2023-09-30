import React, { Fragment, useEffect, useState } from "react";
import { QuestionAndResponse } from "../store/dataInterfaces";
import { getQuestionsAndResponses } from "../store/browser";

const MAX_QUESTION_LENGTH = 40;
const MAX_RESPONSE_LENGTH = 150;
function formatTimestamp(timestamp: string) {
	const date = new Date(timestamp);

	return date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "short",
	});
}

interface HistoryProps {
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
	setSideBarMode: React.Dispatch<
		React.SetStateAction<
			"login" | "signup" | "forgot-password" | "history" | undefined
		>
	>;
}

export default function HistoryV2({
	setAiPrompt,
	setAiResult,
	setSideBarMode,
}: HistoryProps) {
	const [questionAndResponses, setQuestionsAndResponses] =
		useState<QuestionAndResponse[]>();

	useEffect(() => {
		const existingQuestionsAndResponses = getQuestionsAndResponses();
		if (existingQuestionsAndResponses) {
			setQuestionsAndResponses(
				existingQuestionsAndResponses.sort(
					(a: any, b: any) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				)
			);
		}
	}, []);

	const setAiPromptAndResult = (questionAndResponse: QuestionAndResponse) => {
		setAiPrompt(questionAndResponse.question);
		setAiResult(questionAndResponse.response);
		setSideBarMode(undefined);
	};

	const renderHistoryFeed = () => {
		return (
			<ul role="list" className="-mb-8">
				{questionAndResponses?.map((questionAndResponse, index) => (
					<li key={questionAndResponse.date.toString()}>
						<div className="relative text-left">
							<div
								className="relative flex items-start space-x-3"
								onClick={() =>
									setAiPromptAndResult(questionAndResponse)
								}
								style={{ cursor: "pointer" }}
							>
								<>
									<div className="min-w-0 flex-1">
										<div>
											<div className="text-sm">
												<p className="font-bold text-gray-900 hover:underline">
													{questionAndResponse.question.slice(
														0,
														MAX_QUESTION_LENGTH
													) +
														(questionAndResponse
															.question.length >
														MAX_QUESTION_LENGTH
															? "..."
															: "")}
												</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												{formatTimestamp(
													questionAndResponse.date.toString()
												)}
											</p>
										</div>
										<div
											className={
												"mt-2 text-sm text-gray-700"
											}
										>
											<p className="hover:underline">
												{questionAndResponse.response.slice(
													0,
													MAX_RESPONSE_LENGTH
												) +
													(questionAndResponse
														.response.length >
													MAX_RESPONSE_LENGTH
														? "..."
														: "")}
											</p>
										</div>
									</div>
								</>
							</div>
							<div className="w-50 h-1 mt-12 mb-12 bg-gray-300"></div>
						</div>
					</li>
				))}
			</ul>
		);
	};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-start px-2 lg:px-4">
			<div className="sm:mx-auto flex-2 sm:w-full sm:max-w-sm">
				<h2 className="mt-0 pt-0 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900">
					History
				</h2>
			</div>
			<div className="text-center flex-1 flex h-full justify-center flex-col text-gray-600">
				{questionAndResponses?.length
					? renderHistoryFeed()
					: "Your history is empty. Rewrite some content to see it here!"}
			</div>
		</div>
	);
}
