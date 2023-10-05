import React, { useEffect, useState } from "react";
import {
	PaperClipIcon,
	ClipboardDocumentIcon,
	ArrowPathIcon,
	ChatBubbleBottomCenterTextIcon,
	TrashIcon,
} from "@heroicons/react/20/solid";
import { useRef } from "react";
import { Loader } from "../Loader";
import { ToastProps } from "../ToastNotification";
import { MAX_TRIES } from "../store/constants";
import { PromptOptions, User } from "../store/dataInterfaces";
import { getResponseToAPrompt } from "../utils/chatGpt";
import { sentence } from "txtgen";
import "../../src/assets/tooltip.css";
const MAX_CHARACTERS_FREE = 3000;
const MAX_CHARACTERS_PRO = 6000;

interface QuestionSectionProps {
	aiPrompt: string;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	showLoader: boolean;
	setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
	promptOptions: PromptOptions;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	counter: number;
	user: User | undefined;
}
export default function QuestionSection({
	aiPrompt,
	setAiPrompt,
	setAiResult,
	setToast,
	promptOptions,
	counter,
	setCounter,
	user,
	showLoader,
	setShowLoader,
}: QuestionSectionProps) {
	const [isRewriteDisabled, setIsRewriteDisabled] = useState<boolean>(false);
	const handleParaphraseClick = async () => {
		setShowLoader(true);
		try {
			if (aiPrompt) {
				const response = await getResponseToAPrompt({
					prompt: aiPrompt,
					promptOptions: promptOptions,
				});
				if (response) {
					setAiResult(response);
					setCounter((prev) => prev + 1);
				}
			}
		} catch (error) {
			setToast({
				visible: true,
				title: "Attempt Unsucessful",
				content: "Could not paraphrase, please try again...",
				type: "warning",
			});
		}
		setShowLoader(false);
	};

	const readTextFromSelectedFile = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			event.preventDefault();
			const reader = new FileReader();
			reader.onload = async (e) => {
				const text = e.target?.result?.toString();
				text && setAiPrompt(text);
			};
			reader.readAsText(file);
		}
	};

	const inputFile = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (
			!user?.pro &&
			(MAX_TRIES <= counter || aiPrompt.length > MAX_CHARACTERS_FREE)
		) {
			setIsRewriteDisabled(true);
		} else {
			if (aiPrompt.length > MAX_CHARACTERS_PRO) {
				setIsRewriteDisabled(true);
			} else {
				setIsRewriteDisabled(false);
			}
		}
	}, [aiPrompt, user, counter]);

	useEffect(() => {
		if (aiPrompt && window.location.pathname.includes("wp-redirect")) {
			startRewrite();
		}
	}, [aiPrompt]);

	const startRewrite = () => {
		setAiResult("");
		handleParaphraseClick();
	};

	const Options = () => {
		return (
			<>
				{/* Mobile */}
				<div className="sm:hidden inset-x-0 bottom-0 flex flex-col justify-between py-2 sm:pl-3">
					<div className="flex items-center space-x-5 w-full">
						<div className="flex gap-4 items-center w-full">
							<input
								type="file"
								accept=".txt"
								id="file"
								ref={inputFile}
								style={{ display: "none" }}
								onChange={readTextFromSelectedFile}
							/>
							<button
								type="button"
								className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
								onClick={() => inputFile.current?.click()}
							>
								<PaperClipIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
								<span className="sr-only">Attach a file</span>
							</button>
							<div
								className="sm:flex flex-row gap-2 items-start text-white cursor-pointer "
								onClick={async () => {
									setAiPrompt(
										await navigator.clipboard.readText()
									);
								}}
							>
								<ClipboardDocumentIcon
									className=" h-5 w-5 stroke-gray-400"
									aria-hidden="true"
								/>
							</div>
							<div
								className="flex flex-row gap-2 items-start text-white cursor-pointer "
								onClick={() => {
									setAiPrompt("");
									setAiResult("");
									setAiPrompt(sentence());
								}}
							>
								<ArrowPathIcon
									className=" h-5 w-5 stroke-gray-400"
									aria-hidden="true"
								/>
							</div>
							<div className="flex flex-row gap-2 items-start text-white ">
								<ChatBubbleBottomCenterTextIcon
									className=" h-5 w-5 stroke-gray-400"
									aria-hidden="true"
								/>
								<div className="-mb-2 font-light text-md text-gray-400">
									<span
										className={`${
											!user?.pro &&
											aiPrompt.length >
												MAX_CHARACTERS_FREE
												? "text-red-600"
												: user?.pro &&
												  aiPrompt.length >
														MAX_CHARACTERS_PRO
												? "text-red-400"
												: "text-gray-400"
										}`}
									>
										{aiPrompt.length}
									</span>
									/
									{user?.pro
										? MAX_CHARACTERS_PRO
										: MAX_CHARACTERS_FREE}
									<div className="xs:hidden">characters</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="inline-flex items-center rounded-md py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => {
								setAiPrompt("");
								setAiResult("");
							}}
						>
							<TrashIcon className="h-5 w-5 stroke-gray-400" />
						</button>
					</div>
					<div className="flex-shrink-0 gap-2 flex w-full flex-row mt-3">
						<button
							type="submit"
							className={`w-full inline-flex justify-center items-center rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
								isRewriteDisabled
									? "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
									: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
							}`}
							onClick={() => startRewrite()}
							disabled={isRewriteDisabled}
						>
							Rewrite
							<Loader visible={showLoader} />
						</button>
					</div>
				</div>

				{/* Desktop */}
				<div className="hidden inset-x-0 bottom-0 sm:flex justify-between py-2 pl-3">
					<div className="flex items-center space-x-5 w-full">
						<div className="flex gap-4 items-center w-full">
							<input
								type="file"
								accept=".txt"
								id="file"
								ref={inputFile}
								style={{ display: "none" }}
								onChange={readTextFromSelectedFile}
							/>
							<div className="tooltip-container">
								<button
									type="button"
									className="tooltip-btn -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
									onClick={() => inputFile.current?.click()}
								>
									<PaperClipIcon
										className="h-5 w-5 "
										aria-hidden="true"
									/>
									<span className="sr-only">
										Attach a file
									</span>
								</button>
								<span className="tooltip-text">Attach</span>
							</div>

							<div className="tooltip-container">
								<div
									className="tooltip-btn hidden sm:flex flex-row gap-2 items-start text-white cursor-pointer "
									onClick={async () => {
										setAiPrompt(
											await navigator.clipboard.readText()
										);
									}}
								>
									<ClipboardDocumentIcon
										className=" h-5 w-5 stroke-gray-400"
										aria-hidden="true"
									/>
								</div>
								<span className="tooltip-text">Paste</span>
							</div>

							<div className="tooltip-container">
								<div
									className="tooltip-btn flex flex-row gap-2 items-start text-white cursor-pointer "
									onClick={() => {
										setAiPrompt("");
										setAiResult("");
										setAiPrompt(sentence());
									}}
								>
									<ArrowPathIcon
										className=" h-5 w-5 stroke-gray-400"
										aria-hidden="true"
									/>
								</div>
								<span className="tooltip-text">Random</span>
							</div>

							<div className="flex flex-row gap-2 items-start text-white ">
								<ChatBubbleBottomCenterTextIcon
									className=" h-5 w-5 stroke-gray-400"
									aria-hidden="true"
								/>
								<div className="-mb-2 font-light text-md text-gray-400">
									<span
										className={`${
											!user?.pro &&
											aiPrompt.length >
												MAX_CHARACTERS_FREE
												? "text-red-600"
												: user?.pro &&
												  aiPrompt.length >
														MAX_CHARACTERS_PRO
												? "text-red-400"
												: "text-gray-400"
										}`}
									>
										{aiPrompt.length}
									</span>
									/
									{user?.pro
										? MAX_CHARACTERS_PRO
										: MAX_CHARACTERS_FREE}
									<div className="sm:hidden">characters</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-shrink-0 gap-2 flex flex-row">
						<div className="tooltip-container">
							<button
								type="submit"
								className="tooltip-btn inline-flex items-center rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={() => {
									setAiPrompt("");
									setAiResult("");
								}}
							>
								<TrashIcon className="h-5 w-5 stroke-gray-400" />
							</button>
							<span className="tooltip-text">Delete</span>
						</div>

						<button
							type="submit"
							className={`inline-flex items-center rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
								isRewriteDisabled
									? "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
									: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
							}`}
							onClick={() => startRewrite()}
							disabled={isRewriteDisabled}
						>
							Rewrite
							<Loader visible={showLoader} />
						</button>
					</div>
				</div>
			</>
		);
	};
	return (
		<div className="flex flex-col h-full w-full md:w-1/2 pr-3">
			<div className="flex items-start space-x-4  h-full">
				<div className="min-w-0 flex-1 h-full ">
					<div className="flex flex-col h-full">
						<div className="overflow-hidden rounded-lg shadow-sm h-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
							<textarea
								style={{ height: 300 }}
								rows={10}
								name="comment"
								id="comment"
								className="hidden sm:block w-full resize-none border-0 p-4 h-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
								placeholder="Start typing or paste text here..."
								value={aiPrompt}
								onChange={(e) => setAiPrompt(e.target.value)}
							/>
							<textarea
								style={{ height: 300 }}
								rows={10}
								name="comment"
								id="comment"
								className="block sm:hidden w-full resize-none border-0 p-4 h-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
								placeholder="Start typing or paste text here..."
								value={aiPrompt}
								onChange={(e) => setAiPrompt(e.target.value)}
							/>
						</div>
						{Options()}
					</div>
				</div>
			</div>
		</div>
	);
}
