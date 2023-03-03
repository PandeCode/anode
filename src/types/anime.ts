export type Type = "ANIME" | "MANGA";
export interface Welcome {
	data: Data;
}

export interface Data {
	Media: Media;
}

export interface CoverImage {
	medium: string;
	color: string;
}

export interface Title {
	romaji: string;
	english: string;
	native: string;
}
export interface Media {
	id: number;
	title: Title;
	coverImage: CoverImage;
	type: Type;
	recommendations: {
		edges: {
			node: {
				rating: number;
				mediaRecommendation: {
					id: number;
					type: Type;
					title: Title;
					coverImage: CoverImage;
				};
			};
		}[];
	} | null;
}
