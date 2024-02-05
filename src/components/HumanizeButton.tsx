import React from "react";
import "../assets/humanizeButton.css";
export const HumanizeButton = ({
	isHumanizeEnabled,
	setIsHumanizeEnabled,
}: {
	isHumanizeEnabled: boolean;
	setIsHumanizeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const handleToggleChange = () => {
		setIsHumanizeEnabled(!isHumanizeEnabled);
	};

	return (
		<div className="flex align-center">
			Humanize:
			<label htmlFor="toggle" className="button">
				<input
					checked={isHumanizeEnabled}
					onChange={handleToggleChange}
					type="checkbox"
					id="toggle"
				/>
				<span className="slider"></span>
			</label>
		</div>
	);
};
