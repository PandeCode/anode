import { Flex } from "@mantine/core";
import {
	IconBrandGithub,
	IconHome,
	IconInfoCircle,
	IconSettings,
} from "@tabler/icons";

import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";
import About from "./components/About";
import NotFound from "./components/NotFound";
import ThemeProvider from "./components/ThemeProvider";
import SettingsContext, { getSettings } from "./context/Settings";
import { useState } from "react";

export default function App() {
	const settings = useState(getSettings());
	const [settingsOpened, setSettingsOpened] = useState(false);

	return (
		<HashRouter>
			<SettingsContext.Provider value={settings}>
				<ThemeProvider>
					<Flex direction={"column"}>
						<Header
							links={[
								{ link: "/", label: "Home", icon: IconHome },
								// { link: "/about", label: ( <Flex align={"center"} gap="xs"> <IconInfoCircle width={15} height={15} /> About </Flex>), }
								{
									label: "Source",
									icon: IconBrandGithub,
									link: () => {
										window.open(
											"https://github.com/PandeCode/anode",
										);
									},
								},
								// {
								//     label: "Settings",
								//     icon: IconSettings,
								//     link: () =>
								//         setSettingsOpened(!settingsOpened),
								// },
							]}
						/>
						<Settings
							opened={settingsOpened}
							setOpened={setSettingsOpened}
						/>
						<div style={{ flex: "auto", height: "100%" }}>
							<Routes>
								<Route element={<Home />} path="/" />
								<Route element={<About />} path="/about" />
								<Route element={<NotFound />} path="*" />
							</Routes>
						</div>
					</Flex>
				</ThemeProvider>
			</SettingsContext.Provider>
		</HashRouter>
	);
}
