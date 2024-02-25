import React, { useEffect, useState } from "react";
import { ToastProps } from "../ToastNotification";
import { PromptOptions, SideBarMode, User } from "../store/dataInterfaces";
import { setQuestionsAndResponses } from "../store/browser";
import MongoDbClient from "../store/MongoDbClient";
import {
	QUESTIONS_AND_RESPONSES_COLLECTION,
	USERS_COLLECTION,
} from "../store/constants";
import QuestionSection from "./QuestionSection";
import AIResultsSection from "./AIResultSection";
import api from "../api/api";

export interface AIInteractorProps {
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	promptOptions: PromptOptions;
	counter: number;
	user: User | undefined;
	aiPrompt: string;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	aiResult: string;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
	setSideBarMode: React.Dispatch<React.SetStateAction<SideBarMode>>;
}
export default function AIInteractor({
	setToast,
	promptOptions,
	setCounter,
	counter,
	user,
	aiPrompt,
	aiResult,
	setAiPrompt,
	setAiResult,
	setSideBarMode,
}: AIInteractorProps) {
	const [showLoader, setShowLoader] = useState(false);
	const mongo = new MongoDbClient();
	const setRemoteOrLocalQuestionsAndResponses = async () => {
		if (user) {
			const remoteUser = await mongo.findOne(USERS_COLLECTION, {
				email: user.email,
			});
			if (remoteUser?._id) {
				await mongo.insertOneQuestionAndResponse(
					QUESTIONS_AND_RESPONSES_COLLECTION,
					{
						question: aiPrompt,
						response: aiResult,
						date: new Date(),
						userId: remoteUser._id,
					}
				);
			} else {
				console.error("Not found", remoteUser);
			}
		} else {
			setQuestionsAndResponses({
				question: aiPrompt,
				response: aiResult,
				date: new Date(),
			});
		}
	};

	const [aiDetectionScore, setAiDetectionScore] = useState<string | null>(
		null
	);
	const [isAiDetectionScoreLoading, setIsAiDetectionScoreLoading] =
		useState(false);
	const getAiDetectionScore = async () => {
		setIsAiDetectionScoreLoading(true);
		const score = await api.ai.getDetectionScore(aiResult);
		if (score.response) {
			setAiDetectionScore(score.response);
		}
		setIsAiDetectionScoreLoading(false);
	};
	useEffect(() => {
		if (aiPrompt && aiResult) {
			setRemoteOrLocalQuestionsAndResponses();
		}
	}, [aiPrompt, aiResult]);

	return (
		<div className="flex flex-wrap flex-col md:flex-row md:h-full ">
			<QuestionSection
				aiPrompt={aiPrompt}
				setAiPrompt={setAiPrompt}
				setAiResult={setAiResult}
				setToast={setToast}
				promptOptions={promptOptions}
				counter={counter}
				setCounter={setCounter}
				user={user}
				showLoader={showLoader}
				setShowLoader={setShowLoader}
				setAiDetectionScore={setAiDetectionScore}
			/>
			<AIResultsSection
				setSideBarMode={setSideBarMode}
				aiResult={aiResult}
				setToast={setToast}
				setAiResult={setAiResult}
				showLoader={showLoader}
				aiDetectionScore={aiDetectionScore}
				getAiDetectionScore={getAiDetectionScore}
				isAiDetectionScoreLoading={isAiDetectionScoreLoading}
			/>
		</div>
	);
}
