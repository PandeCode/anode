import { useState, useEffect } from "react";

export default function useWindowDimensions(): {
	width: number;
	height: number;
} {
	const [windowDimensions, setWindowDimentions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	useEffect(
		() =>
			window.addEventListener("resize", () =>
				setWindowDimentions({
					width: window.innerWidth,
					height: window.innerHeight,
				}),
			),
		[],
	);
	return windowDimensions;
}
