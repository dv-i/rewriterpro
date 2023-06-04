import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpDownIcon,
} from "@heroicons/react/20/solid";

const freeOrPremiumOption = [
	{
		title: "Standard",
		description: "You can customize fluency",
		current: true,
	},
	{
		title: "Premium",
		description:
			"You can customize fluency, tones, audience, emotion, length",
		current: false,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const [selected, setSelected] = useState(freeOrPremiumOption[0]);

	const proModeEnabled = selected.title === "Premium";

	const extraProModeOptionsForFluency = [
		{ id: 3, name: "Intermediate" },
		{ id: 4, name: "Proficient" },
	];

	return (
		<div className="flex justify-between">
			<div className="flex flex-row gap-3 -mt-1.5">
				<DropDown
					label={"Fluency"}
					options={[
						{ id: 1, name: "Default" },
						{ id: 2, name: "Basic" },

						...(proModeEnabled
							? extraProModeOptionsForFluency
							: []),
					]}
				/>
				{proModeEnabled && (
					<DropDown
						label={"Tone"}
						options={[
							{ id: 1, name: "Default" },
							{ id: 2, name: "Formal" },
							{ id: 3, name: "Academic" },
							{ id: 3, name: "Clear" },
							{ id: 3, name: "Elaborate" },
							{ id: 3, name: "Creative" },
							{ id: 3, name: "Optimistic" },
							{ id: 3, name: "Tell a Story" },
						]}
					/>
				)}
				{proModeEnabled && (
					<DropDown
						label={"Audience"}
						options={[
							{ id: 1, name: "General" },
							{ id: 2, name: "Business" },
							{ id: 3, name: "Knowledge" },
							{ id: 3, name: "Expert" },
						]}
					/>
				)}
				{proModeEnabled && (
					<DropDown
						label={"Emotion"}
						options={[
							{ id: 1, name: "Mild" },
							{ id: 2, name: "Strong" },
						]}
					/>
				)}
				{proModeEnabled && (
					<DropDown
						label={"Length"}
						options={[
							{ id: 1, name: "Default" },
							{ id: 2, name: "Shortern" },
							{ id: 3, name: "Extend" },
						]}
					/>
				)}
			</div>
			<div className="w-1/6">
				<Listbox value={selected} onChange={setSelected}>
					{({ open }) => (
						<>
							<Listbox.Label className="sr-only">
								Change published status
							</Listbox.Label>
							<div className="relative w-full">
								<div className="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm w-full">
									<div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 px-3 py-2 text-white shadow-sm w-full">
										<CheckIcon
											className="-ml-0.5 h-5 w-5"
											aria-hidden="true"
										/>
										<p className="text-sm font-semibold">
											{selected.title}
										</p>
									</div>
									<Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
										<span className="sr-only">
											Change published status
										</span>
										<ChevronDownIcon
											className="h-5 w-5 text-white"
											aria-hidden="true"
										/>
									</Listbox.Button>
								</div>

								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										{freeOrPremiumOption.map((option) => (
											<Listbox.Option
												key={option.title}
												className={({ active }) =>
													classNames(
														active
															? "bg-indigo-600 text-white"
															: "text-gray-900",
														"cursor-default select-none p-4 text-sm"
													)
												}
												value={option}
											>
												{({ selected, active }) => (
													<div className="flex flex-col">
														<div className="flex justify-between">
															<p
																className={
																	selected
																		? "font-semibold"
																		: "font-normal"
																}
															>
																{option.title}
															</p>
															{selected ? (
																<span
																	className={
																		active
																			? "text-white"
																			: "text-indigo-600"
																	}
																>
																	<CheckIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</div>
														<p
															className={classNames(
																active
																	? "text-indigo-200"
																	: "text-gray-500",
																"mt-2"
															)}
														>
															{option.description}
														</p>
													</div>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
			</div>
		</div>
	);
}

interface DropDownProps {
	label: string;
	options: { id: number; name: string; disabled?: boolean }[];
}

function DropDown({ label, options }: DropDownProps) {
	const [selected, setSelected] = useState(options[0]);

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<div className="">
					<div className="text-xs text-gray-400 font-semibold pb-0.5">
						{label}
					</div>
					<div className="relative w-36">
						<Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<span className="block truncate">
								{selected.name}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-200 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{options.map((opt) => (
									<Listbox.Option
										key={opt.id}
										className={({ active }) =>
											classNames(
												active
													? "bg-indigo-600 text-white"
													: "text-gray-900",
												"relative cursor-default select-none py-2 pl-3 pr-9"
											)
										}
										value={opt}
										disabled={opt.disabled}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected
															? "font-semibold"
															: "font-normal",
														"block truncate"
													)}
												>
													{opt.name}
												</span>

												{selected ? (
													<span
														className={classNames(
															active
																? "text-white"
																: "text-indigo-600",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</div>
			)}
		</Listbox>
	);
}
