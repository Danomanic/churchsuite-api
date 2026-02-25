import type { Image, Location } from './common.js';
import type { Pagination, PaginationParams } from './pagination.js';

export interface Event {
  id: number;
  identifier: string;
  name: string;
  datetime_start: string;
  datetime_end: string;
  all_day: boolean;
  category: EventCategory | null;
  description: string;
  location: Location | null;
  images: Image;
  status: string;
  site_id: number | null;
  signup_options: Record<string, unknown>;
}

export interface EventCategory {
  id: number;
  name: string;
  colour: string;
  description: string;
}

export interface EventListParams extends PaginationParams {
  date_start?: string;
  date_end?: string;
  category_id?: number;
  site_id?: number;
  q?: string;
}

export interface EventListResponse {
  pagination: Pagination;
  events: Event[];
}

export interface CategoryListResponse {
  categories: EventCategory[];
}
