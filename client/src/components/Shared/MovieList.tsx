import { Movie } from "@/types/models";

export default function MovieList(props: MovieListProps) {
  const { movies } = props;

  if (movies.length === 0) {
    return <p>No movies...</p>;
  }

  return (
    <ul>
      {movies.map((movie, index) => {
        return <li key={index}>{`ID: ${movie.id} Title: ${movie.title}`}</li>;
      })}
    </ul>
  );
}

interface MovieListProps {
  movies: Movie[];
}
