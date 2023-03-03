import { Media, Type } from "../types/anime";
import { Node } from "../types/node";
import { getRecommendationsFromId } from "./anime";

export async function toggleChildren(
	node: Node,
	alreadyFound: Set<number>,
	numNodes: number = 10,
) {
	if (node.children) {
		node.children_hidden = node.children;
		node.children = null;
	} else if (node.children_hidden) {
		node.children = node.children_hidden;
	} else {
		const newData = await getRecommendationsFromId(
			node.data.id,
			node.data.type,
			numNodes,
		);
		node.children = newData
			.filter(({ mediaRecommendation: { id } }) => !alreadyFound.has(id))
			.map(({ mediaRecommendation }) => {
				alreadyFound.add(mediaRecommendation.id);
				return {
					data: {
						coverImage: mediaRecommendation.coverImage,
						id: mediaRecommendation.id,
						title: mediaRecommendation.title,
						type: mediaRecommendation.type,
					},
					children: null,
					children_hidden: null,
				};
			});
	}
}

export function mediaToNode(media: Media, type: Type = "ANIME"): Node {
	return {
		data: {
			id: media.id,
			coverImage: media.coverImage,
			title: media.title,
			type: type,
		},
		children_hidden: null,
		children: media.recommendations
			? media.recommendations.edges.map((e) => {
					return {
						data: {
							id: e.node.mediaRecommendation.id,
							coverImage: e.node.mediaRecommendation.coverImage,
							title: e.node.mediaRecommendation.title,
							type: e.node.mediaRecommendation.type,
						},
						children: null,
						children_hidden: null,
					};
			  })
			: null,
	};
}
