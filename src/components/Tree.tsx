import { useContext, useEffect, useState } from "react";

import { LoadingOverlay, useMantineColorScheme } from "@mantine/core";

import * as d3 from "d3";

import { Media } from "../types/anime";
import { Node } from "../types/node";

import { mediaToNode, toggleChildren } from "../utils/node";

import useD3 from "../hooks/useD3";
import useWindowDimensions from "../hooks/useWindowDimensions";

import SettingsContext from "../context/Settings";

interface TreeProps {
	data: Media;
	shouldUseCluster: boolean;
}

export default function Tree({ data, shouldUseCluster }: TreeProps) {
	const settings = useContext(SettingsContext)[0];

	const windowDimensions = useWindowDimensions();
	const { colorScheme } = useMantineColorScheme();

	const [prepedData, setPrepedData] = useState(mediaToNode(data));
	const [alreadFound, setAlreadyFound] = useState<Set<number>>();
	const [loading, setLoading] = useState(false);

	const [transform, setTransform] = useState<string>();

	const [animateChildren, setAnimateChildren] = useState<number>();

	const toggleNodeChildren = async (_: any, d: d3.HierarchyNode<Node>) => {
		setLoading(true);
		const alreadFoundClone = new Set(alreadFound);
		// await toggleChildren(d.data, alreadFoundClone, settings.numNodes);
		await toggleChildren(d.data, alreadFoundClone, settings.numNodes);
		setAlreadyFound(alreadFoundClone);
		setLoading(false);
	};

	useEffect(() => {
		setAnimateChildren(prepedData.data.id);
		setAlreadyFound(
			new Set([
				prepedData.data.id,
				...(prepedData.children
					? prepedData.children.map((d) => d.data.id)
					: []),
			]),
		);
	}, [prepedData]);

	const d3ref = useD3(
		(container, _dom) => {
			const {
				pathColor,
				circleOutlineThickness,
				circleRadius,
				stroke,
				labelFontSize,
				fill,
				nodeHeight,
				nodeWidth,
				titleType,
				transitionDuration,
			} = settings;
			container.selectAll("*").remove();

			const root = d3.hierarchy(prepedData);

			const treeLayout = shouldUseCluster ? d3.cluster() : d3.tree();
			treeLayout.nodeSize([nodeHeight, nodeWidth]);

			const links = treeLayout(root as any).links();
			const linkPathGenerator = d3
				.linkHorizontal()
				.x(({ y }: any) => y)
				.y(({ x }: any) => x);

			const svg = container
				.append("svg")
				.attr("width", windowDimensions.width)
				.attr("height", windowDimensions.height)
				.attr("style", "width: 100%; height: auto;");

			const g = svg
				.append("g")
				.attr("width", windowDimensions.width)
				.attr("height", windowDimensions.height);

			g.append("g")
				.selectAll("path")
				.data(links)
				.join("path")
				.attr("d", linkPathGenerator as any)
				.attr("fill", "none")
				.attr("stroke", pathColor)
				.attr("stroke-linejoin", "round")
				.attr("stroke-width", 3);

			const node = g
				.append("g")
				.selectAll("g")
				.data(root.descendants())
				.join("g")
				.on("click", toggleNodeChildren);

			node.transition()
				.duration(transitionDuration)
				.attr("transform", (d: any) => {
					return `translate(${d.y}, ${d.x})`;
				});

			// node.attr("transform", (d: any) => {
			//     return `translate(${d.y}, ${d.x})`;
			// });

			node.append("text")
				.style("fill", colorScheme == "light" ? "black" : "white")
				.attr("text-anchor", "middle")
				.attr("dy", "0.32em")
				.attr(
					"y",
					circleRadius + circleOutlineThickness + labelFontSize,
				)
				.text((d) => {
					if (d.data.data.title[titleType]) {
						return d.data.data.title[titleType];
					} else if (titleType == "english") {
						if (d.data.data.title.romaji)
							return d.data.data.title.romaji;
						else if (d.data.data.title.native)
							return d.data.data.title.native;
					} else if (titleType == "romaji") {
						if (d.data.data.title.english)
							return d.data.data.title.english;
						else if (d.data.data.title.native)
							return d.data.data.title.native;
					} else if (titleType == "native") {
						if (d.data.data.title.english)
							return d.data.data.title.english;
						else if (d.data.data.title.romaji)
							return d.data.data.title.romaji;
					}

					return "NULL";
				});

			node.append("clipPath")
				.attr("id", (d) => `clipPath${d.data.data.id}`)
				.append("circle")
				.attr("fill", (d) => (d.children ? stroke : fill))
				.attr("r", circleRadius);

			node.append("circle")
				// .attr("fill", (d) => (d.children ? stroke : fill))
				.attr("fill", (d) => d.data.data.coverImage.color)
				.attr("r", circleRadius + circleOutlineThickness);

			node.append("image")
				.attr("href", (d) => d.data.data.coverImage.medium)
				.attr("clip-path", (d) => `url(#clipPath${d.data.data.id})`)
				.attr("x", "-50px")
				.attr("y", "-75px");

			if (transform) g.attr("transform", transform);
			container.call(
				d3.zoom().on(
					"zoom" as any,
					((e: any) => {
						setTransform(e.transform);
						g.attr("transform", e.transform);
					}) as any,
				) as any,
			);
		},
		[
			data,
			windowDimensions,
			colorScheme,
			prepedData,
			alreadFound,
			settings,
			shouldUseCluster,
		],
	) as any;

	return (
		<>
			<LoadingOverlay visible={loading} />
			<div ref={d3ref}></div>
		</>
	);
}
