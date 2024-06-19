import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import {
	InstantSearch,
	SearchBox,
	Hits,
	LookingSimilar,
	RefinementList,
	Pagination,
	ClearRefinements,
} from 'react-instantsearch';

const searchClient = algoliasearch(
	'PVXYD3XMQP',
	'7324aa507379958067c2230699a45e65',
);

function FullMovie({
	visible,
	closePopover,
	movie,
	onClickHandler,
}: {
	visible: boolean;
	closePopover: () => void;
	movie?: Movie;
	onClickHandler: (movie: Movie) => void;
}) {
	if (!movie || !visible) {
		return null;
	}

	const { title, poster_path, release_date, tagline, genres, objectID } = movie;

	function SimilarComponent({ item }: { item: Movie }) {
		return <TinyMoviePreview movie={item} onClickHandler={onClickHandler} />;
	}

	return (
		<>
			<div className="movie-details">
				<button type="button" onClick={closePopover} className="close">
					&larr; back
				</button>
				<div className="movie">
					<img
						src={`https://image.tmdb.org/t/p/w185${poster_path}`}
						alt={title}
					/>
					<div className="details">
						<h2>
							{title}{' '}
							{release_date
								? `(${new Date(release_date).getFullYear()})`
								: null}
						</h2>
						<p>{tagline}</p>
						<ul className="genres">
							{genres.map((genre) => (
								<li key={`${objectID}-genre-${genre}`}>{genre}</li>
							))}
						</ul>
						<button onClick={() => alert('TODO: add payment')}>
							Rent for $3.99
						</button>
					</div>
				</div>
				<div className="previews">
					<LookingSimilar
						objectIDs={[objectID]}
						itemComponent={SimilarComponent}
						limit={12}
					/>
				</div>
			</div>
		</>
	);
}

function TinyMoviePreview({
	movie,
	onClickHandler,
}: {
	movie: Movie;
	onClickHandler: (movie: Movie) => void;
}) {
	return (
		<>
			<div className="tiny-preview">
				<button
					type="button"
					onClick={() => onClickHandler(movie)}
					title={`Details about ${movie.title}`}
				>
					<img
						src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
						alt={movie.title}
					/>
				</button>
			</div>
		</>
	);
}

function MoviePreview({
	movie,
	onClickHandler,
}: {
	movie: Movie;
	onClickHandler: (movie: Movie) => void;
}) {
	const {
		title,
		poster_path,
		genres,
		objectID,
		release_date,
		overview,
		tagline,
	} = movie;

	return (
		<>
			<div className="movie-preview">
				<img
					src={`https://image.tmdb.org/t/p/w185${poster_path}`}
					alt={title}
					onClick={() => onClickHandler(movie)}
				/>
				<div className="details">
					<h2 onClick={() => onClickHandler(movie)}>
						{title}{' '}
						{release_date ? `(${new Date(release_date).getFullYear()})` : null}
					</h2>
					<p>{tagline}</p>
					<p>{overview}</p>
					<ul className="genres">
						{genres.map((genre) => (
							<li key={`${objectID}-genre-${genre}`}>{genre}</li>
						))}
					</ul>

					<button type="button" onClick={() => onClickHandler(movie)}>
						View details and rent &rarr;
					</button>
				</div>
			</div>
		</>
	);
}

export function App() {
	const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
	const [selectedMovie, setSelectedMovie] = useState<Movie>();

	function closePopover() {
		setPopoverVisible(false);
	}

	function HitComponent({ hit }: { hit: Movie }) {
		return (
			<MoviePreview
				onClickHandler={(movie) => {
					setSelectedMovie(movie);
					setPopoverVisible(true);
				}}
				movie={hit}
			/>
		);
	}

	return (
		<>
			<main>
				<InstantSearch searchClient={searchClient} indexName="movies_copy">
					{selectedMovie && popoverVisible ? (
						<FullMovie
							visible={popoverVisible}
							closePopover={closePopover}
							movie={selectedMovie}
							onClickHandler={(movie) => {
								setSelectedMovie(movie);
							}}
						/>
					) : (
						<>
							<h1>What do you want to watch tonight?</h1>
							<SearchBox />
							<div className="search">
								<div>
									<Hits hitComponent={HitComponent} />
									<Pagination />
								</div>

								<aside>
									<RefinementList attribute="genres" operator="and" />
									<ClearRefinements />
								</aside>
							</div>
						</>
					)}
				</InstantSearch>
			</main>
		</>
	);
}
