/// <reference types="vite/client" />

type Movie = {
	overview: string;
	popularity: number;
	revenue: number;
	tagline: string;
	title: string;
	vote_average: number;
	vote_count: number;
	cast: Array<string>;
	directors: Array<string>;
	poster_path: string;
	genres: Array<string>;
	release_date: string;
	objectID: string;
	_snippetResult: {
		overview: {
			value: string;
			matchLevel: string;
		};
	};
	_highlightResult: {
		overview: {
			value: string;
			matchLevel: string;
			matchedWords: Array<string>;
		};
		title: {
			value: string;
			matchLevel: string;
			matchedWords: Array<string>;
		};
		genres: Array<{
			value: string;
			matchLevel: string;
			matchedWords: Array<string>;
		}>;
	};
	__position: number;
};
