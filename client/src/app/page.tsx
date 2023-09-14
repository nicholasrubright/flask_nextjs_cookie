import Movies from "@/components/Movies";
import LikedMovies from "@/components/LikedMovies";
import { Movie } from "@/types/models";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: PageProps) {
  const { id } = props.searchParams;

  const movies = await getMovies();

  if (id) {
    await likedMovie(id as string);
  }

  const likedMovies = await getLikedMovies();

  console.log("likedMovies: ", likedMovies);

  return (
    <div>
      <h1>Hello world!</h1>
      <div id="movies_list">
        <Movies movies={movies} />
      </div>
      <div id="liked_movies">
        <LikedMovies movies={likedMovies} />
      </div>
    </div>
  );
}

export async function getLikedMovies() {
  try {
    const response = await fetch("http://localhost:3000/api/liked", {
      method: "GET",
      cache: "no-cache",
    });

    if (response.ok) {
      const movies: Movie[] = await response.json();
      return movies;
    }

    console.error("getLikedMovies response was not ok", response);

    return [];
  } catch (err) {
    console.log("error: ", err);
    return [];
  }
}

// Likes a movie as your joining
export async function likedMovie(id: string) {
  return [];
}

export async function getMovies() {
  try {
    const response = await fetch("http://localhost:3000/api/movies", {
      method: "GET",
      cache: "no-cache",
    });

    if (response.ok) {
      const movies: Movie[] = await response.json();
      return movies;
    }

    return [];
  } catch (err) {
    console.log("error: ", err);
    return [];
  }
}
