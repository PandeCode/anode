import { CoverImage, Title, Type } from "./anime";

export interface Node {
	data: {
		title: Title;
		coverImage: CoverImage;
		type: Type;
		id: number;
	};
	children: Node[] | null;
	children_hidden: Node[] | null;
}
