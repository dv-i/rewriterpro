import React, { useRef, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
	ChatBubbleBottomCenterTextIcon,
	ArrowDownTrayIcon,
	DocumentDuplicateIcon,
	TrashIcon,
	ClipboardDocumentIcon,
	ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { getResponseToAPrompt } from "./utils/chatGpt";
import { ToastProps } from "./ToastNotification";
import { PromptOptions, User } from "./store/dataInterfaces";
import { MAX_TRIES } from "./store/constants";
import { sentence } from "txtgen";

export interface AIInteractorProps {
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	promptOptions: PromptOptions;
	counter: number;
	user: User | undefined;
}
export default function AIInteractor({
	setToast,
	promptOptions,
	setCounter,
	counter,
	user,
}: AIInteractorProps) {
	const [aiPrompt, setAiPrompt] = useState<string>("");
	const [aiResult, setAiResult] = useState<string>("");

	return (
		<div className="flex flex-wrap flex-col md:flex-row md:h-full">
			<OriginalSection
				aiPrompt={aiPrompt}
				setAiPrompt={setAiPrompt}
				setAiResult={setAiResult}
				setToast={setToast}
				promptOptions={promptOptions}
				counter={counter}
				setCounter={setCounter}
				user={user}
			/>
			<AIResultsSection aiResult={aiResult} setToast={setToast} />
		</div>
	);
}

interface OriginalSectionProps {
	aiPrompt: string;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	promptOptions: PromptOptions;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	counter: number;
	user: User | undefined;
}

interface AIResultsSectionProps {
	aiResult: string;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
}

function OriginalSection({
	aiPrompt,
	setAiPrompt,
	setAiResult,
	setToast,
	promptOptions,
	counter,
	setCounter,
	user,
}: OriginalSectionProps) {
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
	const [showLoader, setShowLoader] = useState(false);
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
								className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-white"
								onClick={() => inputFile.current?.click()}
							>
								<PaperClipIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
								<span className="sr-only">Attach a file</span>
							</button>
							<div
								className="hidden sm:flex flex-row gap-2 items-start text-gray-400 cursor-pointer "
								onClick={async () => {
									setAiPrompt(
										await navigator.clipboard.readText()
									);
								}}
							>
								<ClipboardDocumentIcon
									className=" h-5 w-5"
									aria-hidden="true"
								/>
							</div>
							<div
								className="flex flex-row gap-2 items-start text-gray-400 cursor-pointer "
								onClick={() => setAiPrompt(sentence())}
							>
								<ArrowPathIcon
									className=" h-5 w-5"
									aria-hidden="true"
								/>
							</div>
							<div className="flex flex-row gap-2 items-start text-gray-400 ">
								<ChatBubbleBottomCenterTextIcon
									className=" h-5 w-5"
									aria-hidden="true"
								/>
								<div className="-mb-2 font-light text-md">
									{aiPrompt.length} / 3000 characters
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="inline-flex items-center rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => {
								setAiPrompt("");
								setAiResult("");
							}}
						>
							<TrashIcon className="h-5 w-5 stroke-white" />
						</button>
					</div>
					<div className="flex-shrink-0 gap-2 flex w-full flex-row mt-3">
						<button
							type="submit"
							className={`w-full inline-flex justify-center items-center rounded-md px-3 py-2 text-md font-semibold text-indigo-600 bg-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
								MAX_TRIES <= counter && !user?.pro
									? "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
									: "bg-white hover:bg-white focus-visible:outline-indigo-600"
							}`}
							onClick={() => {
								handleParaphraseClick();
							}}
							disabled={MAX_TRIES <= counter && !user?.pro}
						>
							<Loader visible={showLoader} />
							Rewrite
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
							<button
								type="button"
								className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-white"
								onClick={() => inputFile.current?.click()}
							>
								<PaperClipIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
								<span className="sr-only">Attach a file</span>
							</button>
							<div
								className="hidden sm:flex flex-row gap-2 items-start text-gray-400 cursor-pointer "
								onClick={async () => {
									setAiPrompt(
										await navigator.clipboard.readText()
									);
								}}
							>
								<ClipboardDocumentIcon
									className=" h-5 w-5"
									aria-hidden="true"
								/>
							</div>
							<div
								className="flex flex-row gap-2 items-start text-gray-400 cursor-pointer "
								onClick={() => setAiPrompt(sentence())}
							>
								<ArrowPathIcon
									className=" h-5 w-5"
									aria-hidden="true"
								/>
							</div>
							<div className="flex flex-row gap-2 items-start text-gray-400 ">
								<ChatBubbleBottomCenterTextIcon
									className=" h-5 w-5"
									aria-hidden="true"
								/>
								<div className="-mb-2 font-light text-md">
									{aiPrompt.length} / 3000 characters
								</div>
							</div>
						</div>
					</div>
					<div className="flex-shrink-0 gap-2 flex flex-row">
						<button
							type="submit"
							className="inline-flex items-center rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => {
								setAiPrompt("");
								setAiResult("");
							}}
						>
							<TrashIcon className="h-5 w-5 stroke-gray-400" />
						</button>
						<button
							type="submit"
							className={`inline-flex items-center rounded-md px-3 py-2 text-md font-semibold text-indigo-600 bg-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
								MAX_TRIES <= counter && !user?.pro
									? "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
									: "bg-white hover:bg-white focus-visible:outline-indigo-600"
							}`}
							onClick={() => {
								handleParaphraseClick();
							}}
							disabled={MAX_TRIES <= counter && !user?.pro}
						>
							<Loader visible={showLoader} />
							Rewrite
						</button>
					</div>
				</div>
			</>
		);
	};
	return (
		<div className="flex flex-col h-full w-full md:w-1/2 pr-3">
			<h2 className="text-lg font-semibold leading-6 text-white pb-5">
				Original:
			</h2>
			<div className="flex items-start space-x-4  h-full">
				<div className="min-w-0 flex-1 h-full">
					<div className="flex flex-col h-full">
						<div className="overflow-hidden rounded-lg shadow-sm h-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
							<textarea
								rows={10}
								name="comment"
								id="comment"
								className="hidden sm:block w-full resize-none border-0 p-4 h-full bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
								placeholder="Start typing or paste text here..."
								value={aiPrompt}
								maxLength={3000}
								onChange={(e) => setAiPrompt(e.target.value)}
							/>
							<textarea
								rows={10}
								name="comment"
								id="comment"
								className="block sm:hidden w-full resize-none border-0 p-4 h-full bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
								placeholder="Start typing or paste text here..."
								value={aiPrompt}
								maxLength={3000}
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

function AIResultsSection({ aiResult, setToast }: AIResultsSectionProps) {
	const Options = () => {
		return (
			<div className="inset-x-0 bottom-0 flex justify-between py-2 sm:pl-3">
				<div className="flex items-center space-x-5 w-full">
					<div className="flex gap-4 items-center w-full">
						<button
							type="button"
							className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-white"
							onClick={() => {
								const blob = new Blob([aiResult], {
									type: "text/plain",
								});
								const link = document.createElement("a");
								link.href = window.URL.createObjectURL(blob);
								link.download = "result.txt";
								link.click();
							}}
						>
							<ArrowDownTrayIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</button>
						<div className="flex flex-row gap-2 items-start text-gray-400 ">
							<ChatBubbleBottomCenterTextIcon
								className=" h-5 w-5"
								aria-hidden="true"
							/>
							<div className="-mb-2 font-light text-md">
								{aiResult.length} / 3000 characters
							</div>
						</div>
					</div>
				</div>
				<div className="flex-shrink-0 py-2">
					<button
						type="button"
						className="hidden sm:block -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-white"
						onClick={() => {
							if (aiResult) {
								navigator.clipboard.writeText(aiResult);
								setToast({
									visible: true,
									title: "Succesfully Copied",
									content:
										"Comeback for more paraphrasing...",
								});
							} else {
								setToast({
									visible: true,
									title: "Nothing to copy",
									content: "Get started with paraphrasing...",
									type: "warning",
								});
							}
						}}
					>
						<DocumentDuplicateIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
				</div>
			</div>
		);
	};
	return (
		<div className="flex flex-col h-full w-full md:w-1/2 mt-5 sm:mt-0 sm:pl-3 pr-3">
			<h3 className="text-lg font-semibold leading-6 text-white pb-5">
				Paraphrased:
			</h3>
			<div className="flex items-start space-x-4  h-full">
				<div className="min-w-0 flex-1 h-full">
					<form action="#" className="relative h-full ">
						<div className="flex flex-col h-full">
							<div className="overflow-hidden rounded-lg shadow-sm h-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
								<textarea
									rows={3}
									name="comment"
									id="comment"
									className="hidden sm:block w-full resize-none border-0 p-5 h-full bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
									value={aiResult}
									disabled
								/>
								<textarea
									rows={10}
									name="comment"
									id="comment"
									className="block sm:hidden w-full resize-none border-0 p-5 h-full bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
									value={aiResult}
									disabled
								/>
							</div>

							{Options()}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

function Loader({ visible }: { visible: boolean }) {
	return (
		<svg
			aria-hidden="true"
			role="status"
			className={`${
				visible ? "" : "hidden"
			} inline mr-3 w-4 h-4 text-white animate-spin`}
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="#E5E7EB"
			></path>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentColor"
			></path>
		</svg>
	);
}
