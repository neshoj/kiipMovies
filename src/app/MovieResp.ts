import { MovieDetail } from './MovieDetail';

// Movie response
export interface MovieResp {
    id: string;
    page: string;
    results: MovieDetail [];
    total_pages: string;
    total_results: string;
}
