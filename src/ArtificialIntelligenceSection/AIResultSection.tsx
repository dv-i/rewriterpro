import React from "react";
import {
	ArrowDownTrayIcon,
	ChatBubbleBottomCenterTextIcon,
	DocumentDuplicateIcon,
} from "@heroicons/react/20/solid";
import { ToastProps } from "../ToastNotification";
import { getRandomQuote } from "../utils/general";
import loadingIcon from "../../src/assets/loading.gif";
import "../../src/assets/tooltip.css";
import { SideBarMode } from "../store/dataInterfaces";
import aiGlass from "../assets/ai-glass.png";
import { Loader } from "../Loader";

interface AIResultsSectionProps {
	aiResult: string;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
	showLoader: boolean;
	setSideBarMode: React.Dispatch<React.SetStateAction<SideBarMode>>;
	aiDetectionScore: string | null;
	getAiDetectionScore: () => Promise<void>;
	isAiDetectionScoreLoading: boolean;
}

export default function AIResultsSection({
	aiResult,
	setToast,
	showLoader,
	setSideBarMode,
	aiDetectionScore,
	getAiDetectionScore,
	isAiDetectionScoreLoading,
}: AIResultsSectionProps) {
	const Options = () => {
		return (
			<div className="inset-x-0 bottom-0 flex justify-between py-2 sm:pl-3">
				<div className="flex items-center space-x-5 w-full">
					<div className="flex gap-4 items-center w-full">
						<div className="tooltip-container">
							<button
								type="button"
								className="tooltip-btn hidden sm:block -m-2.5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
								onClick={() => {
									if (aiResult) {
										navigator.clipboard.writeText(aiResult);
										setToast({
											visible: true,
											title: "Succesfully Copied",
											content:
												"Comeback for more rewriting...",
										});
									} else {
										setToast({
											visible: true,
											title: "Nothing to copy",
											content:
												"Get started with rewriting...",
											type: "warning",
										});
									}
								}}
							>
								<DocumentDuplicateIcon
									className="h-5 w-5 stroke-gray-400"
									aria-hidden="true"
								/>
							</button>
							<span className="tooltip-text">Copy</span>
						</div>

						<div className="tooltip-container">
							<button
								type="button"
								className="tooltip-btn -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
								onClick={() => {
									const blob = new Blob([aiResult], {
										type: "text/plain",
									});
									const link = document.createElement("a");
									link.href =
										window.URL.createObjectURL(blob);
									link.download = "result.txt";
									link.click();
								}}
							>
								<ArrowDownTrayIcon
									className="h-5 w-5 stroke-gray-400"
									aria-hidden="true"
								/>
							</button>
							<span className="tooltip-text">Download</span>
						</div>

						<div className="flex flex-row gap-2 items-start text-white ">
							<ChatBubbleBottomCenterTextIcon
								className=" h-5 w-5 stroke-gray-400"
								aria-hidden="true"
							/>
							<div className="-mb-2 font-light text-md text-gray-400">
								{aiResult.length} / 3000{" "}
								<div className="xs:hidden">characters</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center">
					{aiResult && (
						<div className="flex-shrink-0 py-2 tooltip-container">
							<button
								onClick={() => {
									setSideBarMode("statistics");
								}}
								className="tooltip-btn h-6 w-6 mr-2"
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										stroke="#9ca3af"
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
									/>
								</svg>
							</button>
							<span className="tooltip-text">Statistics</span>
						</div>
					)}

					<div className="flex-shrink-0 py-2 tooltip-container mr-2">
						{isAiDetectionScoreLoading ? (
							<Loader visible={isAiDetectionScoreLoading} />
						) : aiDetectionScore ? (
							<div>
								<div
									className={`${
										parseInt(aiDetectionScore) < 50
											? "text-green-500 "
											: "text-red-500 "
									}font-light text-lg mb-1 text-gray-400`}
								>
									{aiDetectionScore}%
								</div>
							</div>
						) : (
							<img
								className={
									aiResult
										? "cursor-pointer"
										: "cursor-default"
								}
								onClick={async () => {
									if (aiResult) {
										await getAiDetectionScore();
									}
								}}
								src={aiGlass}
								width={30}
							/>
						)}

						<span className="tooltip-text">
							{!aiDetectionScore
								? "Rewrite text to detect AI score"
								: parseInt(aiDetectionScore) < 50
								? "Your text is likely to be written by a human"
								: "AI Content Detected"}
						</span>
					</div>
					<div className="flex-shrink-0 py-2 tooltip-container">
						<button
							onClick={() => {
								setSideBarMode("history");
							}}
							className="tooltip-btn h-6 w-6"
							type="button"
						>
							{/* History */}
							<svg
								className="w-6 h-6"
								version="1.0"
								xmlns="http://www.w3.org/2000/svg"
								width="512.000000pt"
								height="512.000000pt"
								viewBox="0 0 512.000000 512.000000"
								preserveAspectRatio="xMidYMid meet"
							>
								<g
									transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
									fill="#9ca3af"
									stroke="#9ca3af"
								>
									<path
										d="M2375 4794 c-376 -39 -726 -158 -1015 -345 l-75 -48 -6 70 c-9 110
-61 164 -159 164 -63 0 -95 -16 -134 -69 -20 -26 -21 -40 -21 -326 0 -286 1
-300 21 -326 11 -15 33 -37 48 -48 26 -20 40 -21 326 -21 286 0 300 1 326 21
53 39 69 71 69 134 0 44 -5 66 -21 86 -39 53 -69 68 -152 74 l-77 5 80 47
c748 439 1689 329 2308 -271 176 -170 288 -324 393 -536 364 -741 218 -1624
-365 -2206 -398 -396 -936 -598 -1493 -558 -362 26 -688 144 -998 363 -107 76
-328 295 -410 406 -232 316 -354 664 -378 1078 -9 142 -16 162 -76 206 -39 29
-133 29 -172 0 -74 -55 -84 -106 -65 -326 46 -520 259 -987 620 -1361 350
-362 769 -579 1286 -663 151 -25 494 -25 652 -1 472 74 887 279 1223 603 358
346 577 764 662 1264 26 151 31 512 10 645 -89 544 -300 960 -668 1315 -333
321 -735 524 -1194 600 -121 21 -443 34 -545 24z"
									/>
									<path
										d="M2375 3989 c-619 -85 -1108 -548 -1232 -1166 -24 -122 -24 -404 0
-526 105 -524 474 -943 975 -1107 154 -50 249 -64 432 -65 256 0 437 41 656
151 400 199 684 578 771 1029 24 125 24 397 0 518 -59 293 -192 543 -402 752
-208 209 -461 344 -747 400 -99 20 -355 28 -453 14z m330 -319 c375 -54 690
-279 858 -615 80 -161 112 -303 111 -500 0 -129 -4 -165 -27 -259 -94 -376
-376 -681 -738 -799 -357 -117 -756 -44 -1049 191 -472 377 -556 1064 -191
1550 238 315 650 487 1036 432z"
									/>
									<path
										d="M2495 3506 c-41 -18 -83 -69 -90 -109 -3 -18 -5 -226 -3 -464 3 -416
4 -433 23 -460 12 -15 141 -108 287 -207 300 -201 315 -207 398 -164 87 44
114 157 56 232 -13 17 -118 94 -234 171 l-211 140 -3 387 c-3 372 -4 388 -24
414 -11 15 -32 37 -46 47 -33 25 -113 32 -153 13z"
									/>
								</g>
							</svg>
						</button>
						<span className="tooltip-text">History</span>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="flex flex-col h-full w-full md:w-1/2 mt-5 sm:mt-0 sm:pl-3 pr-3">
			<div className="flex items-start space-x-4 h-full  flex-1">
				<div className="min-w-0 flex-1 h-full">
					<div className="flex flex-col h-full">
						<div className="overflow-hidden rounded-lg shadow-sm h-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
							<div
								className="relative hidden sm:block"
								style={{ height: 300 }}
							>
								{showLoader && (
									<div className="absolute inset-0 bg-white opacity-50">
										<div className="absolute inset-0 flex items-center flex-col justify-center px-2 py-2">
											<p className="text-indigo-600 text-xl text-center font-bold italic">
												{`"${getRandomQuote()}"`}
											</p>
											<img src={loadingIcon} />
										</div>
									</div>
								)}

								<textarea
									rows={3}
									name="comment"
									id="comment"
									className="w-full resize-none border-0 p-4 h-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
									value={aiResult}
									disabled
								/>
							</div>
							<div className="relative block sm:hidden ">
								{showLoader && (
									<div className="absolute inset-0 bg-white opacity-50">
										<div className="absolute inset-0 flex items-center flex-col justify-center px-2 py-2">
											<p className="text-indigo-600 text-xl text-center font-bold italic">
												{`"${getRandomQuote()}"`}
											</p>
											<img src={loadingIcon} />
										</div>
									</div>
								)}

								<textarea
									style={{ height: 300 }}
									rows={10}
									name="comment"
									id="comment"
									className="w-full resize-none border-0 p-4 h-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
									value={aiResult}
									disabled
								/>
							</div>
						</div>
						{/* Assuming Options() is a function that renders some UI */}
						{Options()}
					</div>
				</div>
			</div>
		</div>
	);
}
