import { NameId } from 'app/NameID';

export interface DetailsResult {
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: NameId[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: NameId[];
    release_date: string;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
}
