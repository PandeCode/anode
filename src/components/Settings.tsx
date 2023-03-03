import {
	ColorInput,
	Text,
	Drawer,
	Flex,
	NumberInput,
	Radio,
} from "@mantine/core";
import { useContext } from "react";
import SettingsContext, { defaultSettings } from "../context/Settings";

export default function Settings({
	opened,
	setOpened,
}: {
	opened: boolean;
	setOpened: (arg0: boolean) => void;
}) {
	const [settings, setSettings] = useContext(SettingsContext);
	const handleClose = () => setOpened(false);

	return (
		<Drawer
			opened={opened}
			transition="rotate-left"
			transitionDuration={250}
			position="right"
			onClose={handleClose}
			style={{ overflow: "scroll" }}
		>
			<Flex
				mt={40}
				direction={"column"}
				gap={"md"}
				style={{ overflow: "scroll" }}
				p={10}
				h="80vh"
			>
				<Text>Settings</Text>

				<ColorInput
					value={settings.fill}
					label="fill"
					onChange={(e) =>
						setSettings((o) => {
							o.fill = e;
							localStorage.setItem("settings-fill", o.fill);
							return o;
						})
					}
				/>
				<ColorInput
					value={settings.stroke}
					label="stroke"
					onChange={(e) =>
						setSettings((o) => {
							o.stroke = e;
							localStorage.setItem("settings-stroke", o.stroke);
							return o;
						})
					}
				/>
				<ColorInput
					value={settings.pathColor}
					label="pathColor"
					onChange={(e) =>
						setSettings((o) => {
							o.pathColor = e;
							localStorage.setItem(
								"settings-pathColor",
								o.pathColor,
							);
							return o;
						})
					}
				/>

				<NumberInput
					value={settings.circleOutlineThickness}
					label="circleOutlineThickness"
					onChange={(e) =>
						setSettings((o) => {
							o.circleOutlineThickness =
								e ?? defaultSettings.circleOutlineThickness;
							localStorage.setItem(
								"settings-circleOutlineThickness",
								o.circleOutlineThickness.toString(),
							);

							return o;
						})
					}
				/>
				<NumberInput
					value={settings.circleRadius}
					label="circleRadius"
					onChange={(e) =>
						setSettings((o) => {
							o.circleRadius = e ?? defaultSettings.circleRadius;
							localStorage.setItem(
								"settings-circleRadius",
								o.circleRadius.toString(),
							);
							return o;
						})
					}
				/>
				<NumberInput
					value={settings.labelFontSize}
					label="labelFontSize"
					onChange={(e) =>
						setSettings((o) => {
							o.labelFontSize =
								e ?? defaultSettings.labelFontSize;
							localStorage.setItem(
								"settings-labelFontSize",
								o.labelFontSize.toString(),
							);
							return o;
						})
					}
				/>
				<NumberInput
					value={settings.nodeHeight}
					label="nodeHeight"
					onChange={(e) =>
						setSettings((o) => {
							o.nodeHeight = e ?? defaultSettings.nodeHeight;
							localStorage.setItem(
								"settings-nodeHeight",
								o.nodeHeight.toString(),
							);
							return o;
						})
					}
				/>
				<NumberInput
					value={settings.nodeWidth}
					label="nodeWidth"
					onChange={(e) =>
						setSettings((o) => {
							o.nodeWidth = e ?? defaultSettings.nodeWidth;
							localStorage.setItem(
								"settings-nodeWidth",
								o.nodeWidth.toString(),
							);
							return o;
						})
					}
				/>
				<NumberInput
					value={settings.numNodes}
					label="numNodes"
					onChange={(e) =>
						setSettings((o) => {
							o.numNodes = Number(e ?? defaultSettings.numNodes);
							localStorage.setItem(
								"settings-numNodes",
								o.numNodes.toString(),
							);
							return o;
						})
					}
				/>
				<NumberInput
					value={settings.transitionDuration}
					label="transitionDuration"
					onChange={(e) =>
						setSettings((o) => {
							o.transitionDuration =
								e ?? defaultSettings.transitionDuration;
							localStorage.setItem(
								"settings-transitionDuration",
								o.transitionDuration.toString(),
							);
							return o;
						})
					}
				/>
				<Radio.Group
					label="Language."
					description="Language used for displaying names."
					value={settings.titleType}
					onChange={(e) =>
						setSettings((o) => {
							o.titleType = e as any;
							localStorage.setItem(
								"settings-titleType",
								o.titleType,
							);
							return o;
						})
					}
				>
					<Radio value="romaji" label="Romaji" />
					<Radio value="english" label="English" />
					<Radio value="native" label="Native" />
				</Radio.Group>
			</Flex>
		</Drawer>
	);
}
