import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { PromptOptions, User } from "./store/dataInterfaces";
import { ToastProps } from "./ToastNotification";
const premiumDropdownOption = [
	{
		title: "Premium",
		description:
			"You can customize fluency, tones, audience, emotion, length",
		current: true,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface SettingProps {
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	user: User | undefined;
	setPromptOptions: React.Dispatch<React.SetStateAction<PromptOptions>>;
	promptOptions: PromptOptions;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
}

export default function Settings({
	user,
	setPromptOptions,
	setToast,
}: SettingProps) {
	const freeOrPremiumOption = [
		{
			title: "Standard",
			description: "You can customize fluency",
			current: true,
		},
		...(user?.pro ? premiumDropdownOption : []),
	];
	const [selected, setSelected] = useState(freeOrPremiumOption[0]);

	const proModeEnabled = selected.title === "Premium";

	useEffect(() => {
		user?.pro
			? setSelected(freeOrPremiumOption[1])
			: setSelected(freeOrPremiumOption[0]);
	}, [user?.pro]);

	return (
		<>
			{/* Desktop */}
			<div className="hidden sm:flex justify-between">
				<div className="flex-row flex gap-3 -mt-1.5">
					<DropDown
						label={"Fluency"}
						promptKey="fluency"
						setPromptOptions={setPromptOptions}
						options={[
							{ id: 1, name: "Default" },
							{ id: 2, name: "Basic" },
							{
								id: 3,
								name: "Intermediate",
								disabled: !proModeEnabled,
							},
							{
								id: 4,
								name: "Advanced",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Tone"}
						promptKey="tone"
						setPromptOptions={setPromptOptions}
						options={[
							{
								id: 1,
								name: "Default",
							},
							{
								id: 2,
								name: "Formal",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Academic",
								disabled: !proModeEnabled,
							},
							{ id: 3, name: "Clear", disabled: !proModeEnabled },
							{
								id: 3,
								name: "Elaborative",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Creative",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Optimistic",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Story like",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Audience"}
						promptKey="audience"
						setPromptOptions={setPromptOptions}
						options={[
							{
								id: 1,
								name: "General",
							},
							{
								id: 2,
								name: "Business",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Knowledgable",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Expert",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Emotion"}
						promptKey="emotion"
						setPromptOptions={setPromptOptions}
						options={[
							{ id: 1, name: "Mild", disabled: !proModeEnabled },
							{
								id: 2,
								name: "Strong",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Length"}
						promptKey="length"
						setPromptOptions={setPromptOptions}
						options={[
							{
								id: 1,
								name: "Default",
							},
							{
								id: 2,
								name: "Shortern",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Extend",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Paraphrased Language"}
						promptKey="language"
						setPromptOptions={setPromptOptions}
						options={[
							{ id: 1, name: "English (US)" },
							{ id: 2, name: "English (UK)" },
							{
								id: 3,
								name: "Spanish",
								disabled: !proModeEnabled,
							},
							{
								id: 4,
								name: "French",
								disabled: !proModeEnabled,
							},
							{
								id: 5,
								name: "German",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>
				</div>

				<div className="block w-1/6">
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
											{freeOrPremiumOption.map(
												(option) => (
													<Listbox.Option
														key={`${option.title}-${option.description}`}
														className={({
															active,
														}) =>
															classNames(
																active
																	? "bg-indigo-600 text-white"
																	: "text-gray-900",
																"cursor-default select-none p-4 text-sm"
															)
														}
														disabled={
															user?.pro &&
															option.title ===
																"Standard"
														}
														value={option}
													>
														{({
															selected,
															active,
														}) => (
															<div className="flex flex-col">
																<div className="flex justify-between">
																	<p
																		className={
																			selected
																				? "font-semibold"
																				: "font-normal"
																		}
																	>
																		{
																			option.title
																		}
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
																	{
																		option.description
																	}
																</p>
															</div>
														)}
													</Listbox.Option>
												)
											)}
										</Listbox.Options>
									</Transition>
								</div>
							</>
						)}
					</Listbox>
				</div>
			</div>

			<div className="sm:hidden block h-full">
				{/* Mobile */}
				<div className="block w-full">
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
										<Listbox.Options className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{freeOrPremiumOption.map(
												(option) => (
													<Listbox.Option
														key={`${option.title}-${option.description}`}
														className={({
															active,
														}) =>
															classNames(
																active
																	? "bg-indigo-600 text-white"
																	: "text-gray-900",
																"cursor-default select-none p-4 text-sm"
															)
														}
														disabled={
															user?.pro &&
															option.title ===
																"Standard"
														}
														value={option}
													>
														{({
															selected,
															active,
														}) => (
															<div className="flex flex-col">
																<div className="flex justify-between">
																	<p
																		className={
																			selected
																				? "font-semibold"
																				: "font-normal"
																		}
																	>
																		{
																			option.title
																		}
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
																	{
																		option.description
																	}
																</p>
															</div>
														)}
													</Listbox.Option>
												)
											)}
										</Listbox.Options>
									</Transition>
								</div>
							</>
						)}
					</Listbox>
				</div>
				{/* Mobile */}
				<div className="sm:hidden grid grid-cols-2 gap-3 mt-3 sm:grid-cols-3 sm:gap-4">
					<DropDown
						label={"Fluency"}
						promptKey="fluency"
						setPromptOptions={setPromptOptions}
						options={[
							{ id: 1, name: "Default" },
							{ id: 2, name: "Basic" },
							{
								id: 3,
								name: "Intermediate",
								disabled: !proModeEnabled,
							},
							{
								id: 4,
								name: "Advanced",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Tone"}
						promptKey="tone"
						setPromptOptions={setPromptOptions}
						options={[
							{
								id: 1,
								name: "Default",
							},
							{
								id: 2,
								name: "Formal",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Academic",
								disabled: !proModeEnabled,
							},
							{ id: 3, name: "Clear", disabled: !proModeEnabled },
							{
								id: 3,
								name: "Elaborative",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Creative",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Optimistic",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Story like",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Audience"}
						promptKey="audience"
						setPromptOptions={setPromptOptions}
						options={[
							{
								id: 1,
								name: "General",
							},
							{
								id: 2,
								name: "Business",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Knowledgable",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Expert",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Emotion"}
						promptKey="emotion"
						setPromptOptions={setPromptOptions}
						options={[
							{ id: 1, name: "Mild", disabled: !proModeEnabled },
							{
								id: 2,
								name: "Strong",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Length"}
						promptKey="length"
						setPromptOptions={setPromptOptions}
						options={[
							{
								id: 1,
								name: "Default",
							},
							{
								id: 2,
								name: "Shortern",
								disabled: !proModeEnabled,
							},
							{
								id: 3,
								name: "Extend",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>

					<DropDown
						label={"Paraphrased Language"}
						promptKey="language"
						setPromptOptions={setPromptOptions}
						options={[
							{ id: 1, name: "English (US)" },
							{ id: 2, name: "English (UK)" },
							{
								id: 3,
								name: "Spanish",
								disabled: !proModeEnabled,
							},
							{
								id: 4,
								name: "French",
								disabled: !proModeEnabled,
							},
							{
								id: 5,
								name: "German",
								disabled: !proModeEnabled,
							},
						]}
						setToast={setToast}
					/>
				</div>
			</div>
		</>
	);
}

interface DropDownProps {
	label: string;
	promptKey: keyof PromptOptions;
	options: { id: number; name: string; disabled?: boolean }[];
	setPromptOptions: React.Dispatch<React.SetStateAction<PromptOptions>>;
	setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>;
}

function DropDown({
	label,
	options,
	setPromptOptions,
	promptKey,
	setToast,
}: DropDownProps) {
	const [selected, setSelected] = useState(options[0]);

	useEffect(() => {
		setPromptOptions((prev) => {
			return {
				...prev,
				[promptKey]: [
					"Default",
					"Mild",
					"General",
					"English (US)",
				].includes(selected.name)
					? undefined
					: selected.name,
			};
		});
	}, [selected, setPromptOptions, promptKey]);

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
								{options.map((opt) =>
									opt.disabled ? (
										<div
											key={`${label}-${opt.name}`}
											onClick={() =>
												setToast({
													visible: true,
													title: "Upgrade to Pro",
													content:
														"To enhance your paraphrasing experience by using this mode and many others, upgrade to pro.",
												})
											}
										>
											<Listbox.Option
												className={({ active }) =>
													classNames(
														active
															? "bg-indigo-600 text-white"
															: "text-gray-900",
														"relative cursor-default select-none py-2 pl-3 pr-9 ",
														opt.disabled
															? "bg-slate-100 text-slate-400 border-slate-300 shadow-none"
															: ""
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
										</div>
									) : (
										<Listbox.Option
											key={`${label}-${opt.name}`}
											className={({ active }) =>
												classNames(
													active
														? "bg-indigo-600 text-white"
														: "text-gray-900",
													"relative cursor-default select-none py-2 pl-3 pr-9 ",
													opt.disabled
														? "bg-slate-100 text-slate-400 border-slate-300 shadow-none"
														: ""
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
									)
								)}
							</Listbox.Options>
						</Transition>
					</div>
				</div>
			)}
		</Listbox>
	);
}
