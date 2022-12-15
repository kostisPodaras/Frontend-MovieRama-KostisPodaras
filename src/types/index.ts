export interface Review {
  id: number;
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
  vote_average: number;
  overview: string;
  id: number;
  genres?: {
    name: string;
    id: number;
  }[];
}

export interface Similar {
  id: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  original_title: string;
  vote_count: number;
}
