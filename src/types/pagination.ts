export interface Pagination {
  no_results: number;
  page: number;
  per_page: number;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  [key: string]: T[] | Pagination;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}
