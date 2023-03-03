import React from "react";
import * as d3 from "d3";
import { Selection } from "d3";

export default function useD3(
	renderFunction: (
		d3Container: Selection<HTMLElement, unknown, null, any>,
		dom: HTMLElement,
	) => void,
	dependencies: React.DependencyList,
) {
	const ref = React.useRef<HTMLElement>();

	React.useEffect(() => {
		if (ref.current) {
			renderFunction(d3.select(ref.current), ref.current);
		}
		return () => {};
	}, [...dependencies, ref.current]);
	return ref;
}
