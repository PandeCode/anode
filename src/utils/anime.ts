import type { Welcome, Type, Media } from "../types/anime";

async function anilist(query: string, variables: object) {
	const response = await fetch("https://graphql.anilist.co", {
		method: "POST",
		body: JSON.stringify({ query, variables }),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});

	const data: Welcome = await response.json();
	return data.data;
}

export async function getRecommendationsFromId(
	id: number,
	type: Type = "ANIME",
	max: number = 1,
): Promise<
	{
		rating: number;
		mediaRecommendation: {
			id: number;
			type: Type;
			title: { english: string; native: string; romaji: string };
			coverImage: { medium: string; color: string };
		};
	}[]
> {
	const data = await anilist(
		`
query ($id: Int, $type: MediaType, $max: Int) {
Media(id: $id, type: $type) {
	recommendations(sort: RATING_DESC, page: 1, perPage: $max) {
		edges {
			node {
				rating
				mediaRecommendation {
					id
					type
					title { english romaji native }
					coverImage { medium color }
				}
			}
		}
	}
}
}
`,
		{ id, type, max },
	);

	return data.Media.recommendations
		? (data.Media.recommendations.edges.map((e) => e.node) as any)
		: [];
}

export async function getMediaAndRecommendationsFromSearch(
	search: string,
	type: Type = "ANIME",
	max: number = 10,
): Promise<Media> {
	const data = await anilist(
		`
query ($search: String, $type: MediaType, $max: Int) {
	Media(search: $search, type: $type) {
		id
		title { english romaji native }
		coverImage { medium color }
		recommendations(sort: RATING_DESC, page: 1, perPage: $max) {
			edges {
				node {
					rating
					mediaRecommendation {
						id
						type
						title { english native romaji }
						coverImage { medium color }
					}
				}
			}
		}
	}
}
`,
		{ search, type, max },
	);

	data.Media.type = type;
	return data.Media as any;
}
