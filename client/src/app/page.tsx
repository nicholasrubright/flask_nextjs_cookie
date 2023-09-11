import Movies from "@/components/Movies";
import { Movie } from "@/types/models";

export default async function Page() {
  const movies = await getMovies();

  return (
    <div>
      <h1>Hello world!</h1>
      <Movies movies={movies} />
    </div>
  );
}

export async function getMovies() {
  const response = await fetch("http://api:8080/movies", {
    method: "GET",
    cache: "no-cache",
  });

  if (response.ok) {
    const movies: Movie[] = await response.json();
    return movies;
  }

  throw Error("There was a problem getting movies");
}
