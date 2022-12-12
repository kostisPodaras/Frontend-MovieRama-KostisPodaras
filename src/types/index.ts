export interface Review {
  id: string;
  content: string;
  author_details: {
    rating: number;
    name: string;
    username: string;
    avatar_path: string;
  };
}

export interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: string;
  overview: string;
  id: string;
  genres?: string[];
}
