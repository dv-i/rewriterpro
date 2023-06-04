import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
	ChatBubbleBottomCenterTextIcon,
	ArrowDownTrayIcon,
	DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { getResponseToAPrompt } from "./utils/chatGpt";

export default function AIInteractor() {
	const [aiPrompt, setAiPrompt] = useState<string>("");
	const [aiResult, setAiResult] = useState<string>("");

	return (
		<div className="flex flex-wrap flex-row h-full">
			<OriginalSection aiPrompt={aiPrompt} setAiPrompt={setAiPrompt} setAiResult={setAiResult} />
			<AIResultsSection aiResult={aiResult} />
		</div>
	);
}

interface OriginalSectionProps {
	aiPrompt: string;
	setAiPrompt: React.Dispatch<React.SetStateAction<string>>;
	setAiResult: React.Dispatch<React.SetStateAction<string>>;
}

interface AIResultsSectionProps {
	aiResult: string;
}

function OriginalSection({ aiPrompt, setAiPrompt, setAiResult }: OriginalSectionProps) {

	const handleParaphraseClick = async () => {
		if (aiPrompt) {
			const response = await getResponseToAPrompt(aiPrompt);
			if (response) {
				setAiResult(response);
			}
		}
	};

	return (
		<div className="flex flex-col h-full w-1/2 pr-3">
			<h2 className="text-lg font-semibold leading-6 text-gray-500 pb-5">
				Original:
			</h2>
			<div className="flex items-start space-x-4  h-full">
				<div className="min-w-0 flex-1 h-full">
					<div className="flex flex-col h-full">
						<div className="overflow-hidden rounded-lg shadow-sm h-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
							<textarea
								rows={3}
								name="comment"
								id="comment"
								className="block w-full resize-none border-0 p-2 h-full bg-transparent py-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="Start typing or paste text here..."
								value={aiPrompt}
								maxLength={3000}
								onChange={(e) => setAiPrompt(e.target.value)}
							/>
						</div>

						<div className="inset-x-0 bottom-0 flex justify-between py-2 pl-3">
							<div className="flex items-center space-x-5 w-full">
								<div className="flex gap-4 items-center w-full">
									<button
										type="button"
										className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
									>
										<PaperClipIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
										<span className="sr-only">
											Attach a file
										</span>
									</button>
									<div className="flex flex-row gap-2 items-start text-gray-400 ">
										<ChatBubbleBottomCenterTextIcon
											className=" h-5 w-5"
											aria-hidden="true"
										/>
										<div className="-mb-2 font-light text-sm">
											{aiPrompt.length} / 3000 characters
										</div>
									</div>
								</div>
							</div>
							<div className="flex-shrink-0">
								<button
									type="submit"
									className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									onClick={() => {
										handleParaphraseClick();
									}}
								>
									Paraphrase
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function AIResultsSection({ aiResult }: AIResultsSectionProps) {
	return (
		<div className="flex flex-col h-full w-1/2 pl-3">
			<h3 className="text-lg font-semibold leading-6 text-gray-500 pb-5">
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
									className="block w-full resize-none border-0 p-2 h-full bg-transparent py-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									value={aiResult}
									disabled
								/>
							</div>

							<div className="inset-x-0 bottom-0 flex justify-between py-2 pl-3">
								<div className="flex items-center space-x-5 w-full">
									<div className="flex gap-4 items-center w-full">
										<button
											type="button"
											className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
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
											<div className="-mb-2 font-light text-sm">
												{aiResult.length} / 3000
												characters
											</div>
										</div>
									</div>
								</div>
								<div className="flex-shrink-0 py-2">
									<button
										type="button"
										className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
									>
										<DocumentDuplicateIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
