import { createContext, useState } from "react";
import Settings from "../types/Settings";

export const defaultSettings: Settings = {
	circleOutlineThickness: 3,
	circleRadius: 50,
	stroke: "#555",
	fill: "#999",
	pathColor: "#000",
	nodeHeight: 200,
	nodeWidth: 200,
	numNodes: 10,
	labelFontSize: 10,
	transitionDuration: 750,
	titleType: "english",
};

export function getSettings(): Settings {
	return {
		circleOutlineThickness: Number(
			localStorage.getItem("settings-circleOutlineThickness") ??
				defaultSettings.circleOutlineThickness,
		),
		circleRadius: Number(
			localStorage.getItem("settings-circleRadius") ??
				defaultSettings.circleRadius,
		),
		stroke:
			localStorage.getItem("settings-stroke") ?? defaultSettings.stroke,
		fill: localStorage.getItem("settings-fill") ?? defaultSettings.fill,
		pathColor:
			localStorage.getItem("settings-pathColor") ??
			defaultSettings.pathColor,
		nodeHeight: Number(
			localStorage.getItem("settings-nodeHeight") ??
				defaultSettings.nodeHeight,
		),
		nodeWidth: Number(
			localStorage.getItem("settings-nodeWidth") ??
				defaultSettings.nodeWidth,
		),
		numNodes: Number(
			localStorage.getItem("settings-numNodes") ??
				defaultSettings.numNodes,
		),
		labelFontSize: Number(
			localStorage.getItem("settings-labelFontSize") ??
				defaultSettings.labelFontSize,
		),
		transitionDuration: Number(
			localStorage.getItem("settings-transitionDuration") ??
				defaultSettings.transitionDuration,
		),
		titleType:
			(() => {
				const type = localStorage.getItem("settings-titleType");
				if (type == "english" || type == "romaji" || type == "native")
					return type;
			})() ?? defaultSettings.titleType,
	};
}

const SettingsContext = createContext<
	[Settings, React.Dispatch<React.SetStateAction<Settings>>]
>(null as any);

export default SettingsContext;
