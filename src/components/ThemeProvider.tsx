import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

export default function ThemeProvider({ children }: { children: any }) {
	const preferredColorScheme = useColorScheme();

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	// useHotkeys([['mod+J', () => toggleColorScheme()]]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{ colorScheme }}
				withGlobalStyles
				withNormalizeCSS
			>
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
