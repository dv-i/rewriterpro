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
import { HumanizeButton } from "../components/HumanizeButton";
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
	const [isHumanizeEnabled, setIsHumanizeEnabled] = useState<boolean>(false);
	const handleParaphraseClick = async () => {
		setShowLoader(true);
		try {
			if (aiPrompt) {
				const response = await getResponseToAPrompt({
					prompt: aiPrompt,
					promptOptions: promptOptions,
					isHumanizeEnabled,
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
		const alreadyRedirected = sessionStorage.getItem("wp-redirect");
		if (
			!alreadyRedirected &&
			aiPrompt &&
			window.location.pathname.includes("wp-redirect")
		) {
			sessionStorage.setItem("wp-redirect", "true");
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
						<HumanizeButton
							setIsHumanizeEnabled={setIsHumanizeEnabled}
							isHumanizeEnabled={isHumanizeEnabled}
						/>
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

						<HumanizeButton
							setIsHumanizeEnabled={setIsHumanizeEnabled}
							isHumanizeEnabled={isHumanizeEnabled}
						/>
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
						<div className="flex items-center justify-center min-h-[300px] relative overflow-hidden rounded-lg shadow-sm h-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
							{aiPrompt.length === 0 && (
								<div className="z-10 flex gap-4 w-fit">
									<div
										onClick={() => {
											setAiPrompt("");
											setAiResult("");
											setAiPrompt(sentence());
										}}
										className="cursor-pointer bg-[#f1f5f9] flex flex-col items-center p-4 rounded-lg min-w-[150px]"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 mb-2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
											/>
										</svg>

										<p className="text-center text-slate-500">
											Try A Sample
										</p>
									</div>

									<div
										onClick={async () => {
											setAiPrompt(
												await navigator.clipboard.readText()
											);
										}}
										className="cursor-pointer bg-[#f1f5f9] flex flex-col items-center p-4 rounded-lg min-w-[150px]"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 mb-2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
											/>
										</svg>
										<p className="text-center text-slate-500">
											Paste text
										</p>
									</div>
								</div>
							)}

							<textarea
								style={{ height: 300 }}
								rows={10}
								name="comment"
								id="comment"
								className="absolute hidden sm:block w-full resize-none border-0 p-4 h-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
								placeholder="Start typing or paste text here..."
								value={aiPrompt}
								onChange={(e) => setAiPrompt(e.target.value)}
							/>
							<textarea
								style={{ height: 300 }}
								rows={10}
								name="comment"
								id="comment"
								className="absolute block sm:hidden w-full resize-none border-0 p-4 h-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
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
