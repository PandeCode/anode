function genList(list: string[]) {
	const ret = [];
	for (let str of list) {
		const l = [];
		for (let i = 1; i <= str.length; i++) {
			l.push(str.substring(0, i) + "|");
		}
		l.push(str + "| ");
		l.push(str + " ");
		l.push(str + "|  ");
		l.push(str + "  ");

		ret.push(...l);
	}

	return ret;
}

export const animeExamples = genList([
	"Bleach",
	"One Piece",
	"Naruto",
	"Attack On Titan",
	"Black Clover",
	"Chainsaw Man",
]);

export const mangaExamples = genList([
	"Dandadan",
	"Vagabond",
	"Record of Ragnarok",
	"Chainsaw Man",
	"Monster",
]);
